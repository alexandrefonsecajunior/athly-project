import { useState } from 'react'
import {
  Badge,
  Button,
  Card,
  GradientText,
  Input,
  ProgressBar,
  StatCard,
  Skeleton,
} from '@/components/ui'
import { SportBadge } from '@/components/SportBadge'

export function DesignSystemPage() {
  const [progress, setProgress] = useState(65)

  return (
    <div className="min-h-screen bg-[var(--color-background-dark)] p-6 space-y-12">
      {/* Header */}
      <header className="text-center space-y-4">
        <GradientText variant="neon" animated>
          <h1 className="text-5xl font-bold">Athly Design System</h1>
        </GradientText>
        <p className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto">
          Sistema de design futurista e esportivo para o app de treinos com IA.
          Inspirado no mascote raposa neon com gradientes azul → roxo.
        </p>
      </header>

      {/* Colors */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gradient">Cores</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <div className="h-24 rounded-xl gradient-primary mb-3" />
            <p className="text-sm font-semibold text-[var(--color-text-primary)]">Primary Gradient</p>
            <code className="text-xs text-[var(--color-text-tertiary)]">gradient-primary</code>
          </Card>
          <Card>
            <div className="h-24 rounded-xl gradient-neon mb-3" />
            <p className="text-sm font-semibold text-[var(--color-text-primary)]">Neon Gradient</p>
            <code className="text-xs text-[var(--color-text-tertiary)]">gradient-neon</code>
          </Card>
          <Card>
            <div className="h-24 rounded-xl bg-[var(--color-primary-500)] mb-3" />
            <p className="text-sm font-semibold text-[var(--color-text-primary)]">Primary</p>
            <code className="text-xs text-[var(--color-text-tertiary)]">#0284c7</code>
          </Card>
          <Card>
            <div className="h-24 rounded-xl bg-[var(--color-secondary-500)] mb-3" />
            <p className="text-sm font-semibold text-[var(--color-text-primary)]">Secondary</p>
            <code className="text-xs text-[var(--color-text-tertiary)]">#a855f7</code>
          </Card>
        </div>
      </section>

      {/* Typography */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gradient">Tipografia</h2>
        <Card padding="lg" variant="gradient">
          <div className="space-y-4">
            <div>
              <h1 className="text-5xl font-bold text-[var(--color-text-primary)]">
                Heading 1 - Display
              </h1>
              <p className="text-sm text-[var(--color-text-tertiary)]">
                font-display, text-5xl, font-bold
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[var(--color-text-primary)]">
                Heading 2
              </h2>
              <p className="text-sm text-[var(--color-text-tertiary)]">
                text-3xl, font-bold
              </p>
            </div>
            <div>
              <p className="text-lg text-[var(--color-text-secondary)]">
                Body Large - DM Sans
              </p>
              <p className="text-sm text-[var(--color-text-tertiary)]">
                text-lg, font-sans
              </p>
            </div>
            <div>
              <p className="text-base text-[var(--color-text-secondary)]">
                Body Regular - Texto padrão do aplicativo
              </p>
              <p className="text-sm text-[var(--color-text-tertiary)]">
                text-base
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* Buttons */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gradient">Botões</h2>
        <Card padding="lg">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="gradient">Gradient</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button glow>Com Glow</Button>
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
            </div>
            <div>
              <Button variant="gradient" fullWidth glow>
                Full Width Button
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Cards */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gradient">Cards</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card variant="default">
            <h3 className="font-bold text-[var(--color-text-primary)] mb-2">Default Card</h3>
            <p className="text-sm text-[var(--color-text-tertiary)]">
              Card padrão com borda e sombra sutil
            </p>
          </Card>
          <Card variant="gradient">
            <h3 className="font-bold text-[var(--color-text-primary)] mb-2">Gradient Card</h3>
            <p className="text-sm text-[var(--color-text-tertiary)]">
              Card com fundo em gradiente
            </p>
          </Card>
          <Card variant="glow">
            <h3 className="font-bold text-[var(--color-text-primary)] mb-2">Glow Card</h3>
            <p className="text-sm text-[var(--color-text-tertiary)]">
              Card com borda neon brilhante
            </p>
          </Card>
        </div>
      </section>

      {/* Badges */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gradient">Badges</h2>
        <Card padding="lg">
          <div className="flex flex-wrap gap-3">
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="neon">Neon</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Badge size="sm">Small</Badge>
            <Badge size="md">Medium</Badge>
            <Badge size="lg">Large</Badge>
          </div>
        </Card>
      </section>

      {/* Sport Badges */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gradient">Sport Badges</h2>
        <Card padding="lg">
          <div className="flex flex-wrap gap-3">
            <SportBadge type="running" />
            <SportBadge type="cycling" />
            <SportBadge type="swimming" />
            <SportBadge type="strength" />
            <SportBadge type="crossfit" />
            <SportBadge type="yoga" />
            <SportBadge type="walking" />
            <SportBadge type="other" />
          </div>
        </Card>
      </section>

      {/* Inputs */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gradient">Inputs</h2>
        <Card padding="lg">
          <div className="space-y-4 max-w-md">
            <Input label="Nome" placeholder="Digite seu nome" />
            <Input label="Email" type="email" placeholder="seu@email.com" />
            <Input label="Com erro" error="Este campo é obrigatório" />
            <Input 
              label="Com ícone" 
              icon={<span>🔍</span>}
              placeholder="Buscar..." 
            />
          </div>
        </Card>
      </section>

      {/* Progress Bars */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gradient">Progress Bars</h2>
        <Card padding="lg">
          <div className="space-y-6">
            <ProgressBar value={progress} showValue />
            <ProgressBar value={progress} variant="gradient" showValue glow />
            <ProgressBar value={85} variant="success" />
            <ProgressBar value={45} variant="warning" />
            <div className="flex gap-4">
              <Button size="sm" onClick={() => setProgress(Math.max(0, progress - 10))}>
                -10%
              </Button>
              <Button size="sm" onClick={() => setProgress(Math.min(100, progress + 10))}>
                +10%
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Stat Cards */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gradient">Stat Cards</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <StatCard
            label="Distância Total"
            value="142.5 km"
            icon="🏃"
            trend={{ value: 12.5, label: 'vs. semana passada' }}
            gradient
          />
          <StatCard
            label="Treinos Completos"
            value="28"
            icon="✓"
            badge={{ text: 'Novo recorde!', variant: 'success' }}
            variant="glow"
          />
          <StatCard
            label="Calorias"
            value="8,450"
            icon="🔥"
            trend={{ value: -5.2, label: 'vs. meta' }}
          />
        </div>
      </section>

      {/* Gradient Text */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gradient">Gradient Text</h2>
        <Card padding="lg">
          <div className="space-y-4">
            <GradientText variant="primary">
              <h2 className="text-4xl font-bold">Primary Gradient</h2>
            </GradientText>
            <GradientText variant="neon" animated>
              <h2 className="text-4xl font-bold">Neon Animated</h2>
            </GradientText>
            <GradientText variant="reverse">
              <h2 className="text-4xl font-bold">Reverse Gradient</h2>
            </GradientText>
          </div>
        </Card>
      </section>

      {/* Skeleton Loaders */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gradient">Skeleton Loaders</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-[var(--color-text-secondary)] mb-4">
              Default
            </h3>
            <Skeleton className="h-20 w-full" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[var(--color-text-secondary)] mb-4">
              Shimmer
            </h3>
            <Skeleton variant="shimmer" className="h-20 w-full" />
          </div>
        </div>
      </section>

      {/* Utility Classes */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gradient">Classes Utilitárias</h2>
        <Card padding="lg">
          <div className="space-y-6">
            <div>
              <p className="text-sm text-[var(--color-text-tertiary)] mb-2">Glow Effects</p>
              <div className="flex flex-wrap gap-4">
                <div className="w-32 h-32 rounded-xl bg-[var(--color-surface-card)] glow-primary flex items-center justify-center">
                  <span className="text-sm">glow-primary</span>
                </div>
                <div className="w-32 h-32 rounded-xl bg-[var(--color-surface-card)] glow-secondary flex items-center justify-center">
                  <span className="text-sm">glow-secondary</span>
                </div>
                <div className="w-32 h-32 rounded-xl bg-[var(--color-surface-card)] glow-both flex items-center justify-center">
                  <span className="text-sm">glow-both</span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm text-[var(--color-text-tertiary)] mb-2">Animations</p>
              <div className="flex flex-wrap gap-4">
                <div className="w-32 h-32 rounded-xl gradient-primary animate-pulse-glow flex items-center justify-center text-white text-center text-sm px-2">
                  animate-pulse-glow
                </div>
                <div className="w-32 h-32 rounded-xl gradient-primary animate-gradient flex items-center justify-center text-white text-center text-sm px-2">
                  animate-gradient
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="text-center py-12">
        <GradientText>
          <p className="text-xl font-bold">Athly Design System v1.0</p>
        </GradientText>
        <p className="text-[var(--color-text-tertiary)] mt-2">
          Criado para performance, tecnologia e movimento
        </p>
      </footer>
    </div>
  )
}
