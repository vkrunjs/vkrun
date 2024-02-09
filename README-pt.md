<div align="center">
  <img src="logo.svg" width="200px" align="center" alt="Vkrun logo" />
  <h1 align="center">Vkrun</h1>
  <br/>
  <p align="center">
    O Vkrun é uma biblioteca de validação de dados em tempo de execução. 
  </p>

  <p align="center">
    Simplificando e aprimorando a validação de diversos tipos de dados em projetos JavaScript e TypeScript, também oferece a flexibilidade de definir esquemas validações complexas e interdependentes, proporcionando uma solução robusta, personalizável e escalável para suas necessidades de validação.
  </p>

</div>

<h3 align="center">Recursos</h3>

- Criação de schemas simples a complexos.
- Suporte a JavaScript e Typescript.
- Suporte a validação síncrona e assíncrona.
- Funciona no lado do servidor e do lado do cliente.

<hr/>

<p align="center">
  <a href="https://github.com/jukerah" rel="nofollow"><img src="https://img.shields.io/badge/criado%20por-Mario%20Elvio-blue.svg" alt="Criado por Mario Elvio"></a>
  <a href="https://opensource.org/licenses/MIT" rel="nofollow"><img src="https://img.shields.io/badge/License%20-MIT-blue.svg" alt="License MIT"></a>
  <a href="https://www.npmjs.com/package/vkrun" rel="nofollow"><img src="https://img.shields.io/npm/dw/vkrun.svg?color=blue
" alt="npm"></a>
  <a href="https://www.npmjs.com/package/vkrun" rel="nofollow"><img src="https://img.shields.io/github/stars/jukerah/vkrun" alt="stars"></a>
</p>

<h2 align="center">Idiomas do README</h2>

<p align="center">
  <a href="#" rel="nofollow"><img src="https://img.shields.io/badge/%F0%9F%87%A7%F0%9F%87%B7-Português-blue" alt="Criado por Mario Elvio"></a>
  <a href="https://github.com/jukerah/vkrun/blob/main/README.md" rel="nofollow"><img src="https://img.shields.io/badge/%F0%9F%87%BA%F0%9F%87%B8-Inglês-blue" alt="License MIT"></a>
</p>

<h2 align="center" id="installation">Instalação</h2>

##### NPM
```bash
npm install vkrun
```

##### YARN
```bash
yarn add vkrun
```

<h2 align="center">Utilizando o Vkrun</h2>

- import o vkrun.
- Encadeie métodos para construir um esquema.
- Após finalizar o schema, chame um método de validação com o valor de entrada:
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

