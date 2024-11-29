<div align="center">
  <img src="logo.svg" width="200px" align="center" alt="Vkrun logo" />
  <h1 align="center">Vkrun</h1>
  <br/>
  <p align="center">
    Vkrun is a Node.js framework for building server-side applications. 
  </p>

  <a href="https://github.com/jukerah" rel="nofollow"><img src="https://img.shields.io/badge/created%20by-Mario%20Elvio-blue.svg" alt="Created by Mario Elvio"></a>
  [<img src="https://img.shields.io/badge/License%20-MIT-blue.svg">](LICENSE)
  <a href="https://www.npmjs.com/package/vkrun" rel="nofollow"><img src="https://img.shields.io/npm/dw/vkrun.svg?color=blue" alt="npm"></a>
  <a href="https://www.npmjs.com/package/vkrun" rel="nofollow"><img src="https://img.shields.io/github/stars/vkrunjs/vkrun" alt="stars"></a>
</div>

> Simplyfing the development of applications with support for JavaScript and TypeScript. Vkrun also provides a robust, opinion-free, and scalable solution for your needs.

VkrunJs documentation, visit [vkrunjs.com](https://vkrunjs.com/)

### Content

- [Installation](#installation)
- [Router](https://vkrunjs.com/router/introduction)
- [Schema](https://vkrunjs.com/schema/introduction)
- [Super Request](./src/modules/super-request/Readme.md)
- [Rate Limit](./src/modules/rate-limit/Readme.md)
- [Parse Data](https://vkrunjs.com/parse-data/introduction)
- [Upload](./src/modules/upload/Readme.md)
- [Mime](./src/modules/mime/Readme.md)
- [ServerStaticFile](./src/modules/serve-static-file/Readme.md)
- [Logger](./src/modules/logger/Readme.md)
- [JWT](https://vkrunjs.com/jwt/introduction)
- [SwaggerBuilder](./src/modules/swagger-builder/Readme.md)
- [Cors](./src/modules/cors/Readme.md)
- [License](#license)

<hr/>

### Installation:

#### NPM

```bash
npm install vkrun
```

#### YARN

```bash
yarn add vkrun
```

<hr/>

### Quick Start

```ts
import v from 'vkrun'

const app = v.App()

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain')
  res.status(200).end('Hello World!')
})

app.server().listen(3000, () => {
  console.log('Vkrun started on port 3000')
})
```