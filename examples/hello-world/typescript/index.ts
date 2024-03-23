import { App, Router, Request, Response } from 'vkrun'

const app = App()
const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/plain')
  res.status(200).end('Hello World!')
})

app.use(router)

app.server().listen(3000, () => {
  console.log('Vkrun started on port 3000')
})