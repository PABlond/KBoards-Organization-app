import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import expressGraphQL from 'express-graphql'
import schema from './schemas'
import rootValue from './resolvers'

const app = express()
console.log(process.env.DB_USER, process.env.DB_PASS)

app.get('/', async (req, res) => {
    res.status(200).json('Done')
})

app.use(cors())

app.use(
    '/graphql',
    expressGraphQL({
        schema,
        rootValue,
        graphiql: true,
    })
)

export default app
