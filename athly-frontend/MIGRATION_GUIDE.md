# 🔄 Guia de Migração - Athly Design System

Guia para migrar componentes existentes para o novo Design System com identidade visual futurista.

## 📋 Checklist Geral

- [ ] Atualizar cores para usar variáveis CSS do Design System
- [ ] Substituir classes de cor antigas por novas
- [ ] Adicionar efeitos de transição suaves
- [ ] Atualizar bordas arredondadas (rounded-xl, rounded-2xl)
- [ ] Implementar hover states modernos
- [ ] Adicionar efeitos glow onde apropriado
- [ ] Revisar espaçamentos usando tokens
- [ ] Testar responsividade mobile-first

## 🎨 Migração de Cores

### Cores de Texto

❌ **Antes:**
```tsx
className="text-slate-900 dark:text-white"
className="text-slate-600 dark:text-slate-400"
className="text-slate-500"
```

✅ **Depois:**
```tsx
className="text-[var(--color-text-primary)]"
className="text-[var(--color-text-secondary)]"
className="text-[var(--color-text-tertiary)]"
```

### Cores de Background

❌ **Antes:**
```tsx
className="bg-white dark:bg-slate-900"
className="bg-slate-200 dark:bg-slate-700"
```

✅ **Depois:**
```tsx
className="bg-[var(--color-surface-card)]"
className="bg-[var(--color-surface-dark)]"
```

### Cores de Borda

❌ **Antes:**
```tsx
className="border-slate-200 dark:border-slate-800"
```

✅ **Depois:**
```tsx
className="border-[var(--color-border-dark)]"
```

### Cores Primárias

❌ **Antes:**
```tsx
className="bg-sky-600 hover:bg-sky-700"
className="text-sky-600"
className="border-sky-600"
```

✅ **Depois:**
```tsx
className="bg-[var(--color-primary-500)] hover:bg-[var(--color-primary-600)]"
className="text-[var(--color-primary-400)]"
className="border-[var(--color-primary-500)]"
```

## 🔘 Migração de Botões

❌ **Antes:**
```tsx
<button className="bg-sky-600 text-white px-4 py-2 rounded-lg">
  Clique aqui
</button>
```

✅ **Depois:**
```tsx
import { Button } from '@/components/ui'

<Button variant="primary">Clique aqui</Button>
<Button variant="gradient" glow>Destaque</Button>
```

## 🎴 Migração de Cards

❌ **Antes:**
```tsx
<div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
  {children}
</div>
```

✅ **Depois:**
```tsx
import { Card } from '@/components/ui'

<Card>{children}</Card>
<Card variant="gradient">{children}</Card>
<Card variant="glow">{children}</Card>
```

## 📝 Migração de Inputs

❌ **Antes:**
```tsx
<input 
  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 dark:bg-slate-800 dark:text-white"
  placeholder="Digite aqui..."
/>
```

✅ **Depois:**
```tsx
import { Input } from '@/components/ui'

<Input 
  label="Nome"
  placeholder="Digite aqui..."
  error={errors.name}
/>
```

## 🏷️ Migração de Badges

❌ **Antes:**
```tsx
<span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs text-blue-800">
  Novo
</span>
```

✅ **Depois:**
```tsx
import { Badge } from '@/components/ui'

<Badge variant="primary">Novo</Badge>
<Badge variant="neon">Premium</Badge>
```

## ✨ Adicionar Efeitos Modernos

### Hover States

❌ **Antes:**
```tsx
<div className="hover:shadow-md">
  Card
</div>
```

✅ **Depois:**
```tsx
<Card className="hover:border-[var(--color-primary-500)] hover:shadow-[var(--shadow-neon)] transition-all duration-300">
  Card
</Card>
```

### Gradientes

✅ **Adicione onde apropriado:**
```tsx
// Background com gradiente
<div className="gradient-primary">

// Texto com gradiente
import { GradientText } from '@/components/ui'
<GradientText variant="neon" animated>
  Título Destacado
</GradientText>
```

### Efeitos Glow

✅ **Para elementos importantes:**
```tsx
<Button variant="gradient" glow>
  Iniciar Treino
</Button>

<Card variant="glow">
  {/* Conteúdo importante */}
</Card>
```

## 📐 Migração de Layout

### Container de Página

❌ **Antes:**
```tsx
<div className="max-w-6xl mx-auto px-4 py-6">
  {children}
</div>
```

✅ **Depois:**
```tsx
import { PageContainer } from '@/components/layout'

<PageContainer maxWidth="lg" centered>
  {children}
</PageContainer>
```

### Seções

