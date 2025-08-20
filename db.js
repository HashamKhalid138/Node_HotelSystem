const mongoose = require('mongoose');
require('dotenv').config();
const mongoURL = process.env.MONGO_URL;

mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const db= mongoose.connection;

db.on('connected',()=>{
    console.log("Connected to Mongodb Server");
})

db.on('error',(err)=>{
    console.log("Error during connecting Database",err);
})
db.on('disconnected',()=>{
    console.log("Disconnected to Mongodb Server");
})

module.exports = db;