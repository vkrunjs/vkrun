<div align="center">
  <img src="../../../logo.svg" width="200px" align="center" alt="Vkrun logo" />
  <h1 align="center">Vkrun - Schema</h1>
  <br/>
  <p align="center">
    Schema is a Vkrun module for data validation at runtime. 
  </p>

  <p align="center">
    Simplifying and enhancing the validation of various data types in JavaScript and TypeScript projects, it also provides the flexibility to define complex and interdependent validation schemas, offering a robust, customizable, and scalable solution for your validation needs.
  </p>

</div>

<h3 align="center">Features</h3>

- Creation of simple to complex schemas.
- Support for JavaScript and TypeScript.
- Support for synchronous and asynchronous validation.
- Works on both server and client side.

<hr/>

<p align="center">
  <a href="https://github.com/jukerah" rel="nofollow"><img src="https://img.shields.io/badge/created%20by-Mario%20Elvio-blue.svg" alt="created by Mario Elvio"></a>
  <a href="https://opensource.org/licenses/MIT" rel="nofollow"><img src="https://img.shields.io/badge/License%20-MIT-blue.svg" alt="License MIT"></a>
  <a href="https://www.npmjs.com/package/vkrun" rel="nofollow"><img src="https://img.shields.io/npm/dw/vkrun.svg?color=blue" alt="npm"></a>
  <a href="https://www.npmjs.com/package/vkrun" rel="nofollow"><img src="https://img.shields.io/github/stars/jukerah/vkrun" alt="stars"></a>
</p>

<h2 align="center">Quick Start</h2>

- Import schema.
- Chain methods to build a schema.
- After completing the schema, call a validation method with the input value:
  - .validate(value: any): boolean
  - .validateAsync(value: any): Promise<boolean>
  - .test(value: any, valueName: string): Tests
  - .testAsync(value: any, valueName: string): Promise<Tests>
  - .throw(value: any, valueName: string, ClassError?: ErrorTypes): void
  - .throwAsync(value: any, valueName: string, ClassError?: ErrorTypes): Promise<void>

```ts
import { schema } from "vkrun"

const userSchema = schema().object({
  id: schema().string().UUID(),
  fullName: schema().string().minWord(2),
  email: schema().string().email()
})

const validateA = userSchema.validate({
  id: "3ef7c105-c4ea-444d-bf47-e2e1a49ea613",
  fullName: "Full Name",
  email: "email@mail.com"
})

const validateB = userSchema.validate({
  id: "3ef7c105-c4ea-444d-bf47-e2e1a49ea613",
  fullName: "Full Name",
  email: "email" // invalid email
})

console.log(validateA) // true
console.log(validateB) // false
```

