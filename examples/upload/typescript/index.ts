import v from 'vkrun'
import path from 'path'
import fs from 'fs'

const app = v.App()
app.parseData() // equivalent app.parseData({ formData: true })

// Middleware for uploading files
const middlewareUploads = v.upload.diskStorage({
  destination: path.join(__dirname, 'files') // path where the files will be saved
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

const filename = 'filename.txt'
const filePath = path.join(__dirname, filename)

const data = new FormData()
const fileBuffer = fs.readFileSync(filePath)
data.append('file', fileBuffer, filename)

fetch('http://localhost:3000/upload', {
  method: 'POST',
  body: data
})