import type { Integration } from '@/types'
import { api } from './api'

export async function getIntegrations(): Promise<Integration[]> {
  try {
    const integrations = await api.getIntegrations()
    return integrations
  } catch (error) {
    console.error('Failed to get integrations:', error)
    return []
  }
}

export async function connectIntegration(integrationId: string): Promise<Integration> {
  const integration = await api.connectIntegration(integrationId)
  return integration
}

export async function disconnectIntegration(integrationId: string): Promise<Integration> {
  const integration = await api.disconnectIntegration(integrationId)
  return integration
}
