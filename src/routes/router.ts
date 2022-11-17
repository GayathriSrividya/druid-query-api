import express from 'express'

import druidController from '../controllers/druidController'

const router = express.Router()
 
router.get('/status', druidController.getStatus)

router.get('/status/health', druidController.getHealthStatus)

router.get('/druid/v2/datasources', druidController.listDataSources)

router.post('/druid/v2/', druidController.executeNativeQuery)

router.post('/druid/v2/sql/', druidController.executeSqlQuery)

export {router}