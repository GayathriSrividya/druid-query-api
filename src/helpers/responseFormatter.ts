
class responseFormatter{

public static getDefaultParams({status="success", errmsg=null}){
    return{
        status,
        errmsg
    }
}

public static formatApiResponse({id="druid.api" , ver="v1", params=this.getDefaultParams({}), responseCode=200, result={}}) {
    return {
        id, 
        ver,
        "ts": Date.now(),
        params,
        responseCode,
        result
    }
}}

export {responseFormatter}