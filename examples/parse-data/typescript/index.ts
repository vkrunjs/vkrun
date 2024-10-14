import v from 'vkrun'
import fs from 'fs'

const app = v.App()
app.parseData() // Enable all default parse options for incoming data

// Controller to handle all responses
const controller = (req: v.Request, res: v.Response) => {
  const responseData = {
    body: req.body,
    params: req.params,
    query: req.query,
    files: req.files,
  }
  res.status(200).json(responseData)
}

// Demonstrating different Content-Type handling
app.get('/parse/:param1/:param2', controller) // GET with URL Params and Query string
app.post('/json', controller) // POST with JSON body
app.put('/urlencoded-data', controller) // PUT with URL-encoded form data
app.patch('/multipart-form-data', controller) // PATCH with multipart/form-data

app.server().listen(3000, async () => {
  console.log('Vkrun started on port 3000')
  await runExamples()
})

// Helper function to execute requests to each route
const runExamples = async () => {
  // GET with URL Params and Query String
  const params = 'value1/value2'
  const query = `?query1=example@mail.com&query2=123&query3=1.2&query4=true&query5=${new Date().toISOString()}`

  await fetch(`http://localhost:3000/parse/${params}${query}`, {
    method: 'GET'
  }).then(async res => {
    console.log('GET /parse - Params and Query:')
    console.log(await res.json())
  })

  // JSON Body (POST)
  await fetch('http://localhost:3000/json', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'example@mail.com',
      number: 123,
      float: 1.56,
      boolean: true,
      date: '2000-02-03T02:00:00.000Z'
    })
  }).then(async res => {
    console.log('POST /parse - JSON:')
    console.log(await res.json())
  })

  // JSON Body (POST)
  await fetch('http://localhost:3000/json', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'example@mail.com',
      number: 123,
      float: 1.56,
      boolean: true,
      date: '2000-02-03T02:00:00.000Z'
    })
  }).then(async res => {
    console.log('POST /parse - JSON:')
    console.log(await res.json())
  })

  // URL-encoded Form Data (PUT)
  const urlencodedData = 'email=example%40mail.com&number=123&float=1.56&boolean=true&date=2000-02-03T02%3A00%3A00.000Z'
  await fetch('http://localhost:3000/urlencoded-data', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: urlencodedData
  }).then(async res => {
    console.log('PUT /parse - URL Encoded:')
    console.log(await res.json())
  })

  // Multipart Form Data (PATCH)
  const formData = new FormData()
  formData.append('email', 'example@mail.com')
  formData.append('number', '123')
  formData.append('float', '1.56')
  formData.append('boolean', 'true')
  formData.append('date', '2000-02-03T02:00:00.000Z')

  // Adding a file to FormData
  const fileBuffer = fs.readFileSync('filename.txt')
  const fileBlob = new Blob([fileBuffer], { type: 'text/plain' }) // Blob nativo do Node.js v18+
  formData.append('file', fileBlob, 'filename.txt')

  await fetch('http://localhost:3000/multipart-form-data', {
    method: 'PATCH',
    body: formData
  }).then(async res => {
    console.log('PATCH /parse - Form Data:')
    console.log(await res.json())
  })
}
