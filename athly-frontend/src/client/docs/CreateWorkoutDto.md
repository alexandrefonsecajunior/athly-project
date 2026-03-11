
# CreateWorkoutDto


## Properties

Name | Type
------------ | -------------
`date` | string
`trainingPlanId` | string
`weeklyGoalId` | string
`sportType` | string
`title` | string
`description` | string
`blocks` | [Array&lt;WorkoutBlockDto&gt;](WorkoutBlockDto.md)
`status` | string
`intensity` | number

## Example

```typescript
import type { CreateWorkoutDto } from ''

// TODO: Update the object below with actual values
const example = {
  "date": null,
  "trainingPlanId": null,
  "weeklyGoalId": null,
  "sportType": null,
  "title": null,
  "description": null,
  "blocks": null,
  "status": null,
  "intensity": null,
} satisfies CreateWorkoutDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateWorkoutDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


