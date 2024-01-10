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
- [Schema](#schema)
  - Array
  - Object
  - String
  - MinWord
  - Email
  - Uuid
  - MaxLength
  - MinLength
  - Number
  - Float
  - Integer
  - Boolean
  - Date
  - DateGreaterThan
  - DateLessThan
- [Validação Encadeada](#chained-validation)
  - [Required](#required)
  - String
  - MinWord
  - Email
  - Uuid
  - MaxLength
  - MinLength
  - Number
  - Float
  - Integer
  - Boolean
  - Date
  - DateGreaterThan
  - DateLessThan
- [Alterar idioma das mensagens de erro](#location)
- [Autor](#author)
- [Licença](#clicense)

<h3 align="center" id="introduction">Introdução</h3>

> Vkrun é uma biblioteca TypeScript para simplificar a validação de diversos tipos de dados. Destaca-se pela flexibilidade na criação de schemas personalizados para objects complexos e interdependentes.

<h3 align="center"  id="installation">Instalação</h3>

##### NPM
```bash
npm install vkrun
```

##### YARN
```bash
yarn add vkrun
```

## Utilizando o vkrun

<h3 align="center"  id="schema">Schema</h3>

#### Validação utilizando schema:

- O método __createSchema()__ deve receber o método __array.required().object(anyObject)__ ou o método __object(anyObject).required()__ como primeiro parâmetro. Ambos os métodos são obrigatórios chamar o método __required()__ ou __notRequired()__.Dentro deste objeto, você pode criar qualquer estrutura de dados que respeite a semântica do JavaScript e a estrutura de dados do schema.

- Ao definir um schema de validação, coloque os métodos de validações dentro de colchetes __[ ]__, exceto quando estiver usando o método __array__ e __object__.

- O método __array()__ é flexível e pode receber qualquer tipo de dado, como __object__, __string__, __boolean__, __date__, __null__ e __undefined__. Todos os métodos dentro de colchetes __[ ]__ por padrão irão herdar o método __required()__, sendo possível alterar para __notRequired()__.

- Após montar o schema, é necessário chamar o método __validate()__ que receberá um valor com a tipagem do schema. Ao finalizar todos os testes o método validate retornará um objeto com informações sobre todos os testes realizados:

  - __passedAll__: boolean informando se passou em todos os testes.
  - __passed__: contagem de testes que passaram no teste.
  - __failed__: contagem de testes que falharam no teste.
  - __totalTests__: contagem total de testes executados.
  - __successes__: array com dados dos testes que passaram.
  - __errors__: array com dados dos testes que falharam.

```ts
import { createSchema, array, string, uuid, notRequired } from "vkrun"

// Criar um schema array de objects obrigatório
const productListSchema = createSchema(array.required().object({
  id: [string(), uuid()],
  name: [string()],
  description: [string(), notRequired()]
}))

/*
  Exemplo da tipagem:

  Array<{
    id: string;
    name: string;
    description: string | undefined
  }>
*/

// Validar os dados em conformidade com o schema
const validated = await productListSchema.validate([{
  id: '3ef7c105-c4ea-444d-bf47-e2e1a49ea613',
  name: 'Product Name',
  description: 'Product description example.'
}])
```

resultado do validated:

```json
{
  "passedAll": true,
  "passed": 8,
  "failed": 0,
  "totalTests": 8,
  "successes": [
    {
      "class": "create schema",
      "method": "required",
      "name": "validate schema",
      "expect": "array of objects",
      "received": [
        {
          "id": "3ef7c105-c4ea-444d-bf47-e2e1a49ea613",
          "name": "Product Name",
          "description": "Product description example."
        }
      ]
    },
    {
      "method": "required",
      "name": "id",
      "expect": "value other than undefined, null or empty string",
      "received": "3ef7c105-c4ea-444d-bf47-e2e1a49ea613"
    },
    {
      "method": "string",
      "name": "id",
      "expect": "string type",
      "received": "3ef7c105-c4ea-444d-bf47-e2e1a49ea613"
    },
    {
      "method": "uuid",
      "name": "id",
      "expect": "uuid format",
      "received": "3ef7c105-c4ea-444d-bf47-e2e1a49ea613"
    },
    {
      "method": "required",
      "name": "name",
      "expect": "value other than undefined, null or empty string",
      "received": "Product Name"
    },
    {
      "method": "string",
      "name": "name",
      "expect": "string type",
      "received": "Product Name"
    },
    {
      "method": "notRequired",
      "name": "description",
      "expect": "value is not required and of any type",
      "received": "Product description example."
    },
    {
      "method": "string",
      "name": "description",
      "expect": "string type",
      "received": "Product description example."
    }
  ],
  "errors": [],
  "time": "0s 1ms"
}
```

- Exemplo de validação assíncrona:

```ts
import { createSchema, object, string, uuid, notRequired } from "vkrun"

// Criar um schema de object não obrigatório
const productListSchema = createSchema(object({
  id: [string(), uuid()],
  name: [string()],
  description: [string(), notRequired()]
 }).notRequired())

// Simular uma Promise
const productListPromise = async (): Promise<object> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: '3ef7c105-c4ea-444d-bf47-e2e1a49ea613',
        name: false,
        description: 'Product description example.'
      })
    }, 2000)
  })
}

const validated = await productListSchema.validate(await productListPromise())
```

resultado do validated:

```json
{
  "passedAll": false,
  "passed": 7,
  "failed": 1,
  "totalTests": 8,
  "successes": [
    {
      "class": "create schema",
      "method": "notRequired",
      "name": "validate schema",
      "expect": "value is not required and of type object",
      "received": {
        "id": "3ef7c105-c4ea-444d-bf47-e2e1a49ea613",
        "name": false,
        "description": "Product description example."
      }
    },
    {
      "method": "required",
      "name": "id",
      "expect": "value other than undefined, null or empty string",
      "received": "3ef7c105-c4ea-444d-bf47-e2e1a49ea613"
    },
    {
      "method": "required",
      "name": "name",
      "expect": "value other than undefined, null or empty string",
      "received": false
    },
    {
      "method": "notRequired",
      "name": "description",
      "expect": "value is not required and of any type",
      "received": "Product description example."
    },
    {
      "method": "string",
      "name": "description",
      "expect": "string type",
      "received": "Product description example."
    },
    {
      "method": "string",
      "name": "id",
      "expect": "string type",
      "received": "3ef7c105-c4ea-444d-bf47-e2e1a49ea613"
    },
    {
      "method": "uuid",
      "name": "id",
      "expect": "uuid format",
      "received": "3ef7c105-c4ea-444d-bf47-e2e1a49ea613"
    }
  ],
  "errors": [
    {
      "method": "string",
      "type": "invalid value",
      "name": "name",
      "expect": "string type",
      "received": false,
      "message": "name must be a string type!"
    }
  ],
  "time": "0s 2ms"
}
```

#### Object com manipulação de erros:

> O schema aceita receber dois parâmetros, o primeiro é a estrutura de dados com  os métodos de validação e o segundo é um objeto com parâmetros de configurações. Dessa forma, torna-se possível capturar o tipo específico do erro injetado durante a execução do código.

- Existem duas formas do schema forçar um erro na aplicação, injetando uma classe que estende de Erro ou passar o valor true, exemplo:
  - { error: MissingParamError }
  - { error: true }
- Toda validação cujo retorno esperado seja um erro é obrigatório que a chamada do método validate esteja dentro de uma estrutura try-catch.
- Observações: Não é recomendado forçar erros na aplicação para validação de dados, recomendamos utilizar os exemplos anteriores e tratar isoladamente cada falha do teste. 

#### Exemplo de classe que estende Error:

```ts
  class MissingParamError extends Error {
    constructor (message: string) {
      super(`missing param: ${message}`)
      this.name = 'MissingParamError'
    }
  }
```

#### Exemplo de uso do schema com geração de erro:

```ts
import { createSchema, array, string, uuid, notRequired } from "vkrun"

// Criar um schema com injeção da classe de Erro
const productListSchema = createSchema(array.required().object({
  id: [string(), uuid()],
  name: [string()],
  description: [string(), notRequired()]
}), { error: MissingParamError })

try {
  // Validar os dados em conformidade com o schema
  await productListSchema.validate([
    {
      id: '3ef7c105-c4ea-444d-bf47-e2e1a49ea613',
      name: 'Nome do Produto A',
      description: 'Exemplo de descrição do produto A.',
    },
    {
      id: 'a61aec6b-1ec3-4859-aa19-4181e95200a6',
      description: 'Exemplo de descrição do produto B.',
    },
  ])
  
} catch (error) {
  // Capturar e tratar o tipo específico do erro injetado
  if (error instanceof MissingParamError) {
    console.log(error.message) // missing param: name is required!
    /* tratativa de erro */
  }
}
```

<h3 align="center"  id="chained-validation">Validação encadeada</h3>

> Ao chamar a função vkrun será necessário fornecer:

- O valor e nome do atributo a ser testado deverá ser passado como parâmetro para a função __vkrun()__.
- Os métodos para teste devem ser chamados de forma encadeada (sequência).
- após fornecer todos os métodos de validações, deverá chamar o método __validate()__ para realizar os testes. Ao finalizar todos os testes o método validate retornará um objeto com informações sobre todos os testes realizados:

  - __passedAll__: boolean informando se passou em todos os testes.
  - __passed__: contagem de testes que passaram no teste.
  - __failed__: contagem de testes que falharam no teste.
  - __totalTests__: contagem total de testes executados.
  - __successes__: array com dados dos testes que passaram.
  - __errors__: array com dados dos testes que falharam.

- Exemplo de validação encadeada:

```ts
import vkrun from "vkrun";

const fullName = "Mario Elvio"
const email = "email@email"

const validateFullName = vkrun(email).string().email().validate()
const validateEmail = vkrun(fullName).string().minWord(2).validate()

console.log(validateFullName) // { passedAll: true, ... }
console.log(validateEmail) // { passedAll: false, ... }
```

- Exemplo de como não utilizar a validação encadeada:

```ts
import vkrun from "vkrun";

const email = 'email@email.com'

const testA = vkrun(email).email().validate() // return true
console.log(testA) // { passedAll: true, ... }

// O método validate() já foi chamado acima e seu retorno foi finalizado
const testB = testA.string().validate() 
console.log(testB) // testA.string is not a function
```

<h3 align="center"  id="chained-validation">Validação encadeada com manipulação de erros</h3>

#### Validação encadeada com manipulação de erros:

> Ao chamar a função vkrun cujo retorno esperado seja um erro, é necessário fornecer:

- O valor e nome do atributo a ser testado deverá ser passado como parâmetro para o método __vkrun()__.
- Os métodos para teste devem ser chamados de forma encadeada (sequência).
- após fornecer todos os métodos de validações, deverá chamar o método __throw()__ para realizar os testes. Se o valor fornecido passar em todos os testes, o método __validate()__ retornará __true__, caso contrário, irá gerar um erro. É opcional fornecer uma classe que estende de Erro, essa classe deverá ser passada como parâmetro ao método __throw()__.
  - .throw()
  - .throw(ClassExtendsError)
- Toda validação cujo retorno esperado seja um erro é obrigatório que a chamada do método validate esteja dentro de uma estrutura try-catch.

- Exemplo de classe que estende Error:

```ts
export class InvalidParamError extends Error {
  constructor (message: string) {
    super(`invalid param: ${message}`)
    this.name = 'InvalidParamError'
  }
}
```

```ts
import vkrun from "vkrun";

const uuid = 'any_value'

try {
  // A função vkrun é utilizada para validar um parâmetro, neste caso, um email.
  const validated = vkrun(uuid, 'field_name')
    .string()
    .uuid()
    .required()
    .throw(MissingParamError) // A classe MissingParamError é fornecida como a classe que estende Erro.
} catch (error) {
  // Capturar e tratar o tipo específico do erro injetado
  if (error instanceof InvalidParamError) {
    console.log(error.message) // invalid param: field_name must be a uuid type!
    /* tratativa de erro */
  }
}
```

<h3 align="center"  id="location">setTranslationMessage</h3>

### Traduções

> Se precisar de suporte em outro idioma, a função "setTranslationMessage" pode ser usada para modificar as mensagens de erro, utilizando chaves e valores para realizar a tradução. Não é obrigatório alterar todas as mensagens, sendo possível modificar mensagens isoladas, desde que o caminho do objeto da mensagem seja fornecido corretamente e as chaves reservadas sejam respeitadas.

```ts
import { setTranslationMessage } from "vkrun"

const newInformativeMessage = {
    validator: {
      constructorParams: {
        valueName: {
          missingClassParam: 'missing class param: valueName is required!',
          invalidClassParam: 'invalid class param: class error provided is not valid!'
        }
      },
      method: {
        string: {
          strict: '[valueName] must be a string type!'
        },
        minWord: {
          noMinimumWords: '[valueName] must have at least [minWord] words!'
        },
        uuid: {
          strict: '[valueName] must be a uuid type!'
        },
        email: {
          strict: 'email [value] is invalid!'
        },
        maxLength: {
          strict: '[valueName] must have a maximum of [maxLength] characters!'
        },
        minLength: {
          strict: '[valueName] must have a minimum of [minLength] characters!'
        },
        number: {
          strict: '[valueName] must be a number type!'
        },
        float: {
          strict: '[valueName] must be a number and float!'
        },
        integer: {
          strict: '[valueName] must be a number and integer!'
        },
        boolean: {
          strict: '[valueName] must be a boolean type!'
        },
        required: {
          strict: '[valueName] is required!'
        },
        date: {
          invalidFormat: 'the date [valueName] is not in the format [type]!'
        },
        dateGreaterThan: {
          invalidDate: 'the provided date is invalid!',
          limitExceeded: 'the date [valueName] must be greater than the reference date!'
        },
        dateLessThan: {
          invalidDate: 'the provided date is invalid!',
          limitExceeded: 'the date [valueName] must be less than the reference date!'
        },
        time: {
          invalidParameter: 'time method received invalid parameter: type is required!',
          invalidFormat: 'the time [value] is not in the format [type]'
        }
      }
    },
    schema: {
      constructorParams: {
        schema: 'the schema must be an object, object method, or array of objects method!'
      },
      validateProperty: {
        itemArray: {
          valueName: 'all values in the [keyName]'
        }
      },
      validateObject: {
        schemaKeyAbsent: '[keyName] key is required!',
        notIsArray: '[keyName] value must be an array!',
        notIsObject: '[valueName] value must be an object!'
      }
    }
  }

  setTranslationMessage(newInformativeMessage)
```

<h3 align="center"  id="required">Required</h3>

#### Validação com retorno boleano:

```ts
import vkrun from "vkrun"

const value = false
const validated = vkrun(value).required().validate()
console.log(validated) // // { passedAll: true, ... }
```

```ts
import vkrun from "vkrun"

const value = "any_text"
const validated = vkrun(value).required().validate()
console.log(validated) // // { passedAll: true, ... }
```

```ts
import vkrun from "vkrun"

const value = ""
const validated = vkrun(value).required().validate()
console.log(validated) // // { passedAll: false, ... }
```

```ts
import vkrun from "vkrun"

const value = 0
const validated = vkrun(value).required().validate()
console.log(validated) // // { passedAll: true, ... }
```

```ts
import vkrun from "vkrun"

const value = undefined
const validated = vkrun(value).required().validate()
console.log(validated) // // { passedAll: false, ... }
```

```ts
import vkrun from "vkrun"

const value = null
const validated = vkrun(value).required().validate()
console.log(validated) // // { passedAll: false, ... }
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
    vkrun(value, "value_name").throw(InvalidParamError)
} catch (error) {
  if (error instanceof InvalidParamError) {
    console.log(error.message) // invalid param: value_name is required!
  }
}
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