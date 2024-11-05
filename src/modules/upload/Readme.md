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

The Vkrun Upload module is designed for file handling and must be used alongside `parseData` with `formData` enabled. This middleware supports single and multiple file uploads with options for validation, such as required fields, file size limits, and file extension validation.

<h2 id="usage-examples">Usage Examples</h2>

#### Configuring Upload Destination

Set up diskStorage with your preferred file storage destination and optional filename customization. This configuration will be used for both single and multiple file uploads.

```ts
import { upload } from 'vkrun/modules/upload'

// Disk storage setup with optional custom filename
const diskStorage = upload.diskStorage({
  destination: 'path/to/store/files', 
  filename: (file) => `custom-${file.fieldName}-${Date.now()}`
})

// Memory storage setup
const memoryStorage = upload.memoryStorage()
```

<h3 id="using-singleFile">Single File Upload</h3>

The following example demonstrates a single file upload with a required field and custom error handling for missing files.

```ts
import { App, Request, Response, Router } from 'vkrun'

const app = App()
app.parseData({ formData: true })
const router = Router()

const singleFileUpload = diskStorage.singleFile({
  fieldName: 'file',
  required: { 
    enable: true, 
    onError: (res) => res.status(400).json({ error: 'File is required!' }) 
  },
  size: { 
    value: 500000, 
    onError: (res) => res.status(413).json({ error: 'File too large!' }) 
  },
  extensions: { 
    value: ['png', 'jpg'], 
    onError: (res) => res.status(415).json({ error: 'Invalid file type!' }) 
  }
})

router.post('/upload-single', singleFileUpload, (req: Request, res: Response) => {
  res.status(200).json({ message: 'Single file uploaded successfully!', file: req.files })
})

app.use(router)
app.server().listen(3000, () => {
  console.log('Vkrun server started on port 3000')
})
```

<h3 id="using-multipleFiles">Using multipleFiles</h3>

Here’s how to configure multiple file uploads with specific validation rules for minimum and maximum file counts, size limits, and custom extensions.

```ts
const multipleFilesUpload = diskStorage.multipleFiles([
  {
    fieldName: 'images',
    min: { 
      value: 2, 
      onError: (res) => res.status(400).json({ error: 'At least 2 images required' }) 
    },
    max: { 
      value: 5, 
      onError: (res) => res.status(400).json({ error: 'No more than 5 images allowed' }) 
    },
    size: { 
      value: 500000, 
      onError: (res) => res.status(413).json({ error: 'One of the images is too large' }) 
    },
    extensions: { 
      value: ['jpg', 'png'], 
      onError: (res) => res.status(415).json({ error: 'Invalid image format' }) 
    }
  },
  {
    fieldName: 'documents',
    min: { 
      value: 1, 
      onError: (res) => res.status(400).json({ error: 'At least 1 document required' }) 
    },
    max: { 
      value: 3 
    },
    extensions: { 
      value: ['pdf'], 
      onError: (res) => res.status(415).json({ error: 'Invalid document format' }) 
    }
  }
])

router.post('/upload-multiple', multipleFilesUpload, (req: Request, res: Response) => {
  res.status(200).json({ message: 'Multiple files uploaded successfully!', files: req.files })
})
```

<h3 id="setting-custom-file-names">Setting Custom File Names</h3>

To set custom file names, define a `filename` function in `diskStorage`. The function receives the file object and can return a customized filename based on properties such as the file’s field name and the current timestamp.


```ts
const uploadWithCustomFilename = upload.diskStorage({
  destination: 'path/to/store/files',
  filename: (file) => {
    const timestamp = Date.now()
    return `${file.fieldName}-${timestamp}.${file.extension}`
  }
})
```

#### Full Example with Single and Multiple File Uploads

This example demonstrates a full setup for handling both single and multiple file uploads with disk storage configuration.

```ts
import { App, Request, Response, Router } from 'vkrun'
import { upload } from 'vkrun/modules/upload'

const app = App()
app.parseData({ formData: true })
const router = Router()

// Single file upload configuration
const singleFileUpload = upload.diskStorage({
  destination: 'uploads/single'
}).singleFile({
  fieldName: 'file',
  required: { 
    enable: true, 
    onError: (res) => res.status(400).json({ error: 'File is required!' }) 
  }
})

// Multiple files upload configuration
const multipleFilesUpload = upload.diskStorage({
  destination: 'uploads/multiple'
}).multipleFiles([
  { fieldName: 'images', min: { value: 2 }, max: { value: 5 } },
  { fieldName: 'documents', min: { value: 1 }, max: { value: 3 } }
])

// Routes
router.post('/upload-single', singleFileUpload, (req: Request, res: Response) => {
  res.status(200).json({ message: 'Single file uploaded successfully!', file: req.files })
})

router.post('/upload-multiple', multipleFilesUpload, (req: Request, res: Response) => {
  res.status(200).json({ message: 'Multiple files uploaded successfully!', files: req.files })
})

app.use(router)
app.server().listen(3000, () => {
  console.log('Vkrun server started on port 3000')
})
```

<h2 id="file-data-structure">File Data Structure</h2>

### File Data Structure

The `request.files` array contains details about each uploaded file:

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

This structure provides all necessary details for handling each file, making it easier to manage operations like validation, reading, and deletion.

<h2 id="example-projects">Example projects</h2>

If you are looking for practical examples of how to use our framework in different scenarios, just click the link below:

[Example Projects](https://github.com/vkrunjs/vkrun/tree/main/examples/upload)

Feel free to browse the different designs and try out what best suits your needs. If you have any questions or suggestions about the examples, do not hesitate to contact us by opening a new Issue.