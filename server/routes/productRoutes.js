const express = require("express");
const Product = require("../models/product");
const productRouter = express.Router();
const upload = require("../utils/multer")
productRouter.post("/createProduct", async (req, res) => {
  try {
  
    const newProduct = Product.create({});
    res.status(200).send(newProduct);
  } catch (error) {
    res.status(500).send({ msg: "error" });
  }
});
productRouter.get("/getProducts", async (req, res) => {
  try {
    const products = await Product.find();
    console.log(products?.length);
    if (products?.length > 0) {
      return res.status(200).send(products);
    } else {
      return res.status(404).send({ msg: "No products in database!" });
    }
  } catch (error) {
    res.status(500).send({ msg: "server error" });
  }
});
productRouter.delete("/deleteProduct/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.deleteOne({ _id: req.params.id });
    res.status(200).send({ msg: "success" });
  } catch (error) {
    return res.status(500).send({ msg: "server error" });
  }
});
productRouter.get("/getProduct/:id", async (req, res) => {
  try {
    const product = await Product.findOne({_id:req.params.id});
    if (product) {
      return res.status(200).send(product);
    } else {
      return res.status(404).send({ msg: "Produit introuvable" });
    }
  } catch (error) {
    res.status(500).send({ msg: "server error" });
  }
});
module.exports = productRouter;
