import { ConfigService } from '@nestjs/config';
import type { StravaActivity } from './types/planner.types';
export declare class StravaService {
    private readonly configService;
    constructor(configService: ConfigService);
    getRecentActivities(count: number): Promise<StravaActivity[]>;
}
