
# CreateTrainingPlanDto


## Properties

Name | Type
------------ | -------------
`startDate` | string
`objective` | string
`status` | string
`targetDate` | string
`sports` | Array&lt;string&gt;
`autoGenerate` | boolean

## Example

```typescript
import type { CreateTrainingPlanDto } from ''

// TODO: Update the object below with actual values
const example = {
  "startDate": null,
  "objective": null,
  "status": null,
  "targetDate": null,
  "sports": null,
  "autoGenerate": null,
} satisfies CreateTrainingPlanDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateTrainingPlanDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


