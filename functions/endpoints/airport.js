
function Airport(app,airport){
    
    app.post("/airport", (request, response) => {

        const record = airport.push(request.body)
        response.status(202).json({
            record:{
                id:record.key,
                plazas:request.body.plazas
            }
        })
    })

    app.get("/airport", (request, response) => {

        airport.once("value", function(snpashot) {
            var value = snpashot.val();

            if(value){
                let data = []

                for(let k in value){
                    data.push({
                        id: k,
                        plazas: value[k].plazas
                    })
                }

                response.status(200).json({data})
            }else{
                response.status(404).json({data:[]})
            }
        })
    })

    app.get("/airport/:id", (request, response) => {

        airport.child(request.params.id).once("value", function(snpashot) {
            var value = snpashot.val();

            if(value){
                response.status(200).json({data:value})
            }else{
                response.status(404).json({message:"Record not found."})
            }
        })
    })
}

module.exports = Airport