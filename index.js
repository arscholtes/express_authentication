const express = require("express");
const mustacheExpress = require("mustache-express");
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", "./views");
app.use(express.static("/"));
app.use(bodyParser.urlencoded({
  extended: true
}))


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitalized: true
}));


app.use(function(req, res, next) {
  req.session.users = {
    Edwin: "bacon1",
    Jon: "cheese",
    Josh: "apple"
  };

  next();//callback
});

app.get('/', function(req, res, next) {
  if (req.session.username) {
    console.log(req.session.username);
    res.send("Hello " + req.session.username)
  } else {
    res.redirect("/login")
  }
});

app.get("/login", function(req, res, next) {
  res.render("index");
})

app.post('/login', function(req, res, next) {
  if (req.session.users[req.body.username] === req.body.password) {
    req.session.username = req.body.username;
  }
  res.redirect("/")
});



app.post('/', function(req, res, next) {
  if (req.session.users[req.body.username] === req.body.password) {
    res.send(!req.session.user)
  }
})


app.listen(3000, () => console.log("Good to go"));
