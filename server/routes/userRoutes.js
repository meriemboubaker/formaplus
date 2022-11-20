const express = require("express");
const User = require("../models/user");
const passport = require('passport')
const userRouter = express.Router();
const upload = require("../utils/multer");
const bcrypt = require('bcryptjs')
const {generateToken,authMiddleWare} = require('../utils/auth')
const { body, validationResult } = require("express-validator");
userRouter.post(
  "/register",
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
userRouter.put("/updateUser/:id", async (req, res) => {
  try {
    const { name, email,password ,oldpassword} = req.body;
    const user = await User.findById(req.params.id)
 if(user) { user.name = name ||user.name;
       user.email = email ||user.email;
      
     
        if (oldpassword){
          const validatePassword = await bcrypt.compare(oldpassword,user.password)
          if(validatePassword){
            user.password = await bcrypt.hash(password,10)
          }
          else{
            return res.status(401).send({msg:"wrong password"})
          }
        }//get old pazzssword , compare it to the database one and change it after user confirms
       // his identity
    const newUser = await User.findByIdAndUpdate(req.params.id, {
      name:user.name,
      email:user.email,
      password:user.password
    });
    return res.status(200).send(newUser);}
    else return res.status(404).send({msg:"user not found"})
  } catch (error) {
    console.log(error)
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
    console.log(req.params.id)
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
 const {email,password} = req.body.userInfo 
 console.log(req.body)
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
/***************Passport Routes**************** */

userRouter.post("/loginpassport", (req, res, next) => {
  passport.authenticate("local", { failureFlash: true }, (err, user, info) => {
    console.log(user)
    if (err) throw err;
    if (user === "mail")
      return res.status(400).send({ message: "utilisateur introuvable" });
    else if (user === "password")
      return res.status(401).send({ message: "Mot de passe erroné" });
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        console.log("login");
        return res
          .status(200)
          .send({
            message: "Successfully Authenticated",
            status: 200,
            user: req.user,
          });
      });
    }
  })(req, res, next);
});
userRouter.get("/user", (req, res) => {
  if (req.user) {
    return res.send({ status: 200, user: req.user, isAuth: true });
  } else
    return res.send({
      status: 401,
      msg: "Not authenticated!",
      isAuth: false,
      user: null,
    }); // The req.user stores the entire user that has been authenticated inside of it.
});
userRouter.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      console.log(err);
      return next(err);
    }

    res.status(200).send({ status: 200, msg: "user logged out!" });
  });
});
/********************************************** */
module.exports = userRouter;
