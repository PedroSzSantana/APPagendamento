const bodyParser = require("body-parser");
const express = require("express");
const routes = require("./routes/routes");
const MongoConnect = require("./db/mongo");
const SendNotification = require("./modules/SendNotified");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);
MongoConnect();
const PullTime = 5000;
setInterval(() => {
  SendNotification();
}, PullTime);
app.listen("8080", () => console.log("Server is running"));
