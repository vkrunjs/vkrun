# Vkrun

## Idioma
<p><span style="font-weight: bold;">Português</span> | <a href="./README.md">Inglês</a></p>

## Introdução

> O Vkrun é uma biblioteca de validação de dados em tempo de execução. Simplificando e aprimorando a validação de diversos tipos de dados em projetos JavaScript e TypeScript, Vkrun oferece a flexibilidade de definir esquemas para objetos e permitindo a modelagem de validações complexas e interdependentes, proporcionando uma solução robusta e personalizável para suas necessidades de validação. Abaixo estão alguns dos tipos de validações suportados pelo Vkrun:

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

## Instalação

##### NPM
```bash
npm install vkrun
```

##### YARN
```bash
yarn add vkrun
```

## Utilizando o vkrun

### Object

#### Validação de objeto utilizando Schema:

> Por padrão todos os tipos exceto o método array vem configurado como valor obrigatório, ou seja o valor tem que ser diferente de undefined, null e string vazia. Caso o valor não seja obrigatório, deve se usar o método notRequired.

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

#### Object com manipulação de erros:

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
}, { errorType: MissingParamError }) // injetado classe de erro

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

> Por padrão todos os tipos exceto o método array vem configurado como valor obrigatório, ou seja o valor tem que ser diferente de undefined. Caso o valor não seja obrigatório, deve se usar o método notRequired.

#### Validação encadeada com retorno boleano:
> Ao chamar a função vkrun cujo retorno esperado seja booleano, é necessário fornecer:
- valor
- métodos para teste

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

- Toda validação encadeada que o retorno desejado seja boleano, deve se chamar o método validate ao final.

#### Validação encadeada com manipulação de erros:
> Ao chamar a função vkrun cujo retorno esperado seja um erro, é necessário fornecer:
- valor
- nome do parâmetro
- classe que estende de Erro
- métodos para teste

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

- Toda validação encadeada que deve ser capturado algum erro, a chamada da função vkrun deve estar dentro de uma estrutura try catch. Outro ponto importante é que náo necessário a chamada do método validate ao final.

### Required

#### Validação com retorno boleano:

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

#### Validação com manipulação de erros:

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

## Licença
> Está biblioteca é lançada sob a licença MIT.