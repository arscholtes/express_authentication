const express = require("express");
const app = express();
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", "./views");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use("views", express.static("/views"));
app.use(expressValidator());

var views = reg.session.views || {}

const userInfo = {
  username: "username",
  password: "password"
}

const data = {

}

app.get("/", function(req, res) {
  res.render('login', data);
});


app.post('/',function(req, res) {
  console.log(req.body);
  res.redirect('/');
})


app.listen(3000, () => console.log("Good to go"));
