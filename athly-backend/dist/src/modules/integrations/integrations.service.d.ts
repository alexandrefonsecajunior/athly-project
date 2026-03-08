import { PrismaService } from '../../database/prisma.service';
import { IntegrationModel } from './models/integration.model';
export declare class IntegrationsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getIntegrations(userId: string): Promise<IntegrationModel[]>;
    connectIntegration(userId: string, id: string): Promise<IntegrationModel>;
    disconnectIntegration(userId: string, id: string): Promise<IntegrationModel>;
    private toGraphQL;
}
