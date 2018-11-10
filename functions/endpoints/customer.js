
function Customer(app,database,flight,tickets){
    
    app.get("/customer/buy", (request, response) => {


        tickets.once("value", function(snpashot) {
            var value = snpashot.val();

            if(value){
                let data = []

                for(let k in value){
                    data.push({
                        id: k,
                        customer: value[k].customer,
                        flight: value[k].flight,
                        plazas: value[k].plazas
                    })
                }

                response.status(200).json({data})
            }else{
                response.status(404).json({data:[]})
            }
        })
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
                        customer: request.body.user,
                        flight: request.body.flight,
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