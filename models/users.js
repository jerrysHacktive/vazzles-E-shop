const mongoose = require('mongoose')



const userSchema = mongoose.Schema({

    name:{
        type:String,
        require:true,
        unique:[true, "user with thir email already exist"]
    },
    email:{
            type:String,
            require:true
    },
    password:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    street:{
        type:String,
        default:''
    },
    apartment:{
        type:String,
        default:''
    },
    zip:{
        type:String,
        default:''
    },
    city:{
        type:String,
        default:''
    },
    country:{
        type:String,
        default:''
    }

})


userSchema.virtual("id").get(function () {
    return this._id.toHexString();
  });
  userSchema.set("toJSON", {
    virtualS: true,
  });
  

exports.users = mongoose.model('users', userSchema)