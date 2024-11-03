const v = require('vkrun')

const app = v.App()

app.get('/', (req, res) => {
    res.status(200).json(req.body)
})

app.server().listen(3000, () => {
    console.log('Vkrun server on port 3000')
})

