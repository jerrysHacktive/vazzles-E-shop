const mongoose = require('mongoose')



const categorySchema = mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    icon:{
            type:String
    },
    color:{
        type:String
    }
})

exports.category = mongoose.model('category', categorySchema)