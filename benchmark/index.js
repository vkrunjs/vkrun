const v = require('vkrun')

const app = v.App()

app.get('/hello-world', (req, res) => {
    res.status(200).send('Hello World!')
})

app.server().listen(3000, () => {
    console.log('Vkrun server on port 3000')
})

