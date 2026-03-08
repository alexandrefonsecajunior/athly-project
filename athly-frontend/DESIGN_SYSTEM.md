# 🎨 Athly Design System

Sistema de design completo e centralizado para o app Athly - Personal Trainer Inteligente com IA.

## 🚀 Visão Geral

O Athly Design System é um sistema de design **futurista, esportivo e tecnológico** baseado na identidade visual do mascote (raposa neon) com gradientes em azul e roxo. Foi desenvolvido com foco em **dark mode** e otimizado para **mobile-first**.

### Objetivos do Visual
- ✨ Transmitir tecnologia e performance
- 🏃 Movimento e dinamismo
- 🤖 Inteligência artificial
- 💎 Aparência premium e limpa
- 🎯 Hierarquia visual clara

## 📁 Estrutura de Arquivos

```
src/
├── design-system/
│   ├── tokens.ts          # Tokens centralizados (cores, espaçamentos, etc)
│   └── README.md          # Documentação técnica
├── components/
│   ├── ui/                # Componentes base do design system
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── GradientText.tsx
│   │   ├── Input.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── StatCard.tsx
│   │   ├── Skeleton.tsx
│   │   └── index.ts       # Export centralizado
│   └── layout/            # Componentes de layout
│       ├── PageContainer.tsx
│       ├── Section.tsx
│       └── index.ts
├── index.css              # Estilos globais + Design System CSS
└── pages/
    └── DesignSystemPage.tsx  # Showcase de todos os componentes
```

## 🎨 Paleta de Cores

### Cores Principais

#### Primary (Azul Neon)
```css
--color-primary-400: #0ea5e9
--color-primary-500: #0284c7  /* Main */
--color-primary-neon: #00d4ff
```

#### Secondary (Roxo Neon)
```css
--color-secondary-500: #a855f7  /* Main */
--color-secondary-neon: #bf40ff
```

### Gradientes
```css
--gradient-primary: linear-gradient(135deg, #0ea5e9 0%, #a855f7 100%)
--gradient-neon: linear-gradient(135deg, #00d4ff 0%, #bf40ff 100%)
```

### Background & Surface (Dark-first)
```css
--color-background-dark: #0a0a0f
--color-surface-card: #1a1a24
--color-border-dark: #1f1f2e
```

### Estados
```css
--color-success: #10b981
--color-warning: #f59e0b
--color-error: #ef4444
--color-info: #3b82f6
```

## 🧩 Componentes

### Button

Botões modernos com múltiplas variantes e efeitos neon.

```tsx
import { Button } from '@/components/ui'

// Variantes
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="gradient">Gradient</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>

// Com efeito glow
<Button variant="gradient" glow>Com Neon</Button>

// Tamanhos
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Estados
<Button loading>Loading...</Button>
<Button disabled>Disabled</Button>

// Full Width
<Button fullWidth>Full Width</Button>
```

### Card

Cards com diferentes estilos e efeitos visuais.

```tsx
import { Card } from '@/components/ui'

// Variantes
<Card variant="default">Default</Card>
<Card variant="gradient">Gradient Background</Card>
<Card variant="glow">Neon Border</Card>
<Card variant="flat">No Border</Card>

// Padding
<Card padding="none">No Padding</Card>
<Card padding="sm">Small</Card>
<Card padding="md">Medium (default)</Card>
<Card padding="lg">Large</Card>
```

### Input

Inputs modernos com suporte a ícones e validação.

```tsx
import { Input } from '@/components/ui'

<Input 
  label="Email" 
  placeholder="seu@email.com"
  error="Campo obrigatório"
/>

// Com ícone
<Input 
  icon={<SearchIcon />}
  placeholder="Buscar..."
/>
```

### Badge

Badges para status, categorias e destaques.

```tsx
import { Badge } from '@/components/ui'

<Badge variant="primary">Novo</Badge>
<Badge variant="neon">Premium</Badge>
<Badge variant="success">Completo</Badge>
<Badge variant="warning">Atenção</Badge>
<Badge variant="error">Erro</Badge>

// Tamanhos
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>
```

### GradientText

Texto com gradiente animado ou estático.

```tsx
import { GradientText } from '@/components/ui'

<GradientText variant="primary">
  <h1>Título com Gradiente</h1>
</GradientText>

<GradientText variant="neon" animated>
  <h1>Gradiente Animado</h1>
</GradientText>
```

### ProgressBar

Barra de progresso com múltiplos estilos.

```tsx
import { ProgressBar } from '@/components/ui'

<ProgressBar value={65} showValue />
<ProgressBar value={80} variant="gradient" glow />
<ProgressBar value={45} variant="success" />
```

### StatCard

Card para exibir métricas e estatísticas.

```tsx
import { StatCard } from '@/components/ui'

<StatCard
  label="Distância Total"
  value="142.5 km"
  icon="🏃"
  trend={{ value: 12.5, label: 'vs. semana passada' }}
  gradient
/>

<StatCard
  label="Treinos"
  value="28"
  badge={{ text: 'Recorde!', variant: 'success' }}
  variant="glow"
/>
```

### SportBadge

Badge específico para modalidades esportivas.

```tsx
import { SportBadge } from '@/components/SportBadge'

<SportBadge type="running" />
<SportBadge type="cycling" glow />
<SportBadge type="yoga" showEmoji={false} />
```

## 🎭 Classes Utilitárias

