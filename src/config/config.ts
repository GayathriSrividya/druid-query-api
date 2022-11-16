const config={

    apiPort:process.env.api_port || 3000,
    druidHost:process.env.druid_host || "http://localhost",
    druidPort:process.env.druid_port || 8082,
    druidEndPoint:process.env.druid_end_point || "/druid/v2",

    limits:[
        {
            common:{
                max_result_threshold:10,
                max_result_row_limit:10
            },
            dataSource:"telemetry-events",
            queryRules:{
                groupBy:{
                    max_date_range:2
                 },
                scan:{
                    max_date_range:2
                 },
                search:{
                    max_date_range:2 
                },
                
                timeBoundary:{
                    max_date_range:2 
                },
                timeseries:{
                    max_date_range:2 
                },
                topN:{
                    max_date_range:2 
                }
            }
        }
    ]
}
export {config}