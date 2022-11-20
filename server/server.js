require("dotenv").config();
const express = require("express");
const bcrypt = require('bcryptjs')
const path = require("path")
const app = express()
const testRouter = require("./routes/testRoutes");
const productRouter = require("./routes/productRoutes")
const userRouter = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
const User = require("./models/user");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((err) => console.log(err));
app.use(express.json());
/*************the code below is for local strategy passport******************************** */
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 3600000000 }, //in milliseconds
  })
);//session initialisation
app.use(cookieParser("secretcode"));// getting the cookie from browser
//Middleware
app.use(flash());
app.use(passport.initialize()); // init passport on every route call
app.use(passport.session()); //allow passport to use "express-session"

authUser = (userEmailPhone, password, done) => {
  console.log(`Value of "User" in authUser function ----> ${userEmailPhone}`); //passport will populate, user = req.body.username
  console.log(`Value of "Password" in authUser function ----> ${password}`); //passport will populate, password = req.body.password

  // Use the "user" and "password" to search the DB and match user/password to authenticate the user
  // 1. If the user not found, done (null, false)
  // 2. If the password does not match, done (null, false)
  // 3. If user found and password match, done (null, user)

  User.findOne(
    {
      email: userEmailPhone,
    },
    async function (err, user) {
      let password_test;
      if (user) {
       
        password_test = await bcrypt.compare(password, user.password);
        console.log("test",password_test)
       
      }
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, "mail", {
          type: "login",
          message: "That email is already taken",
        });
      }
      if (!password_test) {
        return done(null, "password", {
          type: "login",
          message: "That email is already taken",
        });
      }
      return done(null, user);
    }
  );
};
passport.use(new LocalStrategy(authUser));
/*******************************************************/

passport.serializeUser((user, done) => {
  console.log(`--------> Serialize User`);
  console.log(user);
  return done(null, user.id);

  // Passport will pass the authenticated_user to serializeUser as "user"
  // This is the USER object from the done() in auth function
  // Now attach using done (null, user.id) tie this user to the req.session.passport.user = {id: user.id},
  // so that it is tied to the session object
});

passport.deserializeUser(async (id, done) => {
  try {
    console.log("---------> Deserialize Id");
    const user = await User.findOne({ _id: id })

    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (err) {
    return done(null, err);
  }
  // This is the id that is saved in req.session.passport.{ user: "id"} during the serialization
  // use the id to find the user in the DB and get the user object with user details
  // pass the USER object in the done() of the de-serializer
  // this USER object is attached to the "req.user", and can be used anywhere in the App.
});

//Middleware to see how the params are populated by Passport

/************************************************************* */
//Middleware to see how the params are populated by Passport
//Middleware to see how the params are populated by Passport
let count = 1;

printData = (req, res, next) => {
  console.log("\n==============================");
  console.log(`------------>  ${count++}`);

  console.log(`req.body.username -------> ${req.body.username}`);
  console.log(`req.body.password -------> ${req.body.password}`);

  console.log(`\n req.session.passport -------> `);
  console.log(req.session.passport);

  console.log(`\n req.user -------> `);
  console.log(req.user);

  console.log("\n Session and Cookie");
  console.log(`req.session.id -------> ${req.session.id}`);
  console.log(`req.session.cookie -------> `);
  console.log(req.session.cookie);

  console.log("===========================================\n");

  next();
};

app.use(printData); //user printData function as middleware to print populated variables
app.use("/test", testRouter);
app.use("/products",productRouter)
app.use("/users",userRouter)
app.use("/uploads",express.static(path.join(__dirname,"uploads")))
console.log(process.env.PORT);
app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
