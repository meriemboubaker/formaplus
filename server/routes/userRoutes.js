const express = require("express");
const User = require("../models/user");
const userRouter = express.Router();
const upload = require("../utils/multer");
userRouter.post("/createUser",upload.single("image"), async (req, res) => {
    try {
      const { name, email, password } = JSON.parse(req.body.info);
      console.log(req.file)
      const newUser = User.create({ name, 
        email, password,
      image:req?.file?.path });
      res.status(200).send(newUser);
    } catch (error) {
      res.status(500).send({ msg: "error" });
    }
  });
userRouter.put(
  "/updateUser",
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, description, quantity } = JSON.parse(req.body.info);
      console.log(req.file);
      const newUser = User.findByIdAndUpdate(req.params.id, {
        name,
        description,
        quantity,
        image: req?.file?.path,
      });
      res.status(200).send(newUser);
    } catch (error) {
      res.status(500).send({ msg: "error" });
    }
  }
);
userRouter.get("/getUsers", async (req, res) => {
  try {
    const users = await User.find();
    console.log(users?.length);
    if (users?.length > 0) {
      return res.status(200).send(Users);
    } else {
      return res.status(404).send({ msg: "No Users in database!" });
    }
  } catch (error) {
    res.status(500).send({ msg: "server error" });
  }
});
userRouter.delete("/deleteUser/:id", async (req, res) => {
  try {
    const deletedUser = await User.deleteOne({ _id: req.params.id });
    res.status(200).send({ msg: "success" });
  } catch (error) {
    return res.status(500).send({ msg: "server error" });
  }
});
userRouter.get("/getUser/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (user) {
      return res.status(200).send(user);
    } else {
      return res.status(404).send({ msg: "Produit introuvable" });
    }
  } catch (error) {
    res.status(500).send({ msg: "server error" });
  }
});
module.exports = userRouter;
