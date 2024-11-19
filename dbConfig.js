'use strict'
const mongoose = require('mongoose')

const DB = process.env.MONGO_URL


mongoose.connect(DB)
.then(()=>{
    console.info("connected to DB")
})
.catch((error)=>{
    console.log("error", error)
})