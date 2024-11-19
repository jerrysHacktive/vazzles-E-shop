const expressJwt = require('express-jwt')
const { product } = require('../models/products')
const { registerUser, login } = require('../controllers/users')


//  protecting the api routes so that no one can use it without authentication
function authJwt () {
    const secret = process.env.JWT_SECRET
    return expressJwt({
        secret,
        algorithms: ["HS256"],
        isRevoked: isRevoked
    })
    //excluding some REST API route from authentication
    .unless({
        path:[
            {url:/\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS']},
            {url:/\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS']},
            api/v1/users/registerUser,
            api/v1/users/login
        ]
    })

    
}

//function for protected route
// function to check if user is an admin
async function isRevoked(req, payload, done) {
    // if any protected route is called and the user isnt an admin the token would be rejected
        if(!payload.isAdmin){
            done(null, true)
        }
        done()
}


module.exports = authJwt