❌ **Antes:**
```tsx
<div className="space-y-6">
  <div className="flex justify-between items-center">
    <h2 className="text-2xl font-bold">Título</h2>
    <button>Ação</button>
  </div>
  {children}
</div>
```

✅ **Depois:**
```tsx
import { Section } from '@/components/layout'

<Section
  title="Título"
  subtitle="Descrição opcional"
  action={<Button>Ação</Button>}
  spacing="lg"
>
  {children}
</Section>
```

## 🎯 Migração de Componentes Específicos

### WorkoutCard (Exemplo Real)

✅ **Já migrado!** Veja o arquivo atualizado:
- Usa `Card` do Design System
- Cores atualizadas com variáveis CSS
- Hover states modernos com glow
- Badges de status integrados
- Ícones e métricas melhorados

### SportBadge (Exemplo Real)

✅ **Já migrado!** Agora inclui:
- Cores neon e futuristas
- Bordas e padding atualizados
- Opção de glow effect
- Transições suaves

## 🔄 Processo de Migração Passo a Passo

### 1. Identifique os Componentes

Liste todos os componentes que precisam ser migrados:
```bash
# Encontre componentes com cores antigas
grep -r "bg-white\|dark:bg-slate" src/components
grep -r "text-slate\|text-gray" src/components
grep -r "border-slate" src/components
```

### 2. Priorize

Ordem sugerida:
1. ✅ Componentes base (Button, Card, Input) - **FEITO**
2. ✅ Componentes de display (Badge, SportBadge) - **FEITO**
3. ✅ Componentes de dados (WorkoutCard, StatCard) - **FEITO**
4. 🔄 Páginas principais (Dashboard, Workout, Profile)
5. 🔄 Componentes menores e utilitários

### 3. Teste Cada Componente

- [ ] Visual no dark mode
- [ ] Hover states
- [ ] Estados de loading/disabled
- [ ] Responsividade mobile
- [ ] Transições suaves
- [ ] Acessibilidade

### 4. Documente Mudanças

Para cada componente migrado:
```tsx
/**
 * ComponentName
 * 
 * Migrado para Athly Design System v1.0
 * - Cores atualizadas para variáveis CSS
 * - Efeitos hover modernos
 * - Transições suaves
 * - Suporte a glow effects
 */
```

## 📝 Exemplo Completo de Migração

### Antes (Código Antigo)

```tsx
function DashboardCard({ title, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 hover:shadow-md">
      <h3 className="text-sm text-slate-600 dark:text-slate-400">
        {title}
      </h3>
      <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
        {value}
      </p>
    </div>
  )
}
```

### Depois (Código Novo)

```tsx
import { Card } from '@/components/ui'

function DashboardCard({ title, value, icon, trend }) {
  return (
    <Card 
      variant="default"
      className="hover:border-[var(--color-primary-500)] hover:shadow-[var(--shadow-neon)] transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-[var(--color-text-tertiary)] uppercase">
            {title}
          </p>
          <p className="mt-3 text-3xl font-bold text-gradient">
            {value}
          </p>
        </div>
        {icon && (
          <span className="text-3xl text-[var(--color-primary-400)]">
            {icon}
          </span>
        )}
      </div>
      {trend && (
        <p className="mt-3 text-sm text-[var(--color-success)]">
          ↗ {trend}% vs. semana passada
        </p>
      )}
    </Card>
  )
}
```

## 🎨 Melhorias Opcionais

Após migração básica, considere adicionar:

1. **Animações de entrada**
```tsx
<Card className="animate-fade-in">
```

2. **Efeitos de hover avançados**
```tsx
<Card className="group">
  <h3 className="group-hover:text-gradient transition-all">
    Título
  </h3>
</Card>
```

3. **Gradientes sutis**
```tsx
<Card variant="gradient">
  {/* Fundo com gradiente sutil */}
</Card>
```

4. **Badges de status**
```tsx
import { Badge } from '@/components/ui'

<Badge variant="neon">Premium</Badge>
```

## ✅ Checklist Final

Antes de considerar a migração completa:

- [ ] Todos os componentes base migrados
- [ ] Cores consistentes em todo o app
- [ ] Hover states funcionando
- [ ] Transições suaves implementadas
- [ ] Mobile-first responsivo
- [ ] Dark mode testado
- [ ] Performance verificada
- [ ] Acessibilidade mantida
- [ ] Documentação atualizada

## 📚 Recursos

- **Design System completo**: `DESIGN_SYSTEM.md`
- **Tokens centralizados**: `src/design-system/tokens.ts`
- **Showcase de componentes**: `src/pages/DesignSystemPage.tsx`
- **Documentação técnica**: `src/design-system/README.md`

---

**Dúvidas?** Consulte o showcase completo em `/design-system` ou a documentação técnica.
