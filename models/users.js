const mongoose = require('mongoose')



const userSchema = mongoose.Schema({

    name:{
        type:String,
        require:true,
        trim:true,
        
    },
    email:{
            type:String,
            require:true,
            lowerCase:true,
            unique:[true, "user with this email already exist"]
    },
    password:{
        type:String,
        require:true,
        trim:true
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