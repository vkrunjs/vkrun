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
- [Usage Examples](#usage-examples)
  - [Using singleFile](#using-singleFile)
  - [Using multipleFiles](#using-multipleFiles)
  - [Setting Custom File Names](#setting-custom-file-names)
- [File Data Structure](#file-data-structure)
- [Example projects](#example-projects)

<h2 id="introduction">Introduction</h2>

The Vkrun Upload module is designed for file handling and must be used alongside parseData with formData enabled. This middleware supports single and multiple file uploads with options for validation, such as required fields and limits on the minimum and maximum number of files.

<h2 id="usage-examples">Usage Examples</h2>

#### Configuring Upload Destination

Set up diskStorage with your preferred file storage destination and optional filename customization. This configuration will be used for both single and multiple file uploads.

```ts
import v from 'vkrun/modules/upload'

const uploadConfig = v.upload.diskStorage({
  destination: 'path-to-save-files' // Specifies where files will be saved
})
```

<h3 id="using-singleFile">Single File Upload</h3>

The following example demonstrates how to configure a single file upload, specifying that the file field is required and customizing the error response if the file is missing.

```ts
import v from 'vkrun'

const app = v.App()
app.parseData({ formData: true })
const router = v.Router()

const singleFileUpload = uploadConfig.singleFile({
  fieldName: 'file',        // The form field name for the file
  required: true,           // Specifies that the file is required
  onError: (res) => res.status(400).json({ error: 'File is required!' })
})

router.post('/upload-single', singleFileUpload, (req: v.Request, res: v.Response) => {
  res.status(200).json({ message: 'Single file uploaded successfully!', file: req.files })
})

app.use(router)
app.server().listen(3000, () => {
  console.log('Vkrun server started on port 3000')
})
```

<h3 id="using-multipleFiles">Using multipleFiles</h3>

The example below shows how to set up multiple file uploads with specific validation criteria, such as minimum and maximum file counts, along with custom error responses for each condition.

```ts
const multipleFilesUpload = uploadConfig.multipleFiles([
  {
    fieldName: 'file1',   // Field for the first set of files
    min: { count: 2, onError: (res) => res.status(400).json({ error: 'At least 2 files required for file1' }) },
    max: { count: 5, onError: (res) => res.status(400).json({ error: 'No more than 5 files allowed for file1' }) }
  },
  {
    fieldName: 'file2',   // Field for the second set of files
    min: { count: 1 },
    max: { count: 1, onError: (res) => res.status(400).json({ error: 'Only 1 file allowed for file2' }) }
  }
])

router.post('/upload-multiple', multipleFilesUpload, (req: v.Request, res: v.Response) => {
  res.status(200).json({ message: 'Multiple files uploaded successfully!', files: req.files })
})
```

<h3 id="setting-custom-file-names">Setting Custom File Names</h3>

```ts
const uploadWithCustomFilename = upload.diskStorage({
  destination: 'path-to-save-files',
  filename: (file) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    return `${file.filename}-${uniqueSuffix}.${file.extension}`
  }
})
```

#### Full Example with Single and Multiple File Uploads

Here’s a complete setup for handling both single and multiple file uploads using the configurations defined above:

```ts
import v from 'vkrun'
import { upload } from 'vkrun/modules/upload'

const app = v.App()
app.parseData({ formData: true })
const router = v.Router()

const singleFileUpload = uploadConfig.singleFile({
  fieldName: 'file',
  required: true,
  onError: (res) => res.status(400).json({ error: 'File is required!' })
})

const multipleFilesUpload = uploadConfig.multipleFiles([
  { fieldName: 'file1', min: { count: 2 }, max: { count: 5 } },
  { fieldName: 'file2', min: { count: 1 }, max: { count: 1 } }
])

// Route for single file upload
router.post('/upload-single', singleFileUpload, (req: v.Request, res: v.Response) => {
  res.status(200).json({ message: 'Single file uploaded successfully!', file: req.files })
})

// Route for multiple files upload
router.post('/upload-multiple', multipleFilesUpload, (req: v.Request, res: v.Response) => {
  res.status(200).json({ message: 'Multiple files uploaded successfully!', files: req.files })
})

app.use(router)
app.server().listen(3000, () => {
  console.log('Vkrun server started on port 3000')
})
```

<h2 id="file-data-structure">File Data Structure</h2>

### File Data Structure

The `request.files` array contains information about each uploaded file. Each file object in this array follows the structure below:

| Property      | Type     | Description                                                                                   |
|---------------|----------|-----------------------------------------------------------------------------------------------|
| `fieldName`   | `string` | The name of the form field associated with the uploaded file.                                 |
| `originalName`| `string` | The original name of the file as provided by the client before upload.                        |
| `filename`    | `string` | The name given to the file after it has been saved to disk.                                   |
| `extension`   | `string` | The file extension (e.g., `txt`, `jpg`) extracted from the uploaded file.                     |
| `mimetype`    | `string` | The MIME type of the file, indicating the file type (e.g., `image/jpeg`, `text/plain`).       |
| `size`        | `number` | The size of the file in bytes.                                                                |
| `destination` | `string` | The path to the directory where the file is saved.                                            |
| `path`        | `string` | The full file path including filename and extension where the file is stored on disk.         |

These properties allow for detailed information about each uploaded file, making it easy to handle, verify, and process files within your application. 

Each file in `request.files` is an object of this structure, ensuring that you have access to both metadata and file path details for further operations, such as reading, moving, or deleting the files post-upload.

<h2 id="example-projects">Example projects</h2>

If you are looking for practical examples of how to use our framework in different scenarios, just click the link below:

[Example Projects](https://github.com/vkrunjs/vkrun/tree/main/examples/upload)

Feel free to browse the different designs and try out what best suits your needs. If you have any questions or suggestions about the examples, do not hesitate to contact us by opening a new Issue.