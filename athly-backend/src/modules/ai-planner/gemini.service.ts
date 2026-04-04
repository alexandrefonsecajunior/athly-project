import { Injectable, InternalServerErrorException, BadGatewayException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import type { AiPlannerInput, PlannerResults, PreviousWeekAnalysis } from './types/planner.types';
import type { FormattedZones } from '../effort-zones/types/effort-zone.types';
import { buildPlannerPrompt, buildAssessmentPrompt } from './prompts/planner-prompt';

@Injectable()
export class GeminiService {
  private readonly logger = new Logger(GeminiService.name);
  private readonly modelName = 'gemini-2.5-flash';

  constructor(private readonly configService: ConfigService) {}

  private getModel() {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (!apiKey) {
      throw new InternalServerErrorException('GEMINI_API_KEY is not configured.');
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    return genAI.getGenerativeModel({
      model: this.modelName,
      generationConfig: { responseMimeType: 'application/json' },
    });
  }

  async generatePlan(
    input: AiPlannerInput,
    effortZones: FormattedZones,
    previousWeekAnalysis?: PreviousWeekAnalysis | null,
  ): Promise<PlannerResults> {
    const model = this.getModel();
    const prompt = buildPlannerPrompt(input, effortZones, previousWeekAnalysis);

    let responseText: string;
    try {
      const result = await model.generateContent(prompt);
      responseText = result.response.text();
    } catch (err) {
      throw new BadGatewayException(
        `Gemini AI request failed: ${err instanceof Error ? err.message : String(err)}`,
      );
    }

    return this.parseAndValidate(responseText);
  }

  async generateAssessmentPlan(
    weekDates: string[],
    trainingDays: number,
    availableDays: string[],
    effortZones: FormattedZones,
  ): Promise<PlannerResults> {
    const model = this.getModel();
    const prompt = buildAssessmentPrompt(weekDates, trainingDays, availableDays, effortZones);

    let responseText: string;
    try {
      const result = await model.generateContent(prompt);
      responseText = result.response.text();
    } catch (err) {
      throw new BadGatewayException(
        `Gemini AI request failed: ${err instanceof Error ? err.message : String(err)}`,
      );
    }

    return this.parseAndValidate(responseText);
  }

  private parseAndValidate(responseText: string): PlannerResults {
    let parsed: PlannerResults;
    try {
      parsed = JSON.parse(responseText) as PlannerResults;
    } catch {
      throw new BadGatewayException('Gemini AI returned an invalid JSON response.');
    }

    if (!parsed.analysis || !Array.isArray(parsed.weekPlan)) {
      throw new BadGatewayException(
        "Gemini AI response is missing required fields: 'analysis' or 'weekPlan'.",
      );
    }

    if (parsed.weekPlan.length !== 7) {
      throw new BadGatewayException(
        `Gemini AI returned ${parsed.weekPlan.length} workout days instead of 7.`,
      );
    }

    // Warn if training days are missing reasoning
    for (const day of parsed.weekPlan) {
      if (day.sportType !== 'other' && !day.reasoning) {
        this.logger.warn(`Workout "${day.title}" on ${day.date} is missing reasoning field`);
      }
    }

    return parsed;
  }
}
