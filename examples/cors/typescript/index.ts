import v from 'vkrun'

const app = v.App()
app.cors()

app.get('/', (req: v.Request, res: v.Response) => {
  res.setHeader('Content-Type', 'text/plain')
  res.status(200).end('GET ok')
})

app.server().listen(3000, async () => {
  console.log('Vkrun started on port 3000')
})
