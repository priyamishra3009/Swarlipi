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

app.get("/team", (req, res) => {
  // var page = req.params.page;
   res.render("team.ejs");
});

app.get("/opportunity", (req, res) => {
  // var page1 = req.params.page1;
  res.render("opportunity.ejs");
});

app.get("/volunteer", (req, res) => {
  // var page1 = req.params.page1;
  res.render("volunteer.ejs");
});

app.get("/courses", (req, res) => {
  // var page1 = req.params.page1;
  res.render("courses.ejs");
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

app.get("/signup1",(req, res) =>{
  res.render("signup1.ejs");
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


// const axios = require("axios");

// const encodedParams = new URLSearchParams();
// encodedParams.append("clientid", "111");
// encodedParams.append("txn_id", "985656");
// encodedParams.append("method", "getcaptcha");

// const options = {
//   method: 'POST',
//   url: 'https://aadhaar-number-verification.p.rapidapi.com/Uidverifywebsvcv1/Getcaptcha',
//   headers: {
//     'content-type': 'application/x-www-form-urlencoded',
//     'X-RapidAPI-Key': '2bc5d47c25msh09f83a68770cc17p1ec3b3jsn5c1dbd03a8f7',
//     'X-RapidAPI-Host': 'aadhaar-number-verification.p.rapidapi.com'
//   },
//   data: encodedParams
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });

// const axios = require("axios");

// const encodedParams = new URLSearchParams();
// encodedParams.append("captchaValue", "TK6HXq");
// encodedParams.append("captchaTxnId", "58p5MxkQrNFp");
// encodedParams.append("method", "uidvalidate");
// encodedParams.append("clientid", "111");
// encodedParams.append("txn_id", "4545533");
// encodedParams.append("consent", "Y");
// encodedParams.append("uidnumber", "<REQUIRED>");

// const options = {
//   method: 'POST',
//   url: 'https://aadhaar-number-verification.p.rapidapi.com/Uidverifywebsvcv1/Uidverify',
//   headers: {
//     'content-type': 'application/x-www-form-urlencoded',
//     'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
//     'X-RapidAPI-Host': 'aadhaar-number-verification.p.rapidapi.com'
//   },
//   data: encodedParams
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });

// const axios = require("axios");

// const encodedParams = new URLSearchParams();
// encodedParams.append("clientid", "111");
// encodedParams.append("captchaTxnId", "yXtIGGqKoOai");
// encodedParams.append("txn_id", "4545533");
// encodedParams.append("consent", "Y");
// encodedParams.append("captchaValue", "0u2KyH");
// encodedParams.append("method", "emailnmobile");
// encodedParams.append("uidnumber", "<REQUIRED>");

// const options = {
//   method: 'POST',
//   url: 'https://aadhaar-number-verification.p.rapidapi.com/Uidverifywebsvcv1/UidVerifyEmailMobile',
//   headers: {
//     'content-type': 'application/x-www-form-urlencoded',
//     'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
//     'X-RapidAPI-Host': 'aadhaar-number-verification.p.rapidapi.com'
//   },
//   data: encodedParams
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });