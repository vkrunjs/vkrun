import * as v from 'vkrun'

const app = v.App()
const router = v.Router()

router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain')
  res.status(200).end('Hello World!')
})

app.server().listen(3000, () => {
  console.log('Vkrun started on port 3000')
})