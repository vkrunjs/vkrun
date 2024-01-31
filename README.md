<p align="center">
  <img src="logo.svg" width="200px" align="center" alt="Vkrun logo" />
  <h1 align="center">Vkrun</h1>
  <br/>
  <p align="center">
     Vkrun é uma biblioteca TypeScript para simplificar a validação de diversos tipos de dados
  </p>
</p>

<p align="center">
  <a href="https://github.com/jukerah" rel="nofollow"><img src="https://img.shields.io/badge/criado%20por-Mario%20Elvio-blue.svg" alt="Criado por Mario Elvio"></a>
  <a href="https://opensource.org/licenses/MIT" rel="nofollow"><img src="https://img.shields.io/badge/License%20-MIT-blue.svg" alt="License MIT"></a>
  <a href="https://www.npmjs.com/package/vkrun" rel="nofollow"><img src="https://img.shields.io/npm/dw/vkrun.svg?color=blue
" alt="npm"></a>
  <a href="https://www.npmjs.com/package/vkrun" rel="nofollow"><img src="https://img.shields.io/github/stars/jukerah/vkrun" alt="stars"></a>
</p>

<h3 align="center">Idiomas do README</h3>

<p align="center">
  <a href="#" rel="nofollow"><img src="https://img.shields.io/badge/%F0%9F%87%A7%F0%9F%87%B7-Português-blue" alt="Criado por Mario Elvio"></a>
  <a href="https://github.com/jukerah/vkrun/blob/main/README.md" rel="nofollow"><img src="https://img.shields.io/badge/%F0%9F%87%BA%F0%9F%87%B8-Inglês-blue" alt="License MIT"></a>
</p>

