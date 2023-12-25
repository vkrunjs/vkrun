# Vkrun

## Language

<p><a href="./README-pt.md">Portuguese</a> | <span style="font-weight: bold;">English</span></p>

## Introduction

> Vkrun is a runtime data validation library. Simplifying and enhancing the validation of various data types in JavaScript and TypeScript projects, Vkrun offers the flexibility to define schemas for objects and allows modeling complex and interdependent validations, providing a robust and customizable solution for your validation needs. Below are some of the validation types supported by Vkrun:

- [object](#object)
- array
- string
- number
- boolean
- date
- [required](#required)
- email
- uuid
- maxLength
- minLength
- float
- integer
- dateGreaterThan
- dateLessThan

## Installation

> To install the Vkrun, use the following command:

##### NPM
```bash
npm install vkrun
```

##### YARN
```bash
yarn add vkrun
```


## Using Vkrun

### Object

#### Object validation using Schema:

> By default, all types except the array method are configured as required values, meaning the value must be different from undefined, null, and an empty string. If the value is not required, the notRequired method should be used.


```ts
import { createSchema, array, string, uuid, notRequired} from "vkrun"

const productListSchema = createSchema({
  productList: array({
    id: [string(), uuid()],
    name: [string()],
    description: [string(), notRequired()]
  })
})

const product = productListSchema.validate({
  productList: [{
    id: '3ef7c105-c4ea-444d-bf47-e2e1a49ea613',
    name: 'Product Name',
    description: 'Product description example.'
  }]
})
console.log(product) // true
```

#### Object with error handling::

```ts
import { createSchema, array, string, uuid, notRequired} from "vkrun"

class MissingParamError extends Error {
  constructor (message: string) {
    super(`missing param: ${message}`)
    this.name = 'MissingParamError'
  }
}

const productListSchema = createSchema({
  productList: array({
    id: [string(), uuid()],
    name: [string()],
    description: [string(), notRequired()]
  })
}, { errorType: MissingParamError }) // injected error class

try {
  const product = productListSchema.validate({
    productList: [{
      id: 'a61aec6b-1ec3-4859-aa19-4181e95200a6',
      description: 'Product description example.'
    }]
  })
} catch (error) {
  if (error instanceof MissingParamError) {
    console.log(error.message) // missing param: name key is required!
  }
}
```

> By default, all types except the array method are configured as mandatory values, meaning the value must be different from undefined. If the value is not mandatory, the notRequired method should be used.

#### Chained validation with Boolean return:
> When calling the vkrun function, whose expected return is boolean, it is necessary to provide:
- value
- methods for testing

```ts
import vkrun from "vkrun";

const email = "email@email.com"

const validated = vkrun(email)
  .string()
  .required()
  .email()
  .validate()

console.log(validated) // true
```

- For any chained validation where the desired return is boolean, the validate method must be called at the end.

#### Chained validation with Error handling:
> When calling the vkrun function, whose expected return is an error, it is necessary to provide:
- value
- parameter name
- class that extends Error
- testing methods

```ts
import vkrun from "vkrun";

export class InvalidParamError extends Error {
  constructor (message: string) {
    super(`invalid param: ${message}`)
    this.name = 'InvalidParamError'
  }
}

const fullName = "Mario"

try {
  const validated = vkrun(fullName, 'fullName', MissingParamError)
    .string()
    .required()
    .minWord(2)
} catch (error) {
  if (error instanceof InvalidParamError) {
    console.log(error.message) // invalid param: fullName key is required!
  }
}
```

- For any chained validation where an error needs to be captured, the call to the vkrun function should be within a try-catch structure. Another important point is that it is not necessary to call the validate method at the end.

### Required

#### Validation with boolean return:

```ts
import vkrun from "vkrun"

const value = false
const validated = vkrun(value).required().validate()
console.log(validated) // true
```

```ts
import vkrun from "vkrun"

const value = "any_text"
const validated = vkrun(value).required().validate()
console.log(validated) // true
```

```ts
import vkrun from "vkrun"

const value = ""
const validated = vkrun(value).required().validate()
console.log(validated) // false
```

```ts
import vkrun from "vkrun"

const value = 0
const validated = vkrun(value).required().validate()
console.log(validated) // true
```

```ts
import vkrun from "vkrun"

const value = undefined
const validated = vkrun(value).required().validate()
console.log(validated) // false
```

```ts
import vkrun from "vkrun"

const value = null
const validated = vkrun(value).required().validate()
console.log(validated) // false
```

#### Validation with error handling:

```ts
import vkrun from "vkrun"

export class InvalidParamError extends Error {
  constructor (message: string) {
    super(`invalid param: ${message}`)
    this.name = 'InvalidParamError'
  }
}

try {
    const value = undefined
    vkrun(value, "value_name", InvalidParamError).required()
} catch (error) {
  if (error instanceof InvalidParamError) {
    console.log(error.message) // invalid param: value_name is required!
  }
}
```

## License
> This library is released under the MIT license.