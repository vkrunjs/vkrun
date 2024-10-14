import v from 'vkrun'

const app = v.App()
const rateLimitConfig = { windowMs: 15 * 60 * 1000, limit: 5 }
app.rateLimit(rateLimitConfig)

app.get('/rate-limit', (req: v.Request, res: v.Response) => {
  res.status(200).send('rate limit')
})

app.server().listen(3000, async () => {
  console.log('Vkrun started on port 3000')
})
