const express = require('express')

const router = express.Router()

const { getAllUser, registerUser, getOneUser, login ,getUsersCount, deleteUser} = require('../controllers/users')

router.get('/', getAllUser)

router.post('/register', registerUser)

router.get('/:id',getOneUser)

router.post('/login',login )

router.get('/get/count',getUsersCount) 

router.delete('/',deleteUser )


module.exports = router