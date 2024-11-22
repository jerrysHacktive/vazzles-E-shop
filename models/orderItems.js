const mongoose = require('mongoose')



const orderItemSchema = mongoose.Schema({
quantity:{
    type:Number,
    required:true
},
product:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'products'
}
    
    
})

exports.orderItems = mongoose.model('orderItems', orderItemSchema)