# 🐛 Debug Guide - UpdateWorkout Error

## Erro Identificado

O backend está rejeitando as propriedades dos blocos com a mensagem:
```
blocks.0.property duration should not exist
blocks.0.property distance should not exist
blocks.0.property targetPace should not exist
blocks.0.property instructions should not exist
```

## 🔍 Problema

O DTO do backend **não está esperando** essas propriedades nos blocos, ou está esperando com **nomes diferentes**.

## ✅ Debug no Frontend (Já implementado)

Os logs agora vão mostrar:
- 📤 Payload sendo enviado
- ✅ Resposta do servidor
- ❌ Erros completos com detalhes
- 📝 Mensagens de validação específicas

## 🔧 Como Corrigir no Backend

### 1. Verifique o DTO de UpdateWorkoutInput

Procure pelo arquivo do DTO (provavelmente algo como):
```
src/workouts/dto/update-workout.input.ts
```

**Verifique:**
- O DTO de `UpdateWorkoutInput` ou similar
- O DTO de `WorkoutBlockInput` ou similar

### 2. Possíveis Problemas

#### Problema 1: DTO não inclui essas propriedades

Se o DTO do bloco for assim:
```typescript
// ❌ ERRADO - falta propriedades
@InputType()
export class WorkoutBlockInput {
  @Field()
  type: string;
  // Faltam: duration, distance, targetPace, instructions
}
```

**Solução:**
```typescript
// ✅ CORRETO
@InputType()
export class WorkoutBlockInput {
  @Field()
  type: string;

  @Field(() => Int, { nullable: true })
  duration?: number;

  @Field(() => Float, { nullable: true })
  distance?: number;

  @Field({ nullable: true })
  targetPace?: string;

  @Field({ nullable: true })
  instructions?: string;
}
```

#### Problema 2: Nomes de propriedades diferentes

Backend pode estar esperando:
```typescript
// Backend espera snake_case?
{
  type: string,
  target_pace: string,  // ao invés de targetPace
  // ...
}
```

**Solução no Frontend:**
Ajustar o payload para enviar no formato esperado:
```typescript
blocks: values.blocks.map((block) => ({
  type: block.type.trim(),
  duration: block.duration,
  distance: block.distance,
  target_pace: block.targetPace?.trim() || undefined,  // snake_case
  instructions: block.instructions?.trim() || undefined,
})),
```

#### Problema 3: DTO usando @ValidateNested ou class-validator incorretamente

Se o DTO tiver decorators errados:
```typescript
// ❌ ERRADO - whitelist: true vai rejeitar propriedades extras
@InputType()
export class UpdateWorkoutInput {
  @Field()
  title: string;

  @Field(() => [WorkoutBlockInput])
  @ValidateNested({ each: true })
  @Type(() => WorkoutBlockInput)
  blocks: WorkoutBlockInput[];
}
```

Verifique se há `@ValidateNested` ou configurações do ValidationPipe.

### 3. Verificar ValidationPipe

No `main.ts` do backend, verifique:
```typescript
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,  // ⚠️ Isso pode estar removendo propriedades
    forbidNonWhitelisted: true,  // ⚠️ Isso está causando o erro
    transform: true,
  }),
);
```

**Solução Temporária:**
```typescript
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: false,  // Permite propriedades extras
    forbidNonWhitelisted: false,  // Não rejeita propriedades extras
    transform: true,
  }),
);
```

### 4. Debug no Backend

Adicione logs no resolver:
```typescript
@Mutation(() => Workout)
async updateWorkout(
  @Args('workoutId') workoutId: string,
  @Args('input') input: UpdateWorkoutInput,
) {
  console.log('📥 Recebendo input:', JSON.stringify(input, null, 2));
  console.log('🔍 Tipo do input:', typeof input);
  console.log('🔍 Blocos:', input.blocks);
  console.log('🔍 Primeiro bloco:', JSON.stringify(input.blocks[0], null, 2));
  
  // seu código...
}
```

## 📋 Checklist de Debug

### Frontend ✅ (Feito)
- [x] Logs do payload enviado
- [x] Logs de erros detalhados
- [x] Captura de mensagens de validação

### Backend (Para fazer)
- [ ] Verificar DTO de `UpdateWorkoutInput`
- [ ] Verificar DTO de `WorkoutBlockInput`
- [ ] Verificar se as propriedades estão definidas com `@Field()`
- [ ] Verificar ValidationPipe no `main.ts`
- [ ] Adicionar logs no resolver
- [ ] Verificar se há transformação de snake_case/camelCase

## 🎯 Solução Rápida (Teste)

Se você quer testar rapidamente, tente enviar apenas o `type` nos blocos:

```typescript
// Frontend - teste simplificado
blocks: values.blocks.map((block) => ({
  type: block.type.trim(),
  // Remova tudo temporariamente para testar
})),
```

Se funcionar, o problema é nas propriedades adicionais do DTO.

## 🔎 Onde Procurar no Backend

Arquivos importantes:
```
src/
├── workouts/
│   ├── dto/
│   │   ├── update-workout.input.ts  ⭐ Verifique aqui
│   │   ├── workout-block.input.ts   ⭐ E aqui
│   │   └── create-workout.input.ts
│   ├── workouts.resolver.ts          ⭐ Adicione logs aqui
│   └── workouts.service.ts
└── main.ts                           ⭐ Verifique ValidationPipe aqui
```

## 💡 Exemplo Completo de DTO Correto

```typescript
// workout-block.input.ts
import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class WorkoutBlockInput {
  @Field()
  type: string;

  @Field(() => Int, { nullable: true })
  duration?: number;

  @Field(() => Float, { nullable: true })
  distance?: number;

  @Field({ nullable: true })
  targetPace?: string;

  @Field({ nullable: true })
  instructions?: string;
}

// update-workout.input.ts
import { InputType, Field } from '@nestjs/graphql';
import { WorkoutBlockInput } from './workout-block.input';
import { SportType } from '../enums/sport-type.enum';

@InputType()
export class UpdateWorkoutInput {
  @Field()
  title: string;

  @Field(() => SportType)
  sportType: SportType;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [WorkoutBlockInput])
  blocks: WorkoutBlockInput[];
}
```

## 📞 Próximos Passos

1. **Abra o DevTools** do navegador (F12)
2. **Vá na aba Console**
3. **Tente salvar um treino**
4. **Copie o payload** que está sendo enviado (📤 Enviando payload)
5. **Procure o arquivo de DTO** no backend
6. **Compare** o payload com o que o DTO espera
7. **Ajuste** o DTO ou o frontend conforme necessário

## 🎉 Quando Funcionar

Você verá no console:
```
📤 Enviando payload: { title: "...", blocks: [...] }
✅ Resposta recebida: { id: "...", title: "...", ... }
```

E o toast de sucesso aparecerá! 🚀
