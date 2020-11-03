import express from 'express'
import User from '@/models/user'

const app = express()
const port = 3000

app.use('/', (req: express.Request, res: express.Response) => {
    res.send(
        User.sync().then(() => {
          return User.create({
              firstName: 'John',
              lastName: 'bye'
          })  
        })
    )
})
app.use('/1', (req: express.Request, res: express.Response) => {
    User.sync({force: true}).then(() => {
        return User.create({
            firstName: 'John',
            lastName: 'Hancock'
        })
    })
    res.send('in 1')
})

app.listen(port)
