import { useEffect, useState } from 'react'
import { Card, GradientText, Badge, Divider, Skeleton } from '@/components/ui'
import { Button } from '@/components/ui/Button'
import { Section } from '@/components/layout'
import { getIntegrations, connectIntegration, disconnectIntegration } from '@/services/integrationService'
import type { Integration } from '@/types'
import toast from 'react-hot-toast'

export function SettingsPage() {
  const [integrations, setIntegrations] = useState<Integration[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getIntegrations().then(setIntegrations).finally(() => setLoading(false))
  }, [])

  async function handleConnect(id: string) {
    try {
      const updated = await connectIntegration(id)
      setIntegrations((prev) =>
        prev.map((i) => (i.id === id ? updated : i))
      )
      toast.success(`${updated.name} conectado!`)
    } catch {
      toast.error('Erro ao conectar')
    }
  }

  async function handleDisconnect(id: string) {
    try {
      const updated = await disconnectIntegration(id)
      setIntegrations((prev) =>
        prev.map((i) => (i.id === id ? updated : i))
      )
      toast.success(`${updated.name} desconectado`)
    } catch {
      toast.error('Erro ao desconectar')
    }
  }

  const connectedCount = integrations.filter((i) => i.connected).length

  return (
    <div className="space-y-8">
      {/* Header */}
      <Section spacing="md">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <GradientText variant="primary">
              <h1 className="text-3xl md:text-4xl font-bold">Configurações</h1>
            </GradientText>
            <p className="mt-2 text-lg text-[var(--color-text-secondary)]">
              Conecte serviços e personalize
            </p>
          </div>
          <Badge variant="neon" size="lg">
            ⚙️ {connectedCount} conectados
          </Badge>
        </div>
      </Section>

      {/* Stats */}
      <Card variant="gradient" padding="lg">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-text-tertiary)] uppercase mb-1">
              Integrações Ativas
            </h3>
            <p className="text-4xl font-bold text-gradient">
              {connectedCount}
            </p>
          </div>
          <div className="text-5xl">
            {connectedCount > 0 ? '🔗' : '⚡'}
          </div>
        </div>
      </Card>

      <Divider variant="gradient" />

      {/* Integrations */}
      <Section 
        title="Integrações Disponíveis"
        subtitle="Sincronize seus dados com apps e dispositivos"
        spacing="md"
      >
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {integrations.map((integration) => (
              <Card 
                key={integration.id}
                variant={integration.connected ? 'glow' : 'default'}
                padding="lg"
                className="group hover:scale-[1.02] transition-all"
              >
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="text-4xl">{integration.icon}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-[var(--color-text-primary)] text-lg">
                        {integration.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        {integration.connected ? (
                          <Badge variant="success" size="sm">
                            ✓ Conectado
                          </Badge>
                        ) : (
                          <Badge variant="secondary" size="sm">
                            Desconectado
                          </Badge>
                        )}
                        <span className="text-xs text-[var(--color-text-tertiary)]">
                          {integration.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    size="md"
                    variant={integration.connected ? 'outline' : 'gradient'}
                    glow={!integration.connected}
                    onClick={() =>
                      integration.connected
                        ? handleDisconnect(integration.id)
                        : handleConnect(integration.id)
                    }
                  >
                    {integration.connected ? '🔌 Desconectar' : '🔗 Conectar'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Section>

      {/* Info Card */}
      <Card variant="default" padding="lg">
        <div className="flex items-start gap-4">
          <span className="text-3xl">💡</span>
          <div>
            <h3 className="font-bold text-[var(--color-text-primary)] mb-2">
              Por que conectar?
            </h3>
            <p className="text-[var(--color-text-secondary)] text-sm">
              Conecte seus apps e dispositivos para sincronizar automaticamente seus treinos,
              métricas e progresso. Tenha uma visão completa do seu desempenho!
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
