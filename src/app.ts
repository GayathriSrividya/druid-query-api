import express, { Application } from 'express'
import {config} from './config/config'
import {router} from './routes/router'
const app:Application=express()


app.use(express.json())


app.use('/', router)


app.listen(config.apiPort, ()=>{
    console.log(`listening on port ${config.apiPort}`)
})


export default app