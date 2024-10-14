<div align="center">
  <img src="../../../logo.svg" width="200px" align="center" alt="Vkrun logo" />
  <h1 align="center">Vkrun - Upload</h1>
  <br/>
  <p align="center">
    Upload is a middleware module used to upload files.
  </p>
</div>

<p align="center">
  <a href="https://github.com/jukerah" rel="nofollow"><img src="https://img.shields.io/badge/created%20by-Mario%20Elvio-blue.svg" alt="created by Mario Elvio"></a>
  <a href="https://opensource.org/licenses/MIT" rel="nofollow"><img src="https://img.shields.io/badge/License%20-MIT-blue.svg" alt="License MIT"></a>
  <a href="https://www.npmjs.com/package/vkrun" rel="nofollow"><img src="https://img.shields.io/npm/dw/vkrun.svg?color=blue" alt="npm"></a>
  <a href="https://www.npmjs.com/package/vkrun" rel="nofollow"><img src="https://img.shields.io/github/stars/jukerah/vkrun" alt="stars"></a>
</p>

### Content
- [Vkrun](https://github.com/vkrunjs/vkrun)
- [Introduction](#introduction)
- [Example projects](#example-projects)

<h2 id="introduction">Introduction</h2>

Upload is must be used with parseData with the formData setting enabled.

```ts
import v from 'vkrun'

const app = v.App()
app.parseData() // equivalent app.parseData({ formData: true })
const router = v.Router()

const middlewareUploads = upload.diskStorage({
  destination: 'path-files' // path where the files will be saved
})

const controller = (req: v.Request, res: v.Response) => {
  res.status(200).end()
}

app.post(
  '/upload', // route
  middlewareUploads, // using middleware in a route
  controller // generic controller
)

app.server().listen(3000, () => {
  console.log('Vkrun started on port 3000')
})
```

changing the file name:

```ts
const middlewareUploads = upload.diskStorage({
  destination: 'path-files',
  // changing the file name
  filename: (file) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    newFilename = `${file.filename}-${uniqueSuffix}.${file.extension}`
    return newFilename
  }
})
```

<h2 id="example-projects">Example projects</h2>

If you are looking for practical examples of how to use our framework in different scenarios, just click the link below:

[Example Projects](https://github.com/vkrunjs/vkrun/tree/main/examples/upload)

Feel free to browse the different designs and try out what best suits your needs. If you have any questions or suggestions about the examples, do not hesitate to contact us by opening a new Issue.