import * as v from 'vkrun'

const app = v.App()
const router = v.Router()

router.get('/', (req: v.Request, res: v.Response) => {
  res.status(200).send('GET method route')
})

router.post('/', (req: v.Request, res: v.Response) => {
  res.status(200).send('POST method route')
})

router.put('/', (req: v.Request, res: v.Response) => {
  res.status(200).send('PUT method route')
})

router.patch('/', (req: v.Request, res: v.Response) => {
  res.status(200).send('PATCH method route')
})

router.delete('/', (req: v.Request, res: v.Response) => {
  res.status(200).send('DELETE method route')
})

router.options('/', (req: v.Request, res: v.Response) => {
  res.status(200).end('OPTIONS method route')
})

router.head('/', (req: v.Request, res: v.Response) => {
  res.status(200).end() // The HEAD method does not send data in the response body
})

app.use(router) // Injected all created routes

app.server().listen(3000, () => {
  console.log('Vkrun started on port 3000')
})