const express = require("express");
const Product = require("../models/product");
const productRouter = express.Router();
const upload = require("../utils/multer")
productRouter.post("/createProduct", async (req, res) => {
  try {
  
    const newProduct = await Product.create({});
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
productRouter.put("/updateProduct/:id", upload.single("image"), async (req, res) => {

    try {
      const {
        name,
        quantity,
       
      } = JSON.parse(req.body.info);
      const product = await Product.findById(req.params.id);
      if (product) {
        product.name = name || product.name;
        product.quantity = quantity || product.quantity;
        product.image = req?.file?.path || product.quantity;
        
       
        const updatedproduct = await Product.findByIdAndUpdate(req.params.id, {
          name: product.name,
          quantity: product.quantity,
          image :product.image
        });
        if (updatedproduct) {
          return res.json(updatedproduct);
        } else {
          return res.status(404).send({ message: "produit introuvable" });
        }
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "erreur serveur" });
    }
 
});
module.exports = productRouter;
