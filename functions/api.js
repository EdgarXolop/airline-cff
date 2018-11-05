const admin = require("firebase-admin")

const cors = require("cors")
const express = require("express")
const serviceAccount = require("./credentials.json")
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://airline-d7985.firebaseio.com"
})
const db = admin.database();
const airplane = db.ref("aviones")
const airport = db.ref("aeropuertos")
const flight = db.ref("vuelos")

const AirplaneEndpoints = require("./endpoints/airplane")
const AirportEndpoints = require("./endpoints/airport")

const app = express()

app.use(express.json());
app.use(cors({ origin: true }))

app.get("/info", (request, response) => {
    response.json({
        class: 'Base de datos',
        members: [
            {
                name: 'Edgar'
            },
            {
                name: 'Max'
            },
            {
                name: 'Renato'
            },
        ]
    })
})

new AirplaneEndpoints(app,airplane)
new AirportEndpoints(app,airport)

module.exports = app;