class responseFormatter{

public static formatApiResponse(id="druid.api", params = {}, responseCode:string | undefined, result={}) {
    return {
        "id":id,
        "ver":"v1",
        "timestamp": Date.now(),
        "params":params,
        "responseCode":responseCode,
        "result":result
    }
}

}

export {responseFormatter}