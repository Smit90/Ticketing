import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import { currentUserRouter, signinRouter, signoutRouter, singupRouter } from './routes/index'
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/index'

const app = express()
app.use(json())

// routes
app.use(currentUserRouter)
app.use(signinRouter)
app.use(singupRouter)
app.use(signoutRouter)

app.all('*', async () => {
    throw new NotFoundError()
})

// error handler
app.use(errorHandler)

app.listen(3000, () => {
    console.log("Auth Service running on port 3000!")
})