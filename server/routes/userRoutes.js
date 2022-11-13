const express = require("express");
const User = require("../models/user");
const userRouter = express.Router();
const upload = require("../utils/multer");
const bcrypt = require('bcryptjs')
const {generateToken,authMiddleWare} = require('../utils/auth')
const { body, validationResult } = require("express-validator");
const { findOne, validate } = require("../models/product");
userRouter.post(
  "/createUser",
  body("email").isEmail().withMessage("mail not valid"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("password shouldn't be shorter than 8"),
  async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.mapped() });
      }
      const existUser = await User.findOne({ email });
      console.log(existUser)
      if (existUser) {
        return res.status(400).send({ msg: "user already exists" });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = User.create({
          name,
          email,
          password:hashedPassword,
        });
        res.status(200).send(newUser);
      }
    } catch (error) {
        console.log(error)
      res.status(500).send({ msg: "error" });
    }
  }
);
userRouter.put("/updateUser", upload.single("image"), async (req, res) => {
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
});
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
userRouter.get("/getUser/:id",authMiddleWare, async (req, res) => {
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
userRouter.post("/login",async(req,res)=>{
 const {email,password} = req.body 
 const user = await User.findOne({email})
 if(!user){
    return res.status(404).send({msg:"user doesn't exist"})
 }
 else{
 const validatePassword = await bcrypt.compare(password,user.password)
 
 if(validatePassword){
const token = generateToken(user)
return res.send({user:user, token:token})
 }else{
    return res.status(400).send({msg:"wrong password"})
 }}
})
module.exports = userRouter;
