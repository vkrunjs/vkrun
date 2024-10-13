import v from 'vkrun'

const app = v.App()
const router = v.Router()

// ----- Example 1: Defining routes with 'Router' -----

// GET method: This route responds to the GET request at the root URL ('/')
router.get('/', (req: v.Request, res: v.Response) => {
  res.status(200).send('GET method route')
})

// POST method: This route responds to the POST request at the root URL ('/')
router.post('/', (req: v.Request, res: v.Response) => {
  res.status(200).send('POST method route')
})

// PUT method: This route responds to the PUT request at the root URL ('/')
router.put('/', (req: v.Request, res: v.Response) => {
  res.status(200).send('PUT method route')
})

// PATCH method: This route responds to the PATCH request at the root URL ('/')
router.patch('/', (req: v.Request, res: v.Response) => {
  res.status(200).send('PATCH method route')
})

// DELETE method: This route responds to the DELETE request at the root URL ('/')
router.delete('/', (req: v.Request, res: v.Response) => {
  res.status(200).send('DELETE method route')
})

// OPTIONS method: This route responds to the OPTIONS request at the root URL ('/')
router.options('/', (req: v.Request, res: v.Response) => {
  res.status(200).end('OPTIONS method route')
})

// HEAD method: This route responds to the HEAD request at the root URL ('/')
// Note: HEAD responses do not contain a body, only headers
router.head('/', (req: v.Request, res: v.Response) => {
  res.status(200).end() // No body in the response
})

// Attach the router to the application to inject all defined routes
app.use(router)

// ----- Example 2: Defining routes with 'app.protocol' -----

// Using `app.get`, `app.post`, `app.put`, etc., you can define routes directly on the main app instance
app.get('/quick-get', (req: v.Request, res: v.Response) => {
  res.status(200).send('GET method route defined with app.get')
})

app.post('/quick-post', (req: v.Request, res: v.Response) => {
  res.status(200).send('POST method route defined with app.post')
})

// Start the server on port 3000
app.server().listen(3000, () => {
  console.log('Vkrun started on port 3000')
})