### Conteúdo
- [Introdução](#introduction)
- [Instalação](#installation)
- schema
  - Tipos de validações
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
  - [.boolean](#boolean)
  - [.date](#date)
    - [.min](#min-date)
    - [.max](#max-date)
  - [.notRequired](#notRequired)
  - [.equal](#equal)
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
    - [.boolean](#boolean-array)
    - [.date](#date-array)
      - [.min](#min-date-array)
      - [.max](#max-date-array)
    - [.object](#object-array)
  - [.setLocation](#setLocation)
- [Autor](#author)
- [Licença](#license)

<h2 align="center">Tipos de validações</h2>
  
<h2 id="validate">
  .<span style="color:#66B2FF">validate</span>(<span style="color:#66B2FF">value</span>: <span style="color:#99CC99">any</span>): <span style="color:#99CC99">boolean</span>
</h2>

- value: É o valor a ser testado.
- Validação retorna boolean.

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

- value: É uma Promise do valor a ser testado.
- Validação retorna Promise<boolean>.

```ts
import { schema } from "vkrun"

const userSchema = schema().string().email()

const validatedSchema = await userSchema.validateAsync(getEmail())

console.log(validatedSchema) // true
```

<h2 id="test">
  .<span style="color:#66B2FF">test</span>(<span style="color:#66B2FF">value</span>: <span style="color:#99CC99">any</span>, <span style="color:#66B2FF">valueName</span>: <span style="color:#99CC99">string</span>): <span style="color:#99CC99">Tests</span>
</h2>

- value: É o valor a ser testado.
- valueName: É o nome do valor testado e será referenciado nos testes e mensagens de erro.

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

- value: É uma Promise do valor a ser testado.
- valueName: É o nome do valor testado e será referenciado nos testes e mensagens de erro.

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

- value: É o valor a ser testado.
- valueName: É o nome do valor testado e será referenciado nos testes e mensagens de erro.
- Quando a validação falhar será gerado um erro com a mensagem do primeiro teste falho.

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

- value: É uma Promise do valor a ser testado.
- valueName: É o nome do valor testado e será referenciado nos testes e mensagens de erro.
- Quando a validação falhar será gerado um erro com a mensagem do primeiro teste falho.

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

<p>Por padrão o vkrun tipa o valor como obrigatório, ou seja, o valor tem que ser diferente de undefined. Caso o valor não seja obrigatório e deve ser validado apenas se for fornecido um valor diferente de undefined, sendo assim devemos utilizar o método notRequired.</p>
  
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

<h2 id="setLocation">
  .<span style="color:#66B2FF">setLocation</span>()
</h2>

<p>O vkrun é permite alterar a mensagem de erro padrão de cada método.</p>

- É possível utilizar as palavras chaves para personalizar sua mensagem. Palavras chaves disponíveis:
  - string:
    - invalidValue: [value] e [valueName]
    - minWord: [value], [valueName] e [minWord]
    - uuid: [value] e [valueName]
    - email: [value] e [valueName]
    - time: [value], [valueName] e [type]
    - maxLength: [value], [valueName] e [maxLength],
    - minLength: [value], [valueName] e [minLength]
  - number:
    - invalidValue: [value] e [valueName]
    - float: [value] e [valueName]
    - integer: [value] e [valueName]
  - boolean:
    - invalidValue: [value] e [valueName]
  - required: [value] e [valueName]
  - date:
    - invalidValue: [value], [valueName] e [type]
    - min: [value], [valueName] e [refDate]
    - max: [value], [valueName]  e [refDate]
  - object: [valueName]
  - array: [valueName]

```ts
import { setLocation } from "vkrun"

// change a message
setLocation({
  string: {
    invalidValue: '[valueName] deve ser do tipo string!'
  }
})

// or change all messages
setLocation({
  string: {
    invalidValue: '[valueName] deve ser do tipo string!',
    minWord: '[valueName] deve ter pelo menos [minWord] palavras!',
    uuid: '[valueName] deve ser do tipo UUID!',
    email: 'o email [value] é inválido!',
    time: 'o horário [value] não está no formato [type]!',
    maxLength: '[valueName] deve ter no máximo [maxLength] caracteres!',
    minLength: '[valueName] deve ter no mínimo [minLength] caracteres!'
  },
  number: {
    invalidValue: '[valueName] deve ser do tipo numérico!',
    float: '[valueName] deve ser um número decimal!',
    integer: '[valueName] deve ser um número inteiro!'
  },
  boolean: {
    invalidValue: '[valueName] deve ser do tipo booleano!'
  },
  required: '[valueName] é obrigatório!',
  date: {
    invalidValue: 'a data [valueName] não está no formato [type]!',
    min: 'o [valueName] [value] deve ser maior ou igual a [refDate]!',
    max: 'o [valueName] [value] deve ser menor ou igual a [refDate]!'
  },
  object: 'o valor de [valueName] deve ser um objeto!',
  array: 'o valor de [valueName] deve ser um array!',
  equal: 'o valor não corresponde!'
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

<p>Ao criar um schema do tipo object, cada key recebe o valueName como nome da key. Quando necessário alterar o valueName utilizamos o método alias.</p>

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

<h2 align="center" id="author">Autor</h2>

<p align="center">
  <a href="https://marioelvio.com" target="_blank">
  <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/81795443?v=4" width="100px;" alt=""/>
  </a>
</p>
<p align="center">
  <a href="https://marioelvio.com" title="Mario Elvio" target="_blank">Mario Elvio</a>
</p>
<p align="center">
  <a href="https://github.com/jukerah" target="_blank"><img src="https://img.shields.io/badge/GitHub-blue?style=for-the-badge&logo=github&logoColor=white" target="_blank"></a>
  <a href = "mailto:juka.mebaj@gmail.com"><img src="https://img.shields.io/badge/Gmail-blue?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
  <a href="https://www.linkedin.com/in/marioelvio" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-blue?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>
  <a href="https://api.whatsapp.com/send?phone=5516988658468" target="_blank"><img src="https://img.shields.io/badge/WhatsApp-blue?style=for-the-badge&logo=whatsapp&logoColor=white" target="_blank"></a> 
</p>

<h2 align="center" id="license">Licença</h2>

## Licença
> Está biblioteca é lançada sob a licença MIT.