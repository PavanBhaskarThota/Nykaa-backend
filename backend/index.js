const express = require("express");
const { connection } = require("./dataBase/db");
const { apiRouter } = require("./Routes/api.router");
const { ProductModel } = require("./Models/products.model");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", apiRouter);

apiRouter.post("/products", async (req, res) => {
  try {
    const product = new ProductModel(req.body);
    await product.save();
    res.status(200).send({ msg: "new product has added" });
  } catch (error) {
    res.status(400).send({ err: error });
  }
});

app.get("/products", (req, res) => {
  try {
    res.status(200).send("server is wip");
  } catch (error) {
    res.status(400).send("not working");
  }
});

app.listen(4500, async () => {
  try {
    await connection;

    console.log("server is running at 4500 and db is connected");
  } catch (error) {}
});
