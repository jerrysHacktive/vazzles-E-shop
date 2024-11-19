/** @format */

const categoryModel = require("../models/category");

// to get all category

const getAllCategories = async (req, res) => {
  try {
    const categoryList = await categoryModel.find();
    if (!categoryList) {
      return res.status(500).json({ sucess: false });
    }
    res.send(categoryList);
  } catch (error) {
    res.status(500).json({
      sucess: false,
      error,
    });
  }
};

// to create a category

const createCategory = async (req, res) => {
  try {
    let category = new categoryModel({
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.icon,
    });
    category = await category.save();
    if (!category) {
      return res.status(404).send({
        sucess: false,
        message: "the category cannot be created",
      });
    }
    return res.status(201).send(category);
  } catch (error) {
    res.status(500).json({
      sucess: false,
      error,
    });
  }
};


// to get a single category

const getCategory = async (req, res) => {
    try {
      const category = await categoryModel.findById(req.params.id);
      if (!category) {
        return res.status(404).json({
          sucess: false,
          message: "the category with the given Id was not found",
        });
      }
      return res.status(200).send(category);
    } catch (error) {
      res.status(500).json({
        sucess: false,
        error,
      });
    }
  };
  

//update a category

const updateCategory = async () => {
    try {
      const category = await categoryModel.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          icon: req.body.icon,
          color: req.body.color,
        },
        { new: true }
      );
      if (!category) {
        return res.status(404).send({
          sucess: false,
          message: "the category cannot be updated",
        });
      }
      return res.status(201).send(category);
    } catch (error) {
      res.status(500).json({
        sucess: false,
        error,
      });
    }
  };


//to delete a category

const deleteCategory = async (req, res) => {
  try {
    await categoryModel
      .findByIdAndRemove(req.params.id)
      .then(category=> {
        if (category) {
          res
            .status(200)
            .json({ sucess: true, message: "category deleted successfully" });
        } else {
          return res
            .status(404)
            .json({ sucess: false, message: "category not found" });
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






module.exports={
getAllCategories,
createCategory,
getCategory,
updateCategory,
deleteCategory
}