import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Activity, Check } from 'lucide-react'
import { Badge } from '@/components/ui'
import { Button } from '@/components/ui/Button'
import { initiateStravaOAuth } from '@/services/integrationService'
import toast from 'react-hot-toast'

interface StravaAuthModalProps {
  onContinueWithoutStrava: () => void
  onClose: () => void
}

export function StravaAuthModal({ onContinueWithoutStrava, onClose }: StravaAuthModalProps) {
  const [connecting, setConnecting] = useState(false)

  async function handleConnect() {
    try {
      setConnecting(true)
      await initiateStravaOAuth()
    } catch {
      toast.error('Erro ao conectar com o Strava')
      setConnecting(false)
    }
  }

  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '28rem',
          borderRadius: '1rem',
          backgroundColor: 'var(--color-surface-card)',
          border: '1px solid var(--color-border-dark)',
          padding: '1.5rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        }}
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <Activity className="h-12 w-12 text-[var(--color-primary-400)]" />
            </div>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
              Conecte seu Strava
            </h2>
            <p className="text-[var(--color-text-secondary)] text-sm">
              Para gerar um plano personalizado, precisamos acessar seu histórico de treinos.
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-3">
            {[
              'Analisa seu ritmo e distâncias reais',
              'Adapta a intensidade ao seu nível atual',
              'Cria progressão baseada em dados',
              'Gera planos cada vez mais precisos',
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-3">
                <Check className="h-4 w-4 shrink-0 text-[var(--color-primary-400)]" />
                <span className="text-sm text-[var(--color-text-secondary)]">{benefit}</span>
              </div>
            ))}
          </div>

          <div
            style={{ borderTop: '1px solid var(--color-surface-dark)', paddingTop: '1rem' }}
            className="space-y-3"
          >
            <p className="text-xs text-[var(--color-text-tertiary)] text-center">
              Sem o Strava, geramos um plano de avaliação inicial com 5 treinos para medir seu
              nível antes de personalizar.
            </p>
            <div className="flex justify-center">
              <Badge variant="secondary" size="sm">
                Plano de avaliação disponível sem Strava
              </Badge>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Button
              variant="gradient"
              glow
              size="lg"
              loading={connecting}
              onClick={handleConnect}
              className="w-full"
            >
              Conectar Strava
            </Button>
            <Button
              variant="ghost"
              size="md"
              onClick={onContinueWithoutStrava}
              className="w-full"
            >
              Gerar plano de avaliação sem Strava
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
