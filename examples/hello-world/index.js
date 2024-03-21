import { App, Router } from '../../src/index'

const app = App()
const router = Router()

router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain')
  res.status(200).end('Hello World!')
})

app.use(router)

app.server().listen(3000, () => {
  console.log('Vkrun started on port 3000')
})