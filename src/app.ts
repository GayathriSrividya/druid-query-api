import express, { Application } from 'express'
import {config} from './config/config'
import {router} from './routes/router'
import { responseFormatter } from './helpers/responseFormatter'
const app:Application=express()

app.use(express.json())

app.use('/', router)

app.use((req, res) => {
    const error = new Error('Not Found')
    return res.status(404).json(
       responseFormatter.formatApiResponse(undefined, undefined, error.message, undefined)
    )
})

app.listen(config.apiPort, ()=>{
    console.log(`listening on port ${config.apiPort}`)
})

export default app