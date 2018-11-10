
function Customer(app,database,flight,tickets){
    
    app.get("/customer/buy", (request, response) => {

    })

    app.get("/customer/:id", (request, response) => {

        database.ref('/customer/').child(request.params.id).once("value", function(snpashot) {
            var value = snpashot.val();

            if(value){
                response.status(200).json({data:value})
            }else{
                response.status(404).json({message:"Record not found."})
            }
        })
    })

    app.post("/customer/buy", (request, response) => {

        const f_record = flight.child(request.body.buy.id_flight)

        
        database.ref('/customer/'+request.body.user.dni).set(request.body.user)
        
        f_record.once("value", function(snpashot) {
            var value = snpashot.val();

            if(value){

                value.avion.plazas = value.avion.plazas - request.body.buy.plazas
                if(value.avion.plazas>=0){
                    f_record.update({avion: value.avion})

                    tickets .push({
                        dni: request.body.user.dni,
                        id_flight: request.body.buy.id_flight,
                        plazas:request.body.buy.plazas
                    })
                    
                    response.status(200).json({data:value})
                }else{
                    
                    response.status(400).json({message:"Cantidad disponible excedida"})
                }
            }else{
                response.status(404).json({message:"Fligth not found."})
            }
        })
    })
}

module.exports = Customer