import * as v from 'vkrun'

const app = v.App()
const router = v.Router()

router.get('/', (req, res) => {
  res.status(200).send('GET method route')
})

router.post('/', (req, res) => {
  res.status(200).send('POST method route')
})

router.put('/', (req, res) => {
  res.status(200).send('PUT method route')
})

router.patch('/', (req, res) => {
  res.status(200).send('PATCH method route')
})

router.delete('/', (req, res) => {
  res.status(200).send('DELETE method route')
})

router.options('/', (req, res) => {
  res.status(200).end('OPTIONS method route')
})

router.head('/', (req, res) => {
  res.status(200).end() // The HEAD method does not send data in the response body
})

app.use(router) // Injected all created routes

app.server().listen(3000, () => {
  console.log('Vkrun started on port 3000')
})