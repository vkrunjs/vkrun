import v from 'vkrun'
import fs from 'fs'

const app = v.App()
app.parseData() // equivalent app.parseData({ formData: true })

// Middleware for uploading files
const middlewareUploads = v.upload.diskStorage({
  destination: 'files' // path where the files will be saved
})

const controller = (req: v.Request, res: v.Response) => {
  res.status(200).end()
}

app.post(
  '/upload', // route
  middlewareUploads, // using middleware in a route
  controller // generic controller
)

app.server().listen(3000, async () => {
  console.log('Vkrun started on port 3000')
  await sendFile()
})

const sendFile = async () => {
  const data = new FormData()
  const fileBuffer = fs.readFileSync('filename.txt')
  const fileBlob = new Blob([fileBuffer], { type: 'text/plain' }) // Blob nativo do Node.js v18+
  data.append('file', fileBlob, 'filename.txt')

  await fetch('http://localhost:3000/upload', {
    method: 'POST',
    body: data
  }).then(() => {
    console.log("file sent and saved in the directory")
  })
}
