const mongoose = require("mongoose");

const express = require("express");
const bodyParser = require("body-parser");
const req = require("express/lib/request");
const { stringify } = require("nodemon/lib/utils");
const app = express();

const DB =
  "mongodb+srv://rajiv_546:Rajiv%40123@yeahboi.fz4z7.mongodb.net/yeahboii?retryWrites=true&w=majority";
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
  })
  .then(() => {
    console.log("connection sucessful");
  })
  .catch((err) => console.log("no connection"));

const admin = mongoose.Schema({
  password: String,
  email: String,
});

const mdb = mongoose.model("adminDetails", admin);
///////------------------///

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/admin", (req, res) => {
  res.render("admin.ejs");
});

// app.post("/admin1", (req, res) => {
//   var username = req.body.username;
//   var password = req.body.password;
//   console.log("username: " + username + " password: " + password);
//   res.redirect("/");
// });

app.post ("/register", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  console.log(password)
  var userName = req.body.username;
  var confirmPassword = req.body.confirm-password;
  var new_admin = new mdb({
    email: email,
    password: password,
  });

  new_admin.save((err, res) => {
    if (err) throw err;
    //  alert("Login Successfull");
    // FileSystem.unlinkSync(path.join(_dirname + "/upload/" + req.file.filename));
  });
  res.render("admin.ejs");
});
app.get("/signup",(req, res) =>{
  res.render("signup.ejs");
})
app.post("/login", (req, res) => {
  var userName = req.body.username;
  var password = req.body.password;
  // if(err) throw err;
  var query = { email: userName };
  mdb.find(query, (err, result) => {
    if (err) throw err;
    if (password == result[0].password) res.render("back.ejs");
  });
});
app.listen(5000, () => {
  console.log("server is running at 5000...");
});
