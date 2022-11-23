import { config } from '../config/config'
import { responseFormatter } from '../helpers/responseFormatter'
import { DruidService } from '../services/druidService'
import { druidInstance } from '../helpers/axios'
import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import routes= require("../resources/routes.json")
const errorHandler = require("../helpers/errorHandler")
const createError = require('http-errors')
const druidService = new DruidService({limits:config.limits})


class druidController
{
 
    public static getStatus =  async (req:Request, res: Response, next:NextFunction) => {
        try 
        {
            await druidInstance.get(routes.GETSTATUS.URL)
            .then((response)=>{
                res.status(response.status).json(responseFormatter.formatApiResponse({"id":routes.GETSTATUS.APIID,  "responseCode":response.status, "result":response.data}))
            })
        }
        catch (error:any) 
        {
            next(createError(500, error.message))
        }
    }
    public static getHealthStatus= async (req:Request, res: Response) => {
       
            await druidInstance.get(routes.HEALTHCHECK.URL)
            .then((response)=>{
                res.status(response.status).json(responseFormatter.formatApiResponse({"id":routes.HEALTHCHECK.APIID,  "responseCode":response.status, "result":response.data}))
            })
            .catch((err)=>{
                res.status(StatusCodes.NOT_FOUND).json("The API Endooin")
            })
             
        
        // catch (error) 
        // {
        //     ErrorHandler.errorHandler(req, res, error, routes.HEALTHCHECK.APIID)
        // }
    }
    public static listDataSources= async (req:Request, res: Response) => {
        try 
        {
            await druidInstance.get(routes.LISTDATSOURCES.URL)
            .then((response)=>{
                res.status(response.status).json(responseFormatter.formatApiResponse({"id":routes.LISTDATSOURCES.APIID,  "responseCode":response.status, "result":response.data}))

            })
            .catch((err)=>{
                // throw new PromiseError(err.response.statusText, err.response.status)
            })
             
        }
        catch (error) 
        {
            // ErrorHandler.errorHandler(req, res, error, routes.LISTDATSOURCES.APIID)
        }
    }
    public static executeNativeQuery=async (req:Request, res: Response)=>{
        try
        {
            let validateQuery=druidService.validate(req, res)
            if(validateQuery.isValid){
                await druidInstance.post(req.url, req.body)
                .then((response)=>{
                    res.status(response.status).json(responseFormatter.formatApiResponse({"id":routes.NATIVEQUERY.APIID,  "responseCode":response.status, "result":response.data}))
                })
                .catch((err)=>{
                    // throw new PromiseError(err.response.statusText, err.response.status)
                })
            }
            else
            {
                    // throw new ValidationError(validateQuery.errorMessage, validateQuery.errorCode)
            }
        }
            catch (error) 
            {
                
                // ErrorHandler.errorHandler(req, res, error, routes.NATIVEQUERY.APIID)
                 
            }
    }
    public static executeSqlQuery=async (req:Request, res: Response)=>{
        try
        {
            let validateQuery=druidService.validate(req, res, "/druid/v2/sql/")
             if(validateQuery.isValid){
                await druidInstance.post(req.url, req.body)
                .then((response)=>{
                    res.status(response.status).json(responseFormatter.formatApiResponse({"id":routes.SQLQUERY.APIID,  "responseCode":response.status, "result":response.data}))
                })
                .catch((err)=>{
                    // throw new PromiseError(err.response.statusText, err.response.status)
                })
            }
            else
            {
                    // throw new ValidationError(validateQuery.errorMessage, validateQuery.errorCode)
            }
           
        }
            catch (error) 
            {
                // ErrorHandler.errorHandler(req, res, error, routes.SQLQUERY.APIID)
            }
    }
    }

export default druidController