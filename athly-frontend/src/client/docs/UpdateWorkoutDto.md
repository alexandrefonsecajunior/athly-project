
# UpdateWorkoutDto


## Properties

Name | Type
------------ | -------------
`title` | string
`description` | string
`blocks` | [Array&lt;WorkoutBlockDto&gt;](WorkoutBlockDto.md)
`intensity` | number
`status` | string
`sportType` | string
`date` | string

## Example

```typescript
import type { UpdateWorkoutDto } from ''

// TODO: Update the object below with actual values
const example = {
  "title": null,
  "description": null,
  "blocks": null,
  "intensity": null,
  "status": null,
  "sportType": null,
  "date": null,
} satisfies UpdateWorkoutDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UpdateWorkoutDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


