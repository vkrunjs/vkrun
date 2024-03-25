import v from 'vkrun'

const app = v.App()
const router = v.Router()

router.get('/', (req: v.Request, res: v.Response) => {
  res.setHeader('Content-Type', 'text/plain')
  res.status(200).end('Hello World!')
})

app.use(router)

app.server().listen(3000, () => {
  console.log('Vkrun started on port 3000')
})