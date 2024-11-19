const express = require('express')

//router objects
const router = express.Router()

const { getAllCategories, createCategory, getCategory, updateCategory, deleteCategory } = require('../controllers/category')

router.get('/getAll', getAllCategories)

router.post('/create', createCategory)

router.get('/getCategory/:id', getCategory)

router.put('/update/:id', updateCategory)

router.delete('/delete/:id', deleteCategory)

module.exports = router