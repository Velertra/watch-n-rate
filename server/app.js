const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cors = require("cors");
const userRoute = require("./route/userRoute");
const featureRouter = require("./route/featureRoute");
const reviewRouter = require("./route/reviewRoute");
const commentRouter = require("./route/commentRoute");
const diffUser = require("./model/userModel");
const userController = require("./controllers/userController");
const User = require("./model/userModel");
const verifyToken = require("./middleware/requireAuth");

require('dotenv').config()

//cFhw47Gl4WEjnOYR

const mongoDb = process.env.DATABASE_URI;
mongoose.connect(mongoDb);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

passport.use(
  new LocalStrategy(async (username, password, done) => {
      console.log("passport happened")
    try {
      const user = await User.findOne({ username: username });
      
      if (!user) {
          console.log("didnt find user")
        return done(null, false, { message: "Incorrect username" });
      };
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      };
      return done(null, user);
    } catch(err) {
      return done(err);
    };
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch(err) {
    done(err);
  };
});



const app = express();
app.use(express.json());
app.set("views", __dirname);
app.set("view engine", "ejs");

app.use(session({ secret: "dogs", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use('*', cors())

app.use("/", userRoute);
app.use("/", reviewRouter);
app.use("/", commentRouter);
app.use("/feature", featureRouter);

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});


app.get("/", (req, res) => {
    res.render("index", { user: req.user });
});



app.listen(3000, () => console.log("app listening on port 3000!"));

module.exports = { app };