import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { IntegrationModel } from './models/integration.model';

@Injectable()
export class IntegrationsService {
  constructor(private readonly prisma: PrismaService) {}

  async getIntegrations(userId: string): Promise<IntegrationModel[]> {
    const integrations = await this.prisma.integration.findMany({
      where: { userId },
    });
    return integrations.map((integration) => ({
      id: integration.id,
      name: integration.name,
      icon: integration.icon,
      connected: integration.connected,
      type: integration.type,
    }));
  }

  async connectIntegration(userId: string, id: string) {
    const updated = await this.prisma.integration.updateMany({
      where: { userId, id },
      data: { connected: true },
    });
    if (!updated.count) {
      throw new NotFoundException('Integration not found');
    }
    const integration = await this.prisma.integration.findFirst({
      where: { userId, id },
    });
    if (!integration) {
      throw new NotFoundException('Integration not found');
    }
    return this.toGraphQL(integration);
  }

  async disconnectIntegration(userId: string, id: string) {
    const updated = await this.prisma.integration.updateMany({
      where: { userId, id },
      data: { connected: false },
    });
    if (!updated.count) {
      throw new NotFoundException('Integration not found');
    }
    const integration = await this.prisma.integration.findFirst({
      where: { userId, id },
    });
    if (!integration) {
      throw new NotFoundException('Integration not found');
    }
    return this.toGraphQL(integration);
  }

  private toGraphQL(integration: {
    id: string;
    name: string;
    icon: string;
    connected: boolean;
    type: IntegrationModel['type'];
  }): IntegrationModel {
    return {
      id: integration.id,
      name: integration.name,
      icon: integration.icon,
      connected: integration.connected,
      type: integration.type,
    };
  }
}