### Conteúdo
- [Introdução](#introduction)
- [Instalação](#installation)
- [Vkrun](#vkrun)
  - [string](#string)
    - [minWord](#minWord)
    - [email](#email)
    - [UUID](#UUID)
    - [maxLength](#maxLength)
    - [minLength](#minLength)
    - [time](#time)
  - [number](#number)
    - [float](#float)
    - [integer](#integer)
  - [boolean](#boolean)
  - [date](#date)
    - [min](#min-date)
    - [max](#max-date)
  - alias
  - [equal](#equal)
  - [object](#object)
  - [array](#array)
    - string
      - minWord
      - email
      - UUID
      - maxLength
      - minLength
      - time
    - number
      - float
      - integer
    - boolean
    - date
      - min
      - max
    - object
  - validate
  - validateAsync
  - test
  - testAsync
  - throw
  - throwAsync
- setLocation
- [Autor](#author)
- [Licença](#clicense)

<h3 align="center" id="introduction">Introdução</h3>

> Vkrun é uma biblioteca TypeScript para simplificar a validação de diversos tipos de dados. Destaca-se pela flexibilidade na criação de schemas personalizados e interdependentes.

<h3 align="center" id="installation">Instalação</h3>

##### NPM
```bash
npm install vkrun
```

##### YARN
```bash
yarn add vkrun
```

<h3 align="center" id="vkrun">Utilizando o Vkrun</h3>

```ts
import vkrun from "vkrun"

const userSchema = vkrun().object({
  id: vkrun().string().uuid(),
  fullName: vkrun().string(),
  description: vkrun().string().notRequired()
})

const validatedUser = userSchema.validate({
  id: '3ef7c105-c4ea-444d-bf47-e2e1a49ea613',
  fullName: 'Full Name'
})

console.log(validatedUser) // true
```

<h3 align="center" id="string">string</h3>

```ts
import vkrun from "vkrun"

const schema = vkrun().string()

const validateA = schema.validate('any text')
const validateB = schema.validate(false)

console.log(validateA) // true
console.log(validateB) // false
```

<h3 align="center" id="minLength">minLength</h3>

```ts
import vkrun from "vkrun"

const schema = vkrun().string().minLength(5)

const validateA = schema.validate('12345')
const validateB = schema.validate('1234')

console.log(validateA) // true
console.log(validateB) // false
```

<h3 align="center" id="maxLength">maxLength</h3>

```ts
import vkrun from "vkrun"

const schema = vkrun().string().maxLength(5)

const validateA = schema.validate('12345')
const validateB = schema.validate('123456')

console.log(validateA) // true
console.log(validateB) // false
```

<h3 align="center" id="email">email</h3>

```ts
import vkrun from "vkrun"

const schema = vkrun().string().email()

const validateA = schema.validate('any_email@mail.com')
const validateB = schema.validate('any_email@mail')

console.log(validateA) // true
console.log(validateB) // false
```

<h3 align="center" id="UUID">UUID</h3>

```ts
import vkrun from "vkrun"

const schema = vkrun().string().UUID()

const validateA = schema.validate('550e8400-e29b-41d4-a716-446655440000')
const validateB = schema.validate('123')

console.log(validateA) // true
console.log(validateB) // false
```

<h3 align="center" id="minWord">minWord</h3>

```ts
import vkrun from "vkrun"

const schema = vkrun().string().minWord(2)

const validateA = schema.validate('one two')
const validateB = schema.validate('one')

console.log(validateA) // true
console.log(validateB) // false
```

<h3 align="center" id="time">time</h3>

```ts
import vkrun from "vkrun"

const schema = vkrun().string().time('HH:MMM')

const validateA = schema.validate('20:03')
const validateB = schema.validate('20:1')

console.log(validateA) // true
console.log(validateB) // false
```

<h3 align="center" id="number">number</h3>

```ts
import vkrun from "vkrun"

const schema = vkrun().number()

const validateA = schema.validate(123)
const validateB = schema.validate('123')

console.log(validateA) // true
console.log(validateB) // false
```

<h3 align="center" id="float">float</h3>

```ts
import vkrun from "vkrun"

const schema = vkrun().number().float()

const validateA = schema.validate(123.5)
const validateB = schema.validate(123)

console.log(validateA) // true
console.log(validateB) // false
```

<h3 align="center" id="integer">integer</h3>

```ts
import vkrun from "vkrun"

const schema = vkrun().number().integer()

const validateA = schema.validate(123)
const validateB = schema.validate(123.5)

console.log(validateA) // true
console.log(validateB) // false
```

<h3 align="center" id="boolean">boolean</h3>

```ts
import vkrun from "vkrun"

const schema = vkrun().boolean()

const validateA = schema.validate(false)
const validateB = schema.validate('false')

console.log(validateA) // true
console.log(validateB) // false
```

<h3 align="center" id="date">date</h3>

```ts
import vkrun from "vkrun"

const schema = vkrun().date()

const validateA = schema.validate(new date())
const validateB = schema.validate(true)

console.log(validateA) // true
console.log(validateB) // false
```

<h3 align="center" id="min-date">min date</h3>

```ts
import vkrun from "vkrun"

const schema = vkrun().date().min(new Date(2020-05-05))

const validateA = schema.validate(new Date(2020-05-05))
const validateB = schema.validate(new Date(2020-05-04))

console.log(validateA) // true
console.log(validateB) // false
```

<h3 align="center" id="max-date">max date</h3>

```ts
import vkrun from "vkrun"

const schema = vkrun().date().max(new Date(2020-05-05))

const validateA = schema.validate(new Date(2020-05-05))
const validateB = schema.validate(new Date(2020-05-06))

console.log(validateA) // true
console.log(validateB) // false
```

<h3 align="center" id="equal">equal</h3>

```ts
import vkrun from "vkrun"

const schema = vkrun().equal({
  keyA: 'any value',
  keyB: false,
  keyC: [1, 2, 3]
})

const validateA = schema.validate({
  keyA: 'any value',
  keyB: false,
  keyC: [1, 2, 3]
})

const validateB = schema.validate({
  keyA: 'any value',
  keyB: false,
  keyC: [1, 2, 4] // invalid array
})

console.log(validateA) // true
console.log(validateB) // false
```

<h3 align="center" id="array">array</h3>

```ts
import vkrun from "vkrun"

const schema = vkrun().array()

const validateA = schema.validate([])
const validateB = schema.validate({})

console.log(validateA) // true
console.log(validateB) // false
```

<h3 align="center" id="object">object</h3>

```ts
import vkrun from "vkrun"

const schema = vkrun().object({
  id: vkrun().string().uuid(),
  fullName: vkrun().string().minWord(2),
  description: vkrun().string().notRequired()
})

const validateA = schema.validate({
  id: '3ef7c105-c4ea-444d-bf47-e2e1a49ea613',
  fullName: 'Full Name'
})

const validateB = schema.validate({
  id: '3ef7c105-c4ea-444d-bf47-e2e1a49ea613',
  description: 'Description'
})

const validateA = schema.validate([])
const validateB = schema.validate({})

console.log(validateA) // true
console.log(validateB) // false
```


<h3 align="center" id="author">Autor</h3>

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

<h3 align="license" id="author">Licença</h3>

## Licença
> Está biblioteca é lançada sob a licença MIT.