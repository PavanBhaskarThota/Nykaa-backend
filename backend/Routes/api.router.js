const express = require("express");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../Models/user.model");
const { ProductModel } = require("../Models/products.model");

const apiRouter = express.Router();

apiRouter.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existUser = await UserModel.findOne({ email });
    if (existUser) {
      return res.status(200).send("This email is already register");
    }
    bcrypt.hash(password, 5, async (err, hash) => {
      req.body.password = hash;
      const user = new UserModel(req.body);
      await user.save();
      res.status(200).send({ msg: "new user has add", Username: user.name });
    });
  } catch (error) {
    res.status(400).send({ err: error });
  }
});

apiRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { userId: user._id, username: user.name },
            process.env.tokenKey
          );

          res.status(200).send({ msg: "Login Successfull", token: token });
        } else {
          res.status(200).send({ msg: "Wrong Password or Credentials!" });
        }
      });
    } else {
      res
        .status(200)
        .send({ msg: "User dose not exist with this email please Register!" });
    }
  } catch (error) {
    res.status(400).send({ err: error });
  }
});

apiRouter.get("/products", async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).send({ products: products });
  } catch (error) {
    res.status(400).send({ err: error });
  }
});

apiRouter.post("/products", async (req, res) => {
  try {
    const product = new ProductModel(req.body);
    await product.save();
    res.status(200).send({ msg: "new product has added" });
  } catch (error) {
    res.status(400).send({ err: error });
  }
});

apiRouter.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findOne({ _id: id });

    if (req.body.userId === product.userId) {
      await ProductModel.findByIdAndUpdate({ _id: id }, req.body);
      res.status(200).send({ msg: "product has updated" });
    } else {
      res.status(200).send({ msg: "you can not edit this product" });
    }
  } catch (error) {
    res.status(400).send({ err: error });
  }
});

apiRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findOne({ _id: id });

    if (req.body.userId === product.userId) {
      await ProductModel.findByIdAndDelete({ _id: id });
      res.status(200).send({ msg: "product has Deleted" });
    } else {
      res.status(200).send({ msg: "you can not delete this product" });
    }
  } catch (error) {
    res.status(400).send({ err: error });
  }
});
module.exports = { apiRouter };
