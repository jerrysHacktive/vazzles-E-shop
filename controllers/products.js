/** @format */

const productModel = require("../models/products");
const categoryModel = require("../models/category");
const mongoose = require("mongoose");

const getAllProducts = async (req, res) => {
  try {
    const productList = await productModel
      .find()
      .select("name image price description -_id")
      .populate("category");
    if (!productList) {
      return res
        .status(404)
        .json({ sucess: false, message: "products not found" });
    }
    res.send(productList);
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};

// create a product
const createProduct = async (req, res) => {
  try {
    //validate if the passes a wrong category
    const category = await categoryModel.findById(req.body.category);
    if (!category)
      return res
        .status(404)
        .json({ success: false, message: "invalid category" });

    // create the product
    let product = new productModel({
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      Image: req.body.Image,
      images: req.body.images,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    });

    product = await product.save();
    if (!product) return res.status(400).send("cannot create product");

    return res.status(201).send({
      success: true,
      message: "product created successsfully",
      product,
    });
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};

// to get a single product
const getAProduct = async (req, res) => {
  try {
    const product = await productModel
      .findById(req.params.id)
      .populate("category");
    if (!product) {
      return res
        .status(404)
        .json({ sucess: false, message: "product not found" });
    }
    res.send(product);
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};

//update a product

const updateProduct = async (req, res) => {
  try {
    //validate if the passes a wrong category
    const category = await categoryModel.findById(req.body.category);
    if (!category)
      return res
        .status(404)
        .json({ success: false, message: "invalid category" });

    // check if the product Id is valid
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send("invalid product ID");
    }
    //update the product
    const product = await productModel.findByIdAndUpdate(
      {
        name: req.body.name,      req.params.id,

        description: req.body.description,
        richDescription: req.body.richDescription,
        Image: req.body.Image,
        images: req.body.images,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
      },
      { new: true }
    );
    if (!product) return res.status(404).send("product cannot be updated");
    return res.status(200).send({
      success: true,
      message: "product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};

// delete a product
const deleteProduct = (req, res) => {
  try {
 productModel
      .findByIdAndRemove(req.params.id)
      .then((product) => {
        if (product) {
          res
            .status(200)
            .json({ sucess: true, message: "product deleted successfully" });
        } else {
          return res
            .status(404)
            .json({ sucess: false, message: "product not found" });
        }
      })
      .catch((err) => {
        return res.status(400).json({ sucess: false, err });
      });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      error,
    });
  }
};

// To show to the admin products in the store
const getproductCount = async (req, res) => {
  try {
    const productCount = await productModel.countDocuments((count) => count);
    if (!productCount) {
      return res.status(500).send({ success: false });
    }

   return res.status(200).send({
      productCount: productCount,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      error,
    });
  }
};

// to get featured product in the store

const getFeaturedProduct = async (req, res) => {
  try {
    const products = await productModel.find({ isFeatured: true });
    if (!products) {
      return res.status(500).send({ success: false });
    }
    return res.status(200).send(products);
  } catch (error) {
    res.status(500).json({
      sucess: false,
      error,
    });
  }
};

// To display a certain number of featured product and not all in the homepage
const numberOfFeaturedProducts = async (req, res) => {
  try {
    const count = req.params.count ? req.params.count : 0;
    const products = await productModel.find({ isFeatured: true }).limit(+count);
    if (!products) {
      return res.status(500).send({ success: false });
    }
    return res.status(200).send(products);
  } catch (error) {
    res.status(500).json({
      sucess: false,
      error,
    });
  }
};


// to filter by category
const filterByCategory = async (req, res) => {
    try {
        //localhost:3000/api/v1/products?categories="2447474794ujfkforurf"
        let filter = {}
        if(req.params.categories){
            filter = {category:req.query.categories.split(',')}
        }
      const productList = await productModel
        .find(filter)
        
      if (!productList) {
        return res
          .status(404)
          .json({ sucess: false, message: "products not found" });
      }
      return res.send(productList);
    } catch (error) {
      res.status(500).send({ success: false, error });
    }
  };


module.exports = {
  getAllProducts,
  createProduct,
  getAProduct,
  updateProduct,
  deleteProduct,
  getproductCount,
  getFeaturedProduct,
  numberOfFeaturedProducts,
  filterByCategory
};
