const express = require('express')
const router = express.Router()
const { } = require('../controllers/category')
const { getAllProducts, createProduct, getAProduct, updateProduct, deleteProduct, getproductCount, getFeaturedProduct, numberOfFeaturedProducts, filterByCategory } = require('../controllers/products')

router.get('/', getAllProducts)

router.post('/', createProduct)

router.get('/:id', getAProduct)

router.put('/:id', updateProduct)

router.delete('/:id', deleteProduct)

router.get('/get/count', getproductCount)

router.get('/get/featured', getFeaturedProduct)

router.get('/get/featured/:count', numberOfFeaturedProducts)

router.get('/', filterByCategory)






module.exports = router