### Gradientes
```tsx
<div className="gradient-primary">Gradiente primário</div>
<div className="gradient-neon">Gradiente neon</div>
<div className="text-gradient">Texto com gradiente</div>
```

### Efeitos Glow
```tsx
<div className="glow-primary">Brilho azul</div>
<div className="glow-secondary">Brilho roxo</div>
<div className="glow-both">Brilho combinado</div>
```

### Animações
```tsx
<div className="animate-pulse-glow">Pulso suave</div>
<div className="animate-gradient">Gradiente animado</div>
```

## 📐 Layout Components

### PageContainer

Container principal para páginas.

```tsx
import { PageContainer } from '@/components/layout'

<PageContainer maxWidth="lg" centered>
  {/* Conteúdo da página */}
</PageContainer>
```

### Section

Seções consistentes com título, subtítulo e ações.

```tsx
import { Section } from '@/components/layout'

<Section
  title="Meus Treinos"
  subtitle="Acompanhe seu progresso"
  action={<Button>Ver todos</Button>}
  spacing="lg"
>
  {/* Conteúdo da seção */}
</Section>
```

## 🔤 Tipografia

### Font Families
- **DM Sans**: Corpo de texto (font-sans)
- **Space Grotesk**: Títulos e display (font-display)

### Escala Tipográfica
```css
text-xs:   12px
text-sm:   14px
text-base: 16px
text-lg:   18px
text-xl:   20px
text-2xl:  24px
text-3xl:  30px
text-4xl:  36px
text-5xl:  48px
```

### Pesos
```css
font-normal:    400
font-medium:    500
font-semibold:  600
font-bold:      700
font-extrabold: 800
```

## 📱 Responsividade

### Breakpoints
```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
```

### Mobile-First
Todos os componentes são otimizados para mobile primeiro:
```tsx
<div className="text-base md:text-lg lg:text-xl">
  Texto responsivo
</div>
```

## 🌙 Dark Mode

O design é **dark-first**, otimizado para modo escuro por padrão.

### Cores de Texto
```css
--color-text-primary:   #f9fafb  /* Branco suave */
--color-text-secondary: #d1d5db  /* Cinza claro */
--color-text-tertiary:  #9ca3af  /* Cinza médio */
--color-text-disabled:  #6b7280  /* Cinza escuro */
```

## 🎯 Exemplo de Página Completa

```tsx
import { PageContainer, Section } from '@/components/layout'
import { Card, Button, GradientText, StatCard } from '@/components/ui'

export function DashboardPage() {
  return (
    <PageContainer maxWidth="lg" centered>
      {/* Header */}
      <Section spacing="lg">
        <GradientText variant="neon" animated>
          <h1 className="text-4xl font-bold">Seu Treino de Hoje</h1>
        </GradientText>
      </Section>

      {/* Stats */}
      <Section 
        title="Estatísticas"
        subtitle="Seu desempenho esta semana"
        spacing="lg"
      >
        <div className="grid md:grid-cols-3 gap-6">
          <StatCard
            label="Distância"
            value="42.5 km"
            icon="🏃"
            gradient
          />
          <StatCard
            label="Treinos"
            value="12"
            icon="✓"
            variant="glow"
          />
          <StatCard
            label="Calorias"
            value="3,450"
            icon="🔥"
          />
        </div>
      </Section>

      {/* Workout Card */}
      <Section spacing="lg">
        <Card variant="gradient" padding="lg">
          <h2 className="text-2xl font-bold text-gradient mb-4">
            Treino Intervalado
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-6">
            45 minutos • Alta intensidade
          </p>
          <Button variant="gradient" fullWidth glow>
            Iniciar Treino
          </Button>
        </Card>
      </Section>
    </PageContainer>
  )
}
```

## 🎨 Ver Showcase Completo

Para visualizar todos os componentes e variações, acesse:

```bash
# Inicie o servidor de desenvolvimento
npm run dev

# Acesse no navegador
http://localhost:5173/design-system
```

## 📝 Boas Práticas

1. **Use variáveis CSS**: Sempre prefira `var(--color-*)` ao invés de valores hardcoded
2. **Bordas arredondadas**: Use `rounded-xl` ou `rounded-2xl` para manter consistência
3. **Transições**: Adicione `transition-all duration-300` para suavizar interações
4. **Espaçamento**: Use os tokens de spacing definidos (`--spacing-*`)
5. **Glow com moderação**: Use efeitos neon apenas em elementos importantes
6. **Mobile-first**: Sempre comece o design pelo mobile
7. **Hierarquia visual**: Use GradientText e tamanhos de fonte para destacar elementos importantes
8. **Acessibilidade**: Mantenha contraste adequado mesmo com dark mode

## 🚀 Próximas Melhorias

- [ ] Componente Toast para notificações
- [ ] Componente Modal/Dialog
- [ ] Componente Tabs
- [ ] Componente Bottom Navigation (mobile)
- [ ] Componente Timeline
- [ ] Animações de transição entre páginas
- [ ] Temas customizáveis
- [ ] Modo light (opcional)

## 📚 Recursos

- **Tokens**: `src/design-system/tokens.ts`
- **Documentação**: `src/design-system/README.md`
- **Showcase**: `src/pages/DesignSystemPage.tsx`
- **CSS Global**: `src/index.css`

---

**Athly Design System v1.0** - Criado para performance, tecnologia e movimento 🚀
