import { HttpService } from "./httpService"
import { AxiosRequestConfig } from 'axios'
import { IValidationResponse } from '../models/model'
import { IDataSourceLimits, IQuery, IString} from '../models/model'
import { ValidationService } from './validationService'
 
class DruidService{

    private httpService : HttpService
    private dataSourceLimits: IDataSourceLimits
    constructor(dataSourceLimits: IDataSourceLimits, httpService:HttpService){
        this.dataSourceLimits=dataSourceLimits
        this.httpService=httpService
    }
    
    public validate(){
        
        return async (req: any, res: any, next: any, ...pathsToSkip:string[] ) => {
            const skipValidation = pathsToSkip.some((path) => path === req.path)
            if (skipValidation==true) {
                let queryData:IString=req.body
                queryData.query=queryData.query.replace(/\s+/g, ' ').trim()
                const dataSource=this.getDataSource(queryData.query)
                let result: IValidationResponse = ValidationService.validateSqlQuery(queryData, this.getLimits(dataSource))
                if (result.isValid) 
                { 
                    next()
                } 
                else { res.status(400).send(result).end() }           
            } 
            else {
                const query: IQuery = req.body
                const result: IValidationResponse = ValidationService.validateNativeQuery(query, this.getLimits(query.dataSource))
                if (result.isValid) 
                { 
                    next()
                } 
                else { res.status(400).send(result).end() }
            }
        }
    }

    public fetch() {
        return async (res:any, req: any, method: AxiosRequestConfig["method"]) => {
            try 
            {
                return await this.httpService.fetch(req.url, method, res, req.body)
            } 
            catch (error) 
            {
                return error
            }
        }
    }

    public getDataSource(query:string):any{
        let dataSource = query.substring(query.indexOf('FROM')).split(' ')[1]
        return dataSource.replace(/"/g, '')
    }
    public getLimits(datasource:string):any{
            for(var index = 0; index < this.dataSourceLimits.limits.length; index++)
            {
            if(this.dataSourceLimits.limits[index].dataSource == datasource)
            {
                return this.dataSourceLimits.limits[index] 
            }
            }
        }
}



export {DruidService}