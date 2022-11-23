import express, { Application, Request, Response } from 'express'
import { config } from './config/config'
import { router } from './routes/router'
// import { ErrorHandler, PromiseError } from './helpers/errorHandler'
const app: Application = express()
import {globalErrorHandler} from './helpers/errorHandler'
import { routeNotFound } from './helpers/noRouteFound';
app.use(express.json())

app.use('/', router)

app.use('*', routeNotFound)

app.use(globalErrorHandler)

app.listen(config.apiPort, () => {
    console.log(`listening on port ${config.apiPort}`)
})

export default app