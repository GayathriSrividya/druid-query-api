import { config } from '../config/config'
import { HttpService } from "../services/httpService"
import { DruidService } from '../services/druidService'
import routes= require("../resources/routes.json")
import { responseFormatter } from '../helpers/responseFormatter'
const httpService = new HttpService(config.druidHost, Number(config.druidPort))
const druidService = new DruidService({limits:config.limits})


class druidController
{
public static getStatus =  async (req:any, res: any) => {
    try 
    {
       let result = await httpService.fetch(req.url, "GET", res) 
       res.status(result.status).json(responseFormatter.formatApiResponse(routes.GET.GETSTATUS.APIID, undefined, result.statusText, result.data))
    } 
    catch (error) 
    {
        return error
    }
}
public static getHealthStatus= async (req:any, res:any) => {
    try 
    {
        let result = await httpService.fetch(req.url, "GET", res)
        res.status(result.status).json(responseFormatter.formatApiResponse(routes.GET.HEALTHCHECK.APIID, undefined, result.statusText, result.data))
    } 
    catch (error) 
    {
        return error
    }
}
public static listDataSources= async (req:any, res:any) => {
    try 
    {
        let result = await httpService.fetch(req.url, "GET", res)
        
        res.status(result.status).json(responseFormatter.formatApiResponse(routes.GET.LISTDATSOURCES.APIID, undefined, result.statusText, result.data))
    } 
    catch (error) 
    {
        return error
    }
}
public static executeNativeQuery=async (req:any, res:any)=>{
    try
    {
        let validateQuery=druidService.validate(req, res)
        if(validateQuery.isValid){
            let result = await httpService.fetch(req.url, "POST", res, req.body)
            res.status(result.status).json(responseFormatter.formatApiResponse(routes.GET.LISTDATSOURCES.APIID, undefined, result.statusText, result.data))
        }
        else{
            return res.status(400).json(responseFormatter.formatApiResponse(undefined, undefined, validateQuery.errorMessage, undefined))
        }
    }
    catch(error)
    {
        return error
    }
}
public static executeSqlQuery=async (req:any, res:any)=>{
    try
    {
        let validateQuery=druidService.validate(req, res, "/druid/v2/sql/")
        if(validateQuery.isValid){
            let result = await httpService.fetch(req.url, routes.POST.SQLQUERY.METHOD, res, req.body)
            res.status(result.status).json(responseFormatter.formatApiResponse(routes.POST.SQLQUERY.APIID, undefined, result.statusText, result.data))
        }
        else
        {
            return res.status(400).json(responseFormatter.formatApiResponse(undefined, undefined, validateQuery.errorMessage, undefined))
        }
    }
    catch(error)
    {
        return error
    }
}
}

export default druidController