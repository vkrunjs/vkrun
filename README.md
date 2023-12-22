# Validex

## Introduction

The Validex simplifies and enhances the validation of various data types in JavaScript/TypeScript projects. It provides a set of methods to validate boolean values, strings, emails, UUIDs, dates, times, object, array and others.

## Installation

> To install the Validex, use the following command:

##### NPM
```bash
npm install validex
```

##### YARN
```bash
yarn add validex
```


## Usage

> Importing the library.

```ts
import validex from "validex";
```

### Validating required method

```ts
const value = false
const validated = validex(value).required().validate()
console.log(validated) // true
```

```ts
const value = "any_text"
const validated = validex(value).required().validate()
console.log(validated) // true
```

```ts
const value = ""
const validated = validex(value).required().validate()
console.log(validated) // false
```

```ts
const value = 0
const validated = validex(value).required().validate()
console.log(validated) // true
```

```ts
const value = undefined
const validated = validex(value).required().validate()
console.log(validated) // false
```

```ts
const value = null
const validated = validex(value).required().validate()
console.log(validated) // false
```

```ts
try {
    const value = undefined
    const customError = new Error("any_error")
    validex(value).required(customError)
} catch (error) {
    console.log(error) // Error: any_error
}
```

```ts
try {
    const value = undefined
    const customError = new Error("any_error")
    validex(value, "value_name", "MISSING_PARAM").required(customError)
} catch (error) {
    console.log(error.message) // missing class param: valueName is required!
}
```

##### Multiples methods
```ts
const value = "Hello Worlds"
const validated = validex(value)
  .string()
  .required()
  .minWords(2)
  .validate()
console.log(validated) // false
```

```ts
const userSchema = createSchema({
  name: [string(), required(), minWords(2)],
  email: [string(), required(), email()],
  personalData: array({
    perfil: [string(), required()],
    website: [string(), required()],
  })
})

const user = userSchema.validate({
  name: 'Any Name',
  email: 'email@mail.com',
  personalData: [{
    perfil: 'developer',
    website: 'www.any.com'
  }]
})
console.log(user) // true
```

```ts
const userSchema = createSchema({
  name: [string(), required(), minWords(2)],
  email: [string(), required(), email()],
  personalData: array({
    perfil: [string(), required()],
    website: [string(), required()],
  })
}, { errorType: 'INVALID_PARAM' })

try {
  const user = userSchema.validate({
    name: 'Any Name',
    email: 'email@mail.com',
    personalData: [{
      perfil: '',
      website: 'www.any.com'
    }]
  })
} catch (error) {
  console.log(error.message) // invalid param: website is required!
}

console.log(user) // true
```

## License
> This library is released under the MIT License.