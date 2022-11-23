import express from 'express'

import druidController from '../controllers/druidController'

const routes = require('../resources/routes.json')

const router = express.Router()

router.get(routes.GETSTATUS.URL,  druidController.getStatus)

router.get(routes.HEALTHCHECK.URL, druidController.getHealthStatus)

router.get(routes.LISTDATSOURCES.URL, druidController.listDataSources)

router.post(routes.NATIVEQUERY.URL, druidController.executeNativeQuery)

router.post(routes.SQLQUERY.URL, druidController.executeSqlQuery)

export {router}