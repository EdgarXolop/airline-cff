
function Airplane(app,airplane){
    
    app.post("/airplane", (request, response) => {

        const record = airplane.push(request.body)
        response.status(202).json({
            record:{
                id:record.key,
                nombre:request.body.nombre,
                localidad:request.body.localidad,
                pais:request.body.pais
            }
        })
    })

    app.get("/airplane", (request, response) => {

        airplane.once("value", function(snpashot) {
            var value = snpashot.val();

            if(value){
                let data = []

                for(let k in value){
                    data.push({
                        id: k,
                        nombre:value[k].nombre,
                        localidad:value[k].localidad,
                        Pais:value[k].pais
                    })
                }

                response.status(200).json({data})
            }else{
                response.status(404).json({data:[]})
            }
        })
    })

    app.get("/airplane/:id", (request, response) => {

        airplane.child(request.params.id).once("value", function(snpashot) {
            var value = snpashot.val();

            if(value){
                response.status(200).json({data:value})
            }else{
                response.status(404).json({message:"Record not found."})
            }
        })
    })
}

module.exports = Airplane