### Content
- [Vkrun](https://github.com/vkrunjs/vkrun)
- [Introduction](#introduction)
- schema
  - Types of Validations
    - [.validate](#validate)
    - [.validateAsync](#validateAsync)
    - [.test](#test)
    - [.testAsync](#testAsync)
    - [.throw](#throw)
    - [.throwAsync](#throwAsync)
  - [.string](#string)
    - [.minWord](#minWord)
    - [.email](#email)
    - [.UUID](#UUID)
    - [.maxLength](#maxLength)
    - [.minLength](#minLength)
    - [.time](#time)
  - [.number](#number)
    - [.float](#float)
    - [.integer](#integer)
    - [.min](#number-min)
    - [.max](#number-max)
    - [.positive](#positive)
    - [.negative](#negative)
  - [.bigInt](#big-int)
    - [.min](#big-int-min)
    - [.max](#big-int-max)
    - [.positive](#big-int-positive)
    - [.negative](#big-int-negative)
  - [.boolean](#boolean)
  - [.date](#date)
    - [.min](#min-date)
    - [.max](#max-date)
  - [.notRequired](#notRequired)
  - [.nullable](#nullable)
  - [.equal](#equal)
  - [.notEqual](#notEqual)
  - [.oneOf](#oneOf)
  - [.notOneOf](#notOneOf)
  - [.object](#object)
  - [.alias](#alias)
  - [.array](#array)
    - [.string](#string-array)
      - [.minWord](#minWord-array)
      - [.email](#email-array)
      - [.UUID](#UUID-array)
      - [.maxLength](#maxLength-array)
      - [.minLength](#minLength-array)
      - [.time](#time-array)
    - [.number](#number-array)
      - [.float](#float-array)
      - [.integer](#integer-array)
      - [.min](#number-min-array)
      - [.max](#number-max-array)
      - [.positive](#positive-array)
      - [.negative](#negative-array)
    - [.bigInt](#big-int-array)
      - [.min](#big-int-min-array)
      - [.max](#big-int-max-array)
      - [.positive](#big-int-positive-array)
      - [.negative](#big-int-negative-array)
    - [.boolean](#boolean-array)
    - [.date](#date-array)
      - [.min](#min-date-array)
      - [.max](#max-date-array)
    - [.object](#object-array)
  - [.setLocation](#setLocation)
- [Example projects](#example-projects)

<h2 align="center">Types of Validations</h2>
  
<h2 id="validate">
  .<span style="color:#66B2FF">validate</span>(<span style="color:#66B2FF">value</span>: <span style="color:#99CC99">any</span>): <span style="color:#99CC99">boolean</span>
</h2>

- value: It is the value to be tested.
- Validation returns a boolean.

```ts
import { schema } from "vkrun"

const schema = schema().number()

const validateA = schema.validate(123)
const validateB = schema.validate("123")

console.log(validateA) // true
console.log(validateB) // false
```

<h2 id="validateAsync">
  .<span style="color:#66B2FF">validateAsync</span>(<span style="color:#66B2FF">value</span>: <span style="color:#99CC99">any</span>): <span style="color:#66B2FF">Promise</span><<span style="color:#99CC99">boolean</span>>
</h2>

- value: It is a Promise of the value to be tested.
- Validation returns a Promise<boolean>.

```ts
import { schema } from "vkrun"

const userSchema = schema().string().email()

const validatedSchema = await userSchema.validateAsync(getEmail())

console.log(validatedSchema) // true
```

<h2 id="test">
  .<span style="color:#66B2FF">test</span>(<span style="color:#66B2FF">value</span>: <span style="color:#99CC99">any</span>, <span style="color:#66B2FF">valueName</span>: <span style="color:#99CC99">string</span>): <span style="color:#99CC99">Tests</span>
</h2>

- value: It is the value to be tested.
- valueName: It is the name of the tested value and will be referenced in tests and error messages.

```ts
import { schema } from "vkrun"

const schema = schema().number()

const validatedSchema = schema.test(123, "value_name")
```

<p>output validatedSchema:</p>

```ts
{
  passedAll: true,
  passed: 2,
  failed: 0,
  totalTests: 2,
  successes: [
    {
      method: "required",
      name: "value_name",
      expect: "value other than undefined",
      received: 123
    },
    {
      method: "number",
      name: "value_name",
      expect: "number type",
      received: 123
    }
  ],
  errors: [],
  time: "0s 1ms"
}
```

<h2 id="testAsync">
  .<span style="color:#66B2FF">testAsync</span>(<span style="color:#66B2FF">value</span>: <span style="color:#99CC99">any</span>, <span style="color:#66B2FF">valueName</span>: <span style="color:#99CC99">string</span>): <span style="color:#66B2FF">Promise</span><<span style="color:#99CC99">Tests</span>>
</h2>

- value: It is a Promise of the value to be tested.
- valueName: It is the name of the tested value and will be referenced in tests and error messages.

```ts
import { schema } from "vkrun"

const schema = schema().number().float()

const validatedSchema = await schema.testAsync(getNumber(), "value_name")
```

<p>output validatedSchema:</p>

```ts
{
  passedAll: false,
  passed: 2,
  failed: 1,
  totalTests: 3,
  successes: [
    {
      method: "required",
      name: "value_name",
      expect: "value other than undefined",
      received: 123
    },
    {
      method: "number",
      name: "value_name",
      expect: "number type",
      received: 123
    }
  ],
  errors: [
    {
      method: "float",
      type: "invalid value",
      name: "value_name",
      expect: "float type",
      received: 123,
      message: "value_name must be a float!"
    }
  ],
  time: "0s 1ms"
}
```

<h2 id="throw">
  .<span style="color:#66B2FF">throw</span>(<span style="color:#66B2FF">value</span>: <span style="color:#99CC99">any</span>, <span style="color:#66B2FF">valueName</span>: <span style="color:#99CC99">string</span>, <span style="color:#66B2FF">ClassError</span>?: <span style="color:#99CC99">string</span>): <span style="color:#99CC99">void</span>
</h2>

- value: It is the value to be tested.
- valueName: It is the name of the tested value and will be referenced in tests and error messages.
- When validation fails, an error will be generated with the message from the first failed test.

```ts
import { schema } from "vkrun"

const schema = schema().number().float()

try {
  schema.throw("123", "value_name")
} catch (error) {
  console.log(error.message) // value_name must be a number type!
}
```

<h2 id="throwAsync">
  .<span style="color:#66B2FF">throwAsync</span>(<span style="color:#66B2FF">value</span>: <span style="color:#99CC99">any</span>, <span style="color:#66B2FF">valueName</span>: <span style="color:#99CC99">string</span>, <span style="color:#66B2FF">ClassError</span>?: <span style="color:#99CC99">string</span>): <span style="color:#66B2FF">Promise</span><<span style="color:#99CC99">void</span>>
</h2>

- value: It is a Promise of the value to be tested.
- valueName: It is the name of the tested value and will be referenced in tests and error messages.
- When validation fails, an error will be generated with the message from the first failed test.

```ts
import { schema } from "vkrun"

const schema = schema().number().float()

try {
  await schema.throw(getNumber(), "value_name")
} catch (error) {
  console.log(error.message) // value_name must be a number type!
}
```

<h2 id="notRequired">
  .<span style="color:#66B2FF">notRequired</span>()
</h2>

<p>By default, vkrun types the value as required, meaning the value must be different from undefined. If the value is not required and should be validated only if a value other than undefined is provided, we should use the notRequired method.</p>
  
```ts
import { schema } from "vkrun"

const schema = schema().number().notRequired()

const validateA = schema.validate(undefined)
const validateB = schema.validate(123)
const validateC = schema.validate("123")

console.log(validateA) // true
console.log(validateB) // true
console.log(validateC) // false
```

<h2 id="nullable">
  .<span style="color:#66B2FF">nullable</span>()
</h2>

<p>When a value can be null, we use the nullable method. The difference between the notRequired and nullable methods is:</p>
  
- **nullable**: It can be null or any other type, **except undefined**.
- **notRequired**: It can be undefined or any other type.

```ts
import { schema } from "vkrun"

const schema = schema().number().nullable()

const validateA = schema.validate(null)
const validateB = schema.validate(undefined)
const validateC = schema.validate("123")
const validateD = schema.validate(123)

console.log(validateA) // true
console.log(validateB) // false
console.log(validateC) // false
console.log(validateD) // true
```

<h2 id="setLocation">
  .<span style="color:#66B2FF">setLocation</span>()
</h2>

<p>The vkrun allows you to change the default error message for each method.</p>

- You can use keywords to customize your message. Available keywords:
  - string:
    - invalidValue: [value] and [valueName]
    - minWord: [value], [valueName] and [minWord]
    - uuid: [value] and [valueName]
    - email: [value] and [valueName]
    - time: [value], [valueName] and [type]
    - maxLength: [value], [valueName] and [maxLength],
    - minLength: [value], [valueName] and [minLength]
  - number:
    - invalidValue: [value] and [valueName]
    - float: [value] and [valueName]
    - integer: [value] and [valueName]
    - min: [valueName] and [min]
    - max: [valueName] and [max]
    - positive: [valueName]
    - negative: [valueName]
  - bigInt:
    - invalidValue: [value] and [valueName]
    - min: [valueName] and [min]
    - max: [valueName] and [max]
    - positive: [valueName]
    - negative: [valueName]
  - boolean:
    - invalidValue: [value] and [valueName]
  - required: [value] and [valueName]
  - date:
    - invalidValue: [value], [valueName] and [type]
    - min: [value], [valueName] and [refDate]
    - max: [value], [valueName]  and [refDate]
  - object: [valueName]
  - array: [valueName]

```ts
import { setLocation } from "vkrun"

// change a message
setLocation({
  string: {
    invalidValue: '[valueName] must be a string type!'
  }
})

// or change all messages
setLocation({
  string: {
    invalidValue: '[valueName] must be a string type!',
    minWord: '[valueName] must have at least [minWord] words!',
    uuid: '[valueName] must be a UUID type!',
    email: 'email [value] is invalid!',
    time: 'the time [value] is not in the format [type]!',
    maxLength: '[valueName] must have a maximum of [maxLength] characters!',
    minLength: '[valueName] must have a minimum of [minLength] characters!'
  },
  number: {
    invalidValue: '[valueName] must be a number type!',
    float: '[valueName] must be a float!',
    integer: '[valueName] must be a integer!',
    min: '[valueName] must be greater than or equal to [min]!',
    max: '[valueName] must be less than or equal to [max]!',
    positive: '[valueName] must be positive!',
    negative: '[valueName] must be negative!'
  },
  bigInt: {
    invalidValue: '[valueName] must be a bigint type!',
    min: '[valueName] must be greater than or equal to [min]!',
    max: '[valueName] must be less than or equal to [max]!',
    positive: '[valueName] must be positive!',
    negative: '[valueName] must be negative!'
  },
  boolean: {
    invalidValue: '[valueName] must be a boolean type!'
  },
  required: '[valueName] is required!',
  date: {
    invalidValue: 'the date [valueName] is not in the format [type]!',
    min: 'the [valueName] [value] must be greater than or equal to the [refDate]!',
    max: 'the [valueName] [value] must be less than or equal to the [refDate]!'
  },
  object: '[valueName] value must be an object!',
  array: '[valueName] value must be an array!',
  nullable: '[valueName] value can be null, but other than undefined!',
  equal: 'value does not match!',
  notEqual: 'value may not match!',
  oneOf: 'value does not have a match!',
  notOneOf: 'value cannot have a matches!'
})
```

<h2 id="string">
  .<span style="color:#66B2FF">string</span>()
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().string()

const validateA = schema.validate("any text")
const validateB = schema.validate(false)

console.log(validateA) // true
console.log(validateB) // false
```

<h2 id="minLength">
  .<span style="color:#66B2FF">string</span>().<span style="color:#FFFFC0">minLength</span>(<span style="color:#66B2FF">limit</span>: <span style="color:#99CC99">number</span>)
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().string().minLength(5)

const validateA = schema.validate("12345")
const validateB = schema.validate("1234")

console.log(validateA) // true
console.log(validateB) // false
```

<h2 id="maxLength">
  .<span style="color:#66B2FF">string</span>().<span style="color:#FFFFC0">maxLength</span>(<span style="color:#66B2FF">limit</span>: <span style="color:#99CC99">number</span>)
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().string().maxLength(5)

const validateA = schema.validate("12345")
const validateB = schema.validate("123456")

console.log(validateA) // true
console.log(validateB) // false
```

<h2 id="email">
  .<span style="color:#66B2FF">string</span>().<span style="color:#FFFFC0">email</span>()
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().string().email()

const validateA = schema.validate("any_email@mail.com")
const validateB = schema.validate("any_email@mail")

console.log(validateA) // true
console.log(validateB) // false
```

<h2 id="UUID">
  .<span style="color:#66B2FF">string</span>().<span style="color:#FFFFC0">UUID</span>()
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().string().UUID()

const validateA = schema.validate("550e8400-e29b-41d4-a716-446655440000")
const validateB = schema.validate("123")

console.log(validateA) // true
console.log(validateB) // false
```

<h2 id="minWord">
  .<span style="color:#66B2FF">string</span>().<span style="color:#FFFFC0">minWord</span>(<span style="color:#66B2FF">limit</span>: <span style="color:#99CC99">number</span>)
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().string().minWord(2)

const validateA = schema.validate("one two")
const validateB = schema.validate("one")

console.log(validateA) // true
console.log(validateB) // false
```

<h2 id="time">
  .<span style="color:#66B2FF">string</span>().<span style="color:#FFFFC0">time</span>(<span style="color:#66B2FF">type</span>: <span style="color:#99CC99">TimeTypes</span>)
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().string().time("HH:MMM")

const validateA = schema.validate("20:03")
const validateB = schema.validate("20:1")

console.log(validateA) // true
console.log(validateB) // false
```

<h2 id="number">
  .<span style="color:#66B2FF">number</span>()
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().number()

const validateA = schema.validate(123)
const validateB = schema.validate("123")

console.log(validateA) // true
console.log(validateB) // false
```

<h2 id="float">
  .<span style="color:#66B2FF">number</span>().<span style="color:#FFFFC0">float</span>()
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().number().float()

const validateA = schema.validate(123.5)
const validateB = schema.validate(123)

console.log(validateA) // true
console.log(validateB) // false
```

<h2 id="integer">
  .<span style="color:#66B2FF">number</span>().<span style="color:#FFFFC0">integer</span>()
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().number().integer()

const validateA = schema.validate(123)
const validateB = schema.validate(123.5)

console.log(validateA) // true
console.log(validateB) // false
```

<h2 id="number-min">
  .<span style="color:#66B2FF">number</span>().<span style="color:#FFFFC0">min</span>(<span style="color:#66B2FF">min</span>: <span style="color:#99CC99">number</span>)
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().number().min(1)

const validateA = schema.validate(1)
const validateB = schema.validate(0)

console.log(validateA) // true
console.log(validateB) // false
```

<h2 id="number-max">
  .<span style="color:#66B2FF">number</span>().<span style="color:#FFFFC0">max</span>(<span style="color:#66B2FF">max</span>: <span style="color:#99CC99">number</span>)
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().number().max(1)

const validateA = schema.validate(1)
const validateB = schema.validate(2)

console.log(validateA) // true
console.log(validateB) // false
```

<h2 id="positive">
  .<span style="color:#66B2FF">number</span>().<span style="color:#FFFFC0">positive</span>()
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().number().positive() // > 0

const validateA = schema.validate(1)
const validateB = schema.validate(0)
const validateC = schema.validate(-1)

console.log(validateA) // true
console.log(validateB) // false
console.log(validateC) // false
```

<h2 id="negative">
  .<span style="color:#66B2FF">number</span>().<span style="color:#FFFFC0">negative</span>()
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().number().negative() // < 0

const validateA = schema.validate(-1)
const validateB = schema.validate(0)
const validateC = schema.validate(1)

console.log(validateA) // true
console.log(validateB) // false
console.log(validateC) // false
```

<h2 id="big-int">
  .<span style="color:#66B2FF">bigInt</span>()
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().bigInt()

const validateA = schema.validate(123n)
const validateB = schema.validate("123n")

console.log(validateA) // true
console.log(validateB) // false
```

<h2 id="big-int-min">
  .<span style="color:#66B2FF">bigInt</span>().<span style="color:#FFFFC0">min</span>(<span style="color:#66B2FF">min</span>: <span style="color:#99CC99">bigint</span>)
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().bigInt().min(2n)

const validateA = schema.validate(2n)
const validateB = schema.validate(1n)

console.log(validateA) // true
console.log(validateB) // false
```

<h2 id="big-int-max">
  .<span style="color:#66B2FF">bigInt</span>().<span style="color:#FFFFC0">max</span>(<span style="color:#66B2FF">max</span>: <span style="color:#99CC99">bigint</span>)
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().bigInt().max(1n)

const validateA = schema.validate(1n)
const validateB = schema.validate(2n)

console.log(validateA) // true
console.log(validateB) // false
```

<h2 id="big-int-positive">
  .<span style="color:#66B2FF">bigInt</span>().<span style="color:#FFFFC0">positive</span>()
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().bigInt().positive() // > 0n

const validateA = schema.validate(1n)
const validateB = schema.validate(0n)
const validateC = schema.validate(-1n)

console.log(validateA) // true
console.log(validateB) // false
console.log(validateC) // false
```

<h2 id="big-int-negative">
  .<span style="color:#66B2FF">bigInt</span>().<span style="color:#FFFFC0">negative</span>()
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().bigInt().negative() // < 0n

const validateA = schema.validate(-1n)
const validateB = schema.validate(0n)
const validateC = schema.validate(1n)

console.log(validateA) // true
console.log(validateB) // false
console.log(validateC) // false
```

<h2 id="boolean">
  .<span style="color:#66B2FF">boolean</span>()
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().boolean()

const validateA = schema.validate(false)
const validateB = schema.validate("false")

console.log(validateA) // true
console.log(validateB) // false
```

<h2 id="date">
  .<span style="color:#66B2FF">date</span>(<span style="color:#66B2FF">type</span>?: <span style="color:#99CC99">DateTypes</span>)
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().date()

const validateA = schema.validate(new date())
const validateB = schema.validate(true)

console.log(validateA) // true
console.log(validateB) // false
```

<h2 id="min-date">
  .<span style="color:#66B2FF">date</span>(<span style="color:#66B2FF">type</span>?: <span style="color:#99CC99">DateTypes</span>).<span style="color:#FFFFC0">min</span>(<span style="color:#66B2FF">dateToCompare</span>: <span style="color:#99CC99">Date</span>)
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().date().min(new Date(2020-05-05))

const validateA = schema.validate(new Date(2020-05-05))
const validateB = schema.validate(new Date(2020-05-04))

console.log(validateA) // true
console.log(validateB) // false
```

<h2 id="max-date">
  .<span style="color:#66B2FF">date</span>(<span style="color:#66B2FF">type</span>?: <span style="color:#99CC99">DateTypes</span>).<span style="color:#FFFFC0">max</span>(<span style="color:#66B2FF">dateToCompare</span>: <span style="color:#99CC99">Date</span>)
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().date().max(new Date(2020-05-05))

const validateA = schema.validate(new Date(2020-05-05))
const validateB = schema.validate(new Date(2020-05-06))

console.log(validateA) // true
console.log(validateB) // false
```

<h2 id="equal">
  .<span style="color:#66B2FF">equal</span>(<span style="color:#66B2FF">valueToCompare</span>: <span style="color:#99CC99">any</span>)
</h2>

> The equal method accepts any type of data structure to be compared.

```ts
import { schema } from "vkrun"

const schema = schema().equal({
  keyA: "any value",
  keyB: false,
  keyC: [1, 2, 3]
})

const validateA = schema.validate({
  keyA: "any value",
  keyB: false,
  keyC: [1, 2, 3]
})

const validateB = schema.validate({
  keyA: "any value",
  keyB: false,
  keyC: [1, 2, 4] // invalid array
})

console.log(validateA) // true
console.log(validateB) // false
```

<h2 id="notEqual">
  .<span style="color:#66B2FF">notEqual</span>(<span style="color:#66B2FF">valueToCompare</span>: <span style="color:#99CC99">any</span>)
</h2>

> The notEqual method accepts any type of data structure to be compared.

```ts
import { schema } from "vkrun"

const schema = schema().notEqual({
  keyA: "any value",
  keyB: false,
  keyC: [1, 2, 3]
})

const validateA = schema.validate({
  keyA: "any value",
  keyB: false,
  keyC: [1, 2, 4] // different array
})

const validateB = schema.validate({
  keyA: "any value",
  keyB: false,
  keyC: [1, 2, 3]
})

console.log(validateA) // true
console.log(validateB) // false
```

<h2 id="oneOf">
  .<span style="color:#66B2FF">oneOf</span>(<span style="color:#66B2FF">comparisonItems</span>: <span style="color:#99CC99">any[]</span>)
</h2>

> The oneOf method accepts any type of data structure to be compared.

```ts
import { schema } from "vkrun"

const comparisonItems = ['hello', 'world']
const schema = schema().oneOf(comparisonItems)

const validateA = schema.validate('hello')
const validateB = schema.validate('hi')

console.log(validateA) // true
console.log(validateB) // false
```

<h2 id="notOneOf">
  .<span style="color:#66B2FF">notOneOf</span>(<span style="color:#66B2FF">comparisonItems</span>: <span style="color:#99CC99">any[]</span>)
</h2>

> The notOneOf method accepts any type of data structure to be compared.

```ts
import { schema } from "vkrun"

const comparisonItems = ['hello', 'world']
const schema = schema().notOneOf(comparisonItems)

const validateA = schema.validate('hi')
const validateB = schema.validate('hello')

console.log(validateA) // true
console.log(validateB) // false
```

<h2 id="object">
  .<span style="color:#66B2FF">object</span>(<span style="color:#66B2FF">schema</span>: <span style="color:#99CC99">ObjectType</span>)
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().object({
  id: schema().string().UUID(),
  fullName: schema().string().minWord(2),
  description: schema().string().notRequired()
})

const validateA = schema.validate({
  id: "3ef7c105-c4ea-444d-bf47-e2e1a49ea613",
  fullName: "Full Name"
})

const validateB = schema.validate({
  id: "3ef7c105-c4ea-444d-bf47-e2e1a49ea613",
  description: "Description"
})

console.log(validateA) // true
console.log(validateB) // false
```

<h2 id="alias">
  .<span style="color:#66B2FF">alias</span>(<span style="color:#66B2FF">valueName</span>: <span style="color:#99CC99">string</span>)
</h2>

<p>When creating an object-type schema, each key receives the valueName as the key name. When it's necessary to change the valueName, we use the alias method.</p>

```ts
import { schema } from "vkrun"

const schema = schema().object({
  id: schema().string().UUID(), // valueName is id
  fullName: schema().alias("full name").string().minWord(2), // alias changes valueName from "fullName" to "full name"
  description: schema().string().notRequired() // valueName is description
})

const validatedSchema = schema.test({
  id: 123,
  fullName: true,
  description: undefined
}, 'object_name')
```

<p>output validatedSchema:</p>

```ts
{
  passedAll: false,
  passed: 5,
  failed: 4,
  totalTests: 9,
  successes: [
    {
      method: "required",
      name: "object_name",
      expect: "value other than undefined",
      received: {
        id: 123,
        fullName: true
      }
    },
    {
      method: "object",
      name: "object_name",
      expect: "object type",
      received: {
        id: 123,
        fullName: true
      }
    },
    {
      method: "required",
      name: "id",
      expect: "value other than undefined",
      received: 123
    },
    {
      method: "required",
      name: "full name", // new valueName
      expect: "value other than undefined",
      received: true
    },
    {
      method: "notRequired",
      name: "description",
      expect: "value is not required and of any type",
      received: "undefined"
    }
  ],
  errors: [
    {
      method: "string",
      type: "invalid value",
      name: "id",
      expect: "string type",
      received: 123,
      message: "id must be a string type!"
    },
    {
      method: "UUID",
      type: "invalid value",
      name: "id",
      expect: "format UUID",
      received: 123,
      message: "id must be a UUID type!"
    },
    {
      method: "string",
      type: "invalid value",
      name: "full name", // new valueName
      expect: "string type",
      received: true,
      message: "full name must be a string type!" // new valueName in massage
    },
    {
      method: "minWord",
      type: "invalid value",
      name: "full name", // new valueName
      expect: "minimum of words",
      received: true,
      message: "full name must have at least 2 words!" // new valueName in massage
    }
  ],
  time: "0s 1ms"
}
```

<h2 id="array">
  .<span style="color:#66B2FF">array</span>()
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().array()

const validateA = schema.validate([])
const validateB = schema.validate({})

console.log(validateA) // true
console.log(validateB) // false
```

<h2 id="string-array">
  .<span style="color:#66B2FF">array</span>().<span style="color:#FFFFC0">string</span>()
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().array().string()

const validateA = schema.validate(["any text", "any text"])
const validateB = schema.validate(["any text", false])

console.log(validateA) // true
console.log(validateB) // false
```

<h2 id="minLength-array">
  .<span style="color:#66B2FF">array</span>().<span style="color:#FFFFC0">string</span>().<span style="color:#FFFFC0">minLength</span>(<span style="color:#66B2FF">limit</span>: <span style="color:#99CC99">number</span>)
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().array().string().minLength(5)

const validateA = schema.validate(["12345", "12345"])
const validateB = schema.validate(["12345", "1234"])

console.log(validateA) // true
console.log(validateB) // false
```

<h2 id="maxLength-array">
  .<span style="color:#66B2FF">array</span>().<span style="color:#FFFFC0">string</span>().<span style="color:#FFFFC0">maxLength</span>(<span style="color:#66B2FF">limit</span>: <span style="color:#99CC99">number</span>)
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().string().string().maxLength(5)

const validateA = schema.validate(["12345", "12345"])
const validateB = schema.validate(["12345", "123456"])

console.log(validateA) // true
console.log(validateB) // false
```

<h2 id="email-array">
  .<span style="color:#66B2FF">array</span>().<span style="color:#FFFFC0">string</span>().<span style="color:#FFFFC0">email</span>()
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().array().string().email()

const validateA = schema.validate(["any_email@mail.com"])
const validateB = schema.validate(["any_email@mail.com", "any_email@mail"])

console.log(validateA) // true
console.log(validateB) // false
```

<h2 id="UUID-array">
  .<span style="color:#66B2FF">array</span>().<span style="color:#FFFFC0">string</span>().<span style="color:#FFFFC0">UUID</span>()
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().array().string().UUID()

const validateA = schema.validate([
  "550e8400-e29b-41d4-a716-446655440000",
  "550e8400-e29b-41d4-a716-446655440000"
])
const validateB = schema.validate([
  "550e8400-e29b-41d4-a716-446655440000",
  "123"
])

console.log(validateA) // true
console.log(validateB) // false
```

<h2 id="minWord-array">
  .<span style="color:#66B2FF">array</span>().<span style="color:#FFFFC0">string</span>().<span style="color:#FFFFC0">minWord</span>(<span style="color:#66B2FF">limit</span>: <span style="color:#99CC99">number</span>)
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().array().string().minWord(2)

const validateA = schema.validate(["one two", "one two"])
const validateB = schema.validate(["one two", "one"])

console.log(validateA) // true
console.log(validateB) // false
```

<h2 id="time-array">
  .<span style="color:#66B2FF">array</span>().<span style="color:#FFFFC0">string</span>().<span style="color:#FFFFC0">time</span>(<span style="color:#66B2FF">type</span>: <span style="color:#99CC99">TimeTypes</span>)
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().array().string().time("HH:MMM")

const validateA = schema.validate(["20:04", "20:03"])
const validateB = schema.validate(["20:03", "20:1"])

console.log(validateA) // true
console.log(validateB) // false
```

<h2 id="number-array">
  .<span style="color:#66B2FF">array</span>().<span style="color:#FFFFC0">number</span>()
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().array().number()

const validateA = schema.validate([123, 123])
const validateB = schema.validate([123, "123"])

console.log(validateA) // true
console.log(validateB) // false
```

<h2 id="float-array">
  .<span style="color:#66B2FF">array</span>().<span style="color:#FFFFC0">number</span>().<span style="color:#FFFFC0">float</span>()
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().array().number().float()

const validateA = schema.validate([12.5, 123.5])
const validateB = schema.validate([12.5, 123])

console.log(validateA) // true
console.log(validateB) // false
```

<h2 id="integer-array">
  .<span style="color:#66B2FF">array</span>().<span style="color:#FFFFC0">number</span>().<span style="color:#FFFFC0">integer</span>()
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().array().number().integer()

const validateA = schema.validate([12, 123])
const validateB = schema.validate([12, 123.5])

console.log(validateA) // true
console.log(validateB) // false
```

<h2 id="number-min-array">
.<span style="color:#66B2FF">array</span>().<span style="color:#FFFFC0">number</span>().<span style="color:#FFFFC0">min</span>(<span style="color:#66B2FF">min</span>: <span style="color:#99CC99">number</span>)
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().array().number().min(1)

const validateA = schema.validate([1])
const validateB = schema.validate([0])

console.log(validateA) // true
console.log(validateB) // false
```

<h2 id="number-max-array">
.<span style="color:#66B2FF">array</span>().<span style="color:#FFFFC0">number</span>().<span style="color:#FFFFC0">max</span>(<span style="color:#66B2FF">max</span>: <span style="color:#99CC99">number</span>)
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().array().number().max(1)

const validateA = schema.validate([1])
const validateB = schema.validate([2])

console.log(validateA) // true
console.log(validateB) // false
```

<h2 id="positive-array">
.<span style="color:#66B2FF">array</span>().<span style="color:#FFFFC0">number</span>().<span style="color:#FFFFC0">positive</span>()
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().array().number().positive()

const validateA = schema.validate([1])
const validateB = schema.validate([0])
const validateC = schema.validate([-1])

console.log(validateA) // true
console.log(validateB) // false
console.log(validateC) // false
```

<h2 id="negative-array">
.<span style="color:#66B2FF">array</span>().<span style="color:#FFFFC0">number</span>().<span style="color:#FFFFC0">negative</span>()
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().array().number().negative()

const validateA = schema.validate([-1])
const validateB = schema.validate([0])
const validateC = schema.validate([1])

console.log(validateA) // true
console.log(validateB) // false
console.log(validateC) // false
```











<h2 id="big-int-array">
  .<span style="color:#66B2FF">array</span>().<span style="color:#FFFFC0">bigInt</span>()
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().array().bigInt()

const validateA = schema.validate([123n, 123n])
const validateB = schema.validate([123n, "123n"])

console.log(validateA) // true
console.log(validateB) // false
```

<h2 id="big-int-min-array">
.<span style="color:#66B2FF">array</span>().<span style="color:#FFFFC0">bigInt</span>().<span style="color:#FFFFC0">min</span>(<span style="color:#66B2FF">min</span>: <span style="color:#99CC99">bigint</span>)
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().array().bigInt().min(1n)

const validateA = schema.validate([1n])
const validateB = schema.validate([0n])

console.log(validateA) // true
console.log(validateB) // false
```

<h2 id="big-int-max-array">
.<span style="color:#66B2FF">array</span>().<span style="color:#FFFFC0">bigInt</span>().<span style="color:#FFFFC0">max</span>(<span style="color:#66B2FF">max</span>: <span style="color:#99CC99">bigint</span>)
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().array().bigInt().max(1n)

const validateA = schema.validate([1n])
const validateB = schema.validate([2n])

console.log(validateA) // true
console.log(validateB) // false
```

<h2 id="big-int-positive-array">
.<span style="color:#66B2FF">array</span>().<span style="color:#FFFFC0">bigInt</span>().<span style="color:#FFFFC0">positive</span>()
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().array().bigInt().positive()

const validateA = schema.validate([1n])
const validateB = schema.validate([0n])
const validateC = schema.validate([-1n])

console.log(validateA) // true
console.log(validateB) // false
console.log(validateC) // false
```

<h2 id="big-int-negative-array">
.<span style="color:#66B2FF">array</span>().<span style="color:#FFFFC0">bigInt</span>().<span style="color:#FFFFC0">negative</span>()
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().array().bigInt().negative()

const validateA = schema.validate([-1n])
const validateB = schema.validate([0n])
const validateC = schema.validate([1n])

console.log(validateA) // true
console.log(validateB) // false
console.log(validateC) // false
```




















<h2 id="boolean-array">
  .<span style="color:#66B2FF">array</span>().<span style="color:#FFFFC0">boolean</span>()
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().array().boolean()

const validateA = schema.validate([true, false])
const validateB = schema.validate([true, "false"])

console.log(validateA) // true
console.log(validateB) // false
```

<h2 id="date-array">
  .<span style="color:#66B2FF">array</span>().<span style="color:#FFFFC0">date</span>(<span style="color:#66B2FF">type</span>?: <span style="color:#99CC99">DateTypes</span>)
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().array().date()

const validateA = schema.validate([new date(), new date()])
const validateB = schema.validate([new date(), true])

console.log(validateA) // true
console.log(validateB) // false
```

<h2 id="min-date-array">
  .<span style="color:#66B2FF">array</span>().<span style="color:#FFFFC0">date</span>(<span style="color:#66B2FF">type</span>?: <span style="color:#99CC99">DateTypes</span>).<span style="color:#FFFFC0">min</span>(<span style="color:#66B2FF">dateToCompare</span>: <span style="color:#99CC99">Date</span>)
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().array().date().min(new Date(2020-05-05))

const validateA = schema.validate([new Date(2020-05-05), new Date(2020-05-05)])
const validateB = schema.validate([new Date(2020-05-05), new Date(2020-05-04)])

console.log(validateA) // true
console.log(validateB) // false
```

<h2 id="max-date-array">
  .<span style="color:#66B2FF">array</span>().<span style="color:#FFFFC0">date</span>(<span style="color:#66B2FF">type</span>?: <span style="color:#99CC99">DateTypes</span>).<span style="color:#FFFFC0">max</span>(<span style="color:#66B2FF">dateToCompare</span>: <span style="color:#99CC99">Date</span>)
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().array().date().max(new Date(2020-05-05))

const validateA = schema.validate([new Date(2020-05-05), new Date(2020-05-05)])
const validateB = schema.validate([new Date(2020-05-05), new Date(2020-05-06)])

console.log(validateA) // true
console.log(validateB) // false
```

<h2 id="object-array">
  .<span style="color:#66B2FF">array</span>().<span style="color:#FFFFC0">object</span>(<span style="color:#66B2FF">schema</span>: <span style="color:#99CC99">ObjectType</span>)
</h2>

```ts
import { schema } from "vkrun"

const schema = schema().array().object({
  id: schema().string().UUID(),
  fullName: schema().string().minWord(2),
  description: schema().string().notRequired()
})

const validateA = schema.validate([
  {
    id: "3ef7c105-c4ea-444d-bf47-e2e1a49ea613",
    fullName: "Full Name",
    description: "Description"
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174001",
    fullName: "Full Name"
  }
])

const validateB = schema.validate([
  {
    id: "3ef7c105-c4ea-444d-bf47-e2e1a49ea613",
    fullName: "Full Name",
    description: "Description"
  },
  {
    id: "3ef7c105-c4ea-444d-bf47-e2e1a49ea613",
    description: "Description"
  }
])

console.log(validateA) // true
console.log(validateB) // false
```

<h2 id="example-projects">Example projects</h2>

If you are looking for practical examples of how to use our framework in different scenarios, just click the link below:

[Example Projects](https://github.com/vkrunjs/vkrun/tree/main/examples/schema)

Feel free to browse the different designs and try out what best suits your needs. If you have any questions or suggestions about the examples, do not hesitate to contact us by opening a new Issue.