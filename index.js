const express = require('express');
const morgan = require("morgan");
var MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
var url = process.env.mongo_url;
const app = express();
bodyParser = require('body-parser');
app.use(bodyParser.json());
const client = new MongoClient(url);
client.connect();
console.log(url);

app.get('/user', async (req, res) => {
    try {
        const name = req.query.name
        const rest = await client.db("MyDB").collection("MyCollection").findOne({ "name": `${name}` });
        res.status(200).json({
            "message": "Success",
            "data": rest
        })
    } catch (error) {
        console.log(error)
    }

})
app.get('/users', async (req, res) => {
    try {
        const rest = await client.db("MyDB").collection("MyCollection").find().toArray();
        res.status(200).json({
            "message": "Sucess",
            "data": rest
        })
    } catch (error) {
        console.log(error)
    }

})
app.post('/createUser', async (req, res) => {
    let userData = req.body
    const rest = await client.db("MyDB").collection("MyCollection").insertOne({
        "name": userData.name,
        "age": userData.age,
        "gender": userData.age
    });
    res.status(200).json({
        "message": "Success",
        "data": rest
    })
})
app.patch('/updateuser', async (req, res) => {
    const name = req.body.name
    const age = req.body.age
    const filter = { name: name }; 
    const options = { upsert: true }; 
    const updateDoc = { $set: {age: age }}; 
    const result = await client.db("MyDB").collection("MyCollection").updateOne(filter, updateDoc, options,); 
    res.status(200).json({
        "message": "User updated successfully",
        "data": result
    })
})
app.delete('/', (req, res) => {
    console.log("Delete API is called")
    res.status(200).json({
        "status": "deleted successfully"
    })
})

app.listen(2000, () => {
    console.log("server running at port 3000")
})