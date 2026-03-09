import { Injectable, InternalServerErrorException, UnauthorizedException, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { StravaActivity } from './types/planner.types';

@Injectable()
export class StravaService {
  constructor(private readonly configService: ConfigService) {}

  async getRecentActivities(count: number): Promise<StravaActivity[]> {
    const token = this.configService.get<string>('STRAVA_ACCESS_TOKEN');
    if (!token) {
      throw new InternalServerErrorException('STRAVA_ACCESS_TOKEN is not configured.');
    }

    const url = `https://www.strava.com/api/v3/athlete/activities?per_page=${count}`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 401) {
      const body = await response.json().catch(() => ({})) as {
        errors?: { code?: string }[];
      };
      const code = body?.errors?.[0]?.code;
      // "missing" means the token lacks the activity:read scope or the athlete
      // has no readable activities — fall back to assessment plan instead of failing.
      if (code === 'missing') {
        return [];
      }
      throw new UnauthorizedException('Strava token is expired or invalid. Please reconnect your Strava account.');
    }

    if (response.status === 429) {
      throw new HttpException('Strava rate limit exceeded. Please try again later.', 429);
    }

    if (!response.ok) {
      throw new HttpException(`Strava API error: ${response.statusText}`, response.status);
    }

    return response.json() as Promise<StravaActivity[]>;
  }
}
