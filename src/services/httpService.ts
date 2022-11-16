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
        return new Promise(()=>{
        const URL=this.host+":"+this.port+endPoint
        axios({
            data: query,
            headers: { "Content-Type": "application/json" },
            method:METHOD,
            url: URL,
        }).then((response) => {
            res.status(response.status).send(response.data)
        }).catch((err) => {
            res.status(err.response.status).json({"error": err.response.data.errorMessage})
          })
        })
    }
}


export {HttpService} 