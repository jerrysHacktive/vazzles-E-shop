/** @format */

const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  richDescription: {
    type: String,
    default: "",
  },
  Image: {
    type: String,
    default: "",
  },
  images: [
    {
      type: String,
    },
  ],
  brand: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    default: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    require: true,
  },
  countInStock: {
    type: Number,
    require: true,
    min: 0,
    max: 255,
  },
  rating: {
    type: Number,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

// TO MAKE THE _ID ONLY ID SO I CAN USE IT EVERYWHERE IN MY APPLICATION
productSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

//we need to enable some options to send some values to the front end bcos this is a virtual field,its  more front end friendly
productSchema.set("toJSON", {
  virtualS: true,
});

exports.product = mongoose.model("products", productSchema);
