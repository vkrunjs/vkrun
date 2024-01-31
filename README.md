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
  - alias
  - equal
  - object
  - array
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
- [setLocation](#setLocation)
- [Autor](#author)
- [Licença](#clicense)

<h3 align="center" id="introduction">Introdução</h3>

> Vkrun é uma biblioteca TypeScript para simplificar a validação de diversos tipos de dados. Destaca-se pela flexibilidade na criação de schemas personalizados e interdependentes.

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

<h3 align="center"  id="schema">Vkrun</h3>

```ts
import vkrun from "vkrun"

// Criar um schema array de objects obrigatório
const userSchema = vkrun().array().object({
  id: vkrun().string().uuid(),
  name: vkrun().string(),
  description: vkrun().string().notRequired()
})

// Validar os dados em conformidade com o schema
const validatedUser = await userSchema.validate([
  {
    id: '3ef7c105-c4ea-444d-bf47-e2e1a49ea613',
    name: 'Product Name',
    description: 'Product description example.'
  },
  {
    id: '3ef7c105-c4ea-444d-bf47-e2e1a49ea613',
    name: 'Product Name'
  }
])

console.log(validatedUser) // true
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