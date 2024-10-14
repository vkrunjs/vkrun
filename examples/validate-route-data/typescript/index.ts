import v from 'vkrun'

const app = v.App()
app.parseData()

const controller = (req: v.Request, res: v.Response) => {
  const responseData = {
    body: req.body,
    params: req.params,
    query: req.query,
    files: req.files,
  }
  console.log({responseData})
  res.status(200).send('Passed all tests!')
}

const schemaData = v.schema().object({
  params: v.schema().object({
    param1: v.schema().string(),
    param2: v.schema().number().integer()
  }),
  query: v.schema().object({
    query1: v.schema().string().email(),
    query2: v.schema().number().integer(),
    query3: v.schema().number().float(),
    query4: v.schema().boolean(),
    query5: v.schema().date(),
  }),
  body: v.schema().object({
    email: v.schema().string().email(),
    number: v.schema().number().integer(),
    float: v.schema().number().float(),
    boolean: v.schema().boolean(),
    date: v.schema().date()
  })
})

app.post(
  '/route/:param1/:param2',
  v.validateRouteData(schemaData),
  controller
)

app.server().listen(3000, async () => {
  console.log('Vkrun started on port 3000')
  await runExample()
})

const runExample = async () => {
  const params = 'anyString/1'
  const query = `?query1=example@mail.com&query2=123&query3=1.2&query4=true&query5=${new Date().toISOString()}`

  const response = await fetch(`http://localhost:3000/route/${params}${query}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'example@mail.com',
      number: 123,
      float: 1.56,
      boolean: true,
      date: '2000-02-03T02:00:00.000Z'
    })
  })

  console.log({ response: await response.text() })
}
