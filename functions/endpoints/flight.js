
function Flight(app,flight){
    
    app.post("/flight", (request, response) => {

        const record = flight.push(request.body)
        response.status(202).json({
            record:{
                id:record.key,
                fecha_salida:request.body.fecha_salida,
                fecha_llegada:request.body.fecha_llegada,
                hora_salida:request.body.hora_salida,
                hora_llegada:request.body.hora_llegada,
                aeropuerto_origen:request.body.aeropuerto_origen,
                aeropuerto_destino:request.body.aeropuerto_destino,
                avion:request.body.avion
            }
        })
    })

    app.get("/flight", (request, response) => {

        flight.once("value", function(snpashot) {
            var value = snpashot.val();

            if(value){
                let data = []

                for(let k in value){
                    data.push({
                        id: k,
                        fecha_salida:value[k].fecha_salida,
                        fecha_llegada:value[k].fecha_llegada,
                        hora_salida:value[k].hora_salida,
                        hora_llegada:value[k].hora_llegada,
                        aeropuerto_origen:value[k].aeropuerto_origen,
                        aeropuerto_destino:value[k].aeropuerto_destino,
                        avion:value[k].avion
                    })
                }

                response.status(200).json({data})
            }else{
                response.status(404).json({data:[]})
            }
        })
    })

    app.get("/flight/:id", (request, response) => {

        flight.child(request.params.id).once("value", function(snpashot) {
            var value = snpashot.val();

            if(value){
                response.status(200).json({data:value})
            }else{
                response.status(404).json({message:"Record not found."})
            }
        })
    })
}

module.exports = Flight