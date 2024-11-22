function errorHandler(err, req, res, next) {

    // jwt authentication error
    if(err.name === "unAuthorizedError"){
        return res.status(401).json({message:"The user is not authorized"})
    }
// validation error
    if(err.name === "validationError"){
        return res.status(401).json({message:err})
    }

    // default set to 500 server error
    return res.status(500).json(err)

    
}


module.exports=errorHandler