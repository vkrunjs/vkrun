import v from 'vkrun'

const stringSchema = v.schema().string()
console.log("is string: ", stringSchema.validate('Any string'))

const booleanSchema = v.schema().boolean()
console.log("is boolean: ", booleanSchema.validate(false))

const numberSchema = v.schema().number()
console.log("is number: ", numberSchema.validate(1))

const dateSchema = v.schema().date()
console.log("is date: ", dateSchema.validate(new Date()))

const objectSchema = v.schema().object({
  string: v.schema().string(),
  boolean: v.schema().boolean(),
  number: v.schema().number(),
  date: v.schema().date()
})
console.log(
  "is valid object: ",
  objectSchema.validate({
    string: 'Any string',
    boolean: false,
    number: 1,
    date: new Date()
  })
)

const stringArraySchema = v.schema().array().string()
console.log("is string array: ", stringArraySchema.validate(['A', 'B']))
