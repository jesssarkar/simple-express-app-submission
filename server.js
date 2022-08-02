const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 9021
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'Cluster0'

MongoClient.connect(dbConnectionStr)
    .then(client => {
        console.log('Connected to Database')
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', (request, response) => {
    db.collection("Cluster0").find().toArray()
        .then(data => {
            response.render('index.ejs', {info: data})
        })
        .catch(error => console.log(error))
})


app.post("/api", (request, response) => {
    console.log("post heard")
    db.collection("Cluster0").insertOne(request.body)
    .then(result => {
        console.log(result)
        response.redirect('/')
    })
    .catch(error => console.log(error))
})

app.delete('/deleteEntry', (request, response) => {
    db.collection("Cluster0").deleteOne(
        {name: request.body.name}
    )

    .then(result => {
        console.log('Entry Deleted')
        response.json('Entry Deleted')
    })

    .catch(error => console.error(error))
})

app.put('/updateEntry', (request, response) => {
    Object.keys(request.body).forEach(key => {
        if (request.body[key] === null || request.body[key] === undefined || request.body[key] === ""){
            delete request.body[key]
        }
    })
    console.log(request.body)
    db.collection("Cluster0").findOneAndUpdate(
        {name: request.body.name},
        {
            $set: request.body
        }
    )
    .then(result => {
        console.log(result)
        response.json("Success")
        response.redirect('/')
    })
    .catch(error => console.error(error))
})








app.listen(process.env.PORT || PORT, () => {
    console.log('Server is Running on Port 9021')
})