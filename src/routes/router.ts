import express from 'express'
import {config} from '../config/config'
import { HttpService } from '../services/httpService'
import { DruidService } from '../services/druidService'
const router = express.Router()
const httpService = new HttpService(config.druidHost, Number(config.druidPort))
const druidService = new DruidService({limits:config.limits}, httpService)

router.get('/*', async(req, res)=>{
    druidService.fetch()(res, req, "GET")
 })


router.post(`${config.druidEndPoint}/*`, (req, res, next)=>{
    druidService.validate()(req, res, next, "/druid/v2/sql/")
},(req, res)=>{
  druidService.fetch()(res, req, "POST")})


export {router}