import { IntegrationsService } from './integrations.service';
import { UserModel } from '../users/models/user.model';
export declare class IntegrationsController {
    private readonly integrationsService;
    constructor(integrationsService: IntegrationsService);
    integrations(user: UserModel): Promise<import("./models/integration.model").IntegrationModel[]>;
    connectIntegration(user: UserModel, integrationId: string): Promise<import("./models/integration.model").IntegrationModel>;
    disconnectIntegration(user: UserModel, integrationId: string): Promise<import("./models/integration.model").IntegrationModel>;
}
