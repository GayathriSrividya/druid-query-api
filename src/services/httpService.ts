import axios, {AxiosRequestConfig} from 'axios'
import {config} from '../config/config'
  

class HttpService{
    private host : string
    private port : Number
    constructor(host:string, port=Number(config.druidPort)){
        this.host=host
        this.port=port
    }

    public fetch(endPoint:string,METHOD:AxiosRequestConfig['method'], res: any, query?:any):Promise<any>{
        const URL=this.host+":"+this.port+endPoint
        return axios({
            data: query,
            headers: { "Content-Type": "application/json" },
            method:METHOD,
            url: URL,
            timeout:3000,
            timeoutErrorMessage:"check your connection"
        }).then((response:any) => {
             return response
        }).catch((err) => {
            if(err.code=='ECONNREFUSED')
            {
                return {"status":503, "statusText":err.code, "data":{}}
            }
            return err.response
          })
     }
}


export {HttpService} 