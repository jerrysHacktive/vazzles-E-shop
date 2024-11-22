'use strict'
const mongoose = require('mongoose')


mongoose.connect( process.env.MONGO_URL)
.then(()=>{
    console.info("connected to DB")
})
.catch((error)=>{
    console.log("error", error)
})