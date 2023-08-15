cls
const express = require("express");
const mongoose = require("mongoose");
const ItemRouter = require("./routes/item-routes");
const UserRouter = require("./routes/user-routes");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
app.use(cookieParser())
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

// Middlewares
// app.use(express.json());
app.use(cors());
app.use("/items",ItemRouter); // localhost:5000/books
app.use("",UserRouter);// localhost:5000




app.get('/about',function(req,res){
  res.render('about',{Title:"About"})
})
app.get('/contact',function(req,res){
  res.render('contact',{Title:"Contact"})
})

// "mongodb://127.0.0.1:27017/DataBase"
mongoose
  .connect(
    "mongodb+srv://vishalreddy:keXh1O8u1pqSIMYm@cluster0.tu7rlwe.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected To Database"))
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));


// SQeYBDbpX2YFEcep