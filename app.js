const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv/config')
require('./dbConfig')
const authJwt = require('./helpers/authJwt')
const errorHandler = require("./helpers/errorHandler")

app.use(cors())
app.options('*', cors())

//middleware
app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(authJwt)
app.use(errorHandler)
const api = process.env.API_URL
const PORT = process.env.PORT


// REST API
app.use(`${api}/categories`, require('./routers/category'))
app.use(`${api}/products`, require('./routers/products'))
app.use(`${api}/users`, require('./routers/users'))
app.use(`${api}/orders`, require('./routers/orders'))


//listening to port
app.listen(process.env.PORT,()=>{
console.log(`APP IS RUNNING ON PORT${PORT}`);

})