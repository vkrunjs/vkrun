<div align="center">
  <img src="logo.svg" width="200px" align="center" alt="Vkrun logo" />
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

VkrunJs documentation, visit [vkrunjs.org](https://vkrunjs.org/)

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
import v from "vkrun";

const vkrun = v.App();

vkrun.get("/", (req: v.Request, res: v.Request) => {
  res.status(200).send("Hello World!");
});

vkrun.server().listen(3000, () => {
  console.log("Vkrun started on port 3000");
});
```
