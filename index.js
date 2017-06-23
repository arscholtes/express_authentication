//This top section gets our express/JS file ready with all the tools we will need to create our application
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

//Here is where the usernames and corresponding passwords are stored
app.use(function(req, res, next) {
  req.session.users = {
    Edwin: "bacon1",
    Jon: "cheese",
    Josh: "apple"
  };

  next();//callback
});
//Here if we find in out app.post function that the username provided matches the password that is stored with it we post hello... if not we send the user back to the login page
app.get('/', function(req, res, next) {
  if (req.session.username) {
    console.log(req.session.username);
    res.send("Hello " + req.session.username)
  } else {
    res.redirect("/login")
  }
});
//Here we match the /login page with index
app.get("/login", function(req, res, next) {
  res.render("index");
})
//This app.post is checking to see if the username is stored on our server as well as check the password to see if it matches it, if it does it sends that to the function above that will display hello...
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

//This opens up our application to port 3000 so that we can npm start and go to localhost, otherwise it will give us an error
app.listen(3000, () => console.log("Good to go"));
