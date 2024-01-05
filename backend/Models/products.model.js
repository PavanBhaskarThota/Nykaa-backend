// const mongoose = require("mongoose")

// const productSchema = mongoose.Schema({

//   name:String,
//   picture:String,
//   description:String,
//   gender:String,
//   category:String,
//   price:Number,
//   created_at:String,
//   updated_at:String
// },{versionkey:false})

// const ProductModel = mongoose.model("product", productSchema)

// module.exports={
//   ProductModel
// }

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 1, maxlength: 50 },
    picture: { type: String },
    description: { type: String },
    gender: { type: String, enum: ["male", "female"], required: true },
    category: {
      type: String,
      enum: ["makeup", "skincare", "haircare"],
      required: true,
    },
    price: { type: Number, required: true },
  },
  { timestamps: true },
  { versionKey: false }
);

const ProductModel = mongoose.model("Product", productSchema);

module.exports = { ProductModel };
