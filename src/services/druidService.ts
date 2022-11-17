import { IValidationResponse } from '../models/model'
import { IDataSourceLimits, IQuery, IString } from '../models/model'
import { ValidationService } from './validationService'
 
class DruidService{

    private dataSourceLimits: IDataSourceLimits
    constructor(dataSourceLimits: IDataSourceLimits){
        this.dataSourceLimits=dataSourceLimits
     }
    
    public validate(req: any, res: any, ...pathsToSqlQuery:string[]){
            const isSqlQuery = pathsToSqlQuery.some((path) => path === "/druid/v2/sql/")
            if (isSqlQuery==true) {
                let queryData:IString=req.body
                queryData.query=queryData.query.replace(/\s+/g, ' ').trim()
                const dataSource=this.getDataSource(queryData.query)
                let result: IValidationResponse = ValidationService.validateSqlQuery(queryData, this.getLimits(dataSource)) 
                return result          
            } 
            else {
                const query: IQuery = req.body
                let result: IValidationResponse = ValidationService.validateNativeQuery(query, this.getLimits(query.dataSource))
                return result 
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