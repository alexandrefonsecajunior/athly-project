import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { IntegrationsService } from './integrations.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user-rest.decorator';
import { UserModel } from '../users/models/user.model';

@Controller('integrations')
@UseGuards(JwtAuthGuard)
export class IntegrationsController {
  constructor(private readonly integrationsService: IntegrationsService) {}

  @Get()
  integrations(@CurrentUser() user: UserModel) {
    return this.integrationsService.getIntegrations(user.id);
  }

  @Post(':integrationId/connect')
  connectIntegration(
    @CurrentUser() user: UserModel,
    @Param('integrationId') integrationId: string,
  ) {
    return this.integrationsService.connectIntegration(user.id, integrationId);
  }

  @Delete(':integrationId/disconnect')
  disconnectIntegration(
    @CurrentUser() user: UserModel,
    @Param('integrationId') integrationId: string,
  ) {
    return this.integrationsService.disconnectIntegration(
      user.id,
      integrationId,
    );
  }
}
