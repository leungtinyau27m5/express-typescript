import express from 'express'

const app = express()
const port = 3000

app.use('/', (req: express.Request, res: express.Response) => {
    res.send('Hello World!!')
})
app.use('/1', (req: express.Request, res: express.Response) => {
    res.send('in 1')
})

console.log('server start ?')
console.log('updated')

app.listen(port)
