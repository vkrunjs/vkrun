<div align="center">
  <img src="logo.svg" width="200px" align="center" alt="Vkrun logo" />
  <h1 align="center">Vkrun</h1>
  <br/>
  <p align="center">
    Vkrun is a Node.js framework for building server-side applications. 
  </p>
</div>

> Simplyfing the development of applications with support for JavaScript and TypeScript. Vkrun also provides a robust, opinion-free, and scalable solution for your needs.

<h2 align="center">Quick Start</h2>

#### Installation command:
```bash
npm install vkrun
```

#### index.js:
```ts
import { App, Router } from 'vkrun'

const app = App()
const router = Router()

router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain')
  res.status(200).end('Hello World!')
})

app.use(router)

app.server().listen(3000, () => {
  console.log('Vkrun started on port 3000')
})
```

#### Running the project:

```bash
node index.js
```

<hr/>

<a href="https://github.com/jukerah" rel="nofollow"><img src="https://img.shields.io/badge/created%20by-Mario%20Elvio-blue.svg" alt="Created by Mario Elvio"></a>
[<img src="https://img.shields.io/badge/License%20-MIT-blue.svg">](LICENSE)
<a href="https://www.npmjs.com/package/vkrun" rel="nofollow"><img src="https://img.shields.io/npm/dw/vkrun.svg?color=blue" alt="npm"></a>
<a href="https://www.npmjs.com/package/vkrun" rel="nofollow"><img src="https://img.shields.io/github/stars/jukerah/vkrun" alt="stars"></a>

<hr/>

### Content
- [Installation](#installation)
- Router
- [Schema](./src/modules/schema/Readme.md)
- Validate Route Data
- Super Request
- Session
- Rate Limit
- Parse Data
- Logger
- JWT
- Cors
- [Security Issues](#security-issues)
- [Contributing](#contributing)
- [Contributors](#contributors)
- [License](#license)

<h2 id="installation">Installation</h2>

If you need a step-by-step guide on how to install and use Vkrun, use the [Installation Guide](Installation-Guide.md)

##### NPM

```bash
npm install vkrun
```

##### YARN

```bash
yarn add vkrun
```

<h2 id="security-issues">Security Issues</h2>

If you discover a security vulnerability in Express, please see [Security Policies and Procedures](Security.md).

<h2 id="contributing">Contributing</h2>

The Vkrun project appreciates all constructive contributions. Contributions come in many forms, from code for bug fixes and enhancements to additions and corrections to documentation, additional tests, triaging of received pull requests and issues, and much more!

Refer to the [Contribution Guide](Contributing.md) for more technical details on how to contribute.

<h2 id="contributors">Contributors</h2>

The original author of Vkrun and current lead maintainer is [Mario Elvio](https://www.linkedin.com/in/marioelvio)

<a href="https://github.com/jukerah" target="_blank"><img src="https://img.shields.io/badge/GitHub-blue?style=for-the-badge&logo=github&logoColor=white" target="_blank"></a>
<a href = "mailto:juka.mebaj@gmail.com"><img src="https://img.shields.io/badge/Gmail-blue?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
<a href="https://www.linkedin.com/in/marioelvio" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-blue?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>
<a href="https://api.whatsapp.com/send?phone=5516988658468" target="_blank"><img src="https://img.shields.io/badge/WhatsApp-blue?style=for-the-badge&logo=whatsapp&logoColor=white" target="_blank"></a> 

<h2 id="license">License</h2>

[MIT](LICENSE)