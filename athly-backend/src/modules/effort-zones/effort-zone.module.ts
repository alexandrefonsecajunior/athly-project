import { Module } from '@nestjs/common';
import { EffortZoneService } from './effort-zone.service';

@Module({
  providers: [EffortZoneService],
  exports: [EffortZoneService],
})
export class EffortZoneModule {}
