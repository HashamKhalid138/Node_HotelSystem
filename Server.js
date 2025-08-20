var express = require("express");
var app = express();
var db = require("./db.js");
require('dotenv').config();

var bodyparser = require("body-parser");
app.use(bodyparser.json());

const Port=process.env.PORT || 3000;
var PersonRoutes = require('./routes/PersonRoutes.js');
var MenuItemRoutes = require('./routes/MenuItemRoutes.js');

app.use('/person',PersonRoutes);
app.use('/menuItems',MenuItemRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to our Hotel");
});

app.listen(Port, () => {
  console.log("Server is listening on port 3000");
});
