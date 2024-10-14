import v from 'vkrun'

const app = v.App()
app.parseData()

const controller = (req, res) => {
  console.log({
    body: req.body,
    params: req.params,
    query: req.query
  })
  res.status(200).send('Response OK!')
}

app.post('/super-request/:param1/:param2', controller)

const params = 'value1/value2?query1=example@mail.com&query2=123'
const query = '?query1=example@mail.com&query2=123'
const body = {
  string: 'Any string',
  boolean: false,
  number: 1,
  date: new Date(),
  array: [{
    string: 'Any string',
    boolean: false,
    number: 1,
    date: new Date()
  }]
}

const sendRequest = async() => {
  const url = `/super-request/${params}${query}`
  const response = await v.superRequest(app).post(url, body)
  console.log({ response })
}

sendRequest()
