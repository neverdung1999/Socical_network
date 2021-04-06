const path = require("path");
const express = require("express");
const app = express();
const morgan = require("morgan");
const port = 9999;
const handlebars = require("express-handlebars");
const route = require("./routers");
const bodyParser = require("body-parser");
const db = require("./config/index")
const cors = require("cors");
const cookieParser = require("cookie-parser");

//connect db 
db.connect();

app.use(cookieParser());

app.use(morgan("combined"));

app.use(cors());

app.engine("handlebars", handlebars());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "resources/views"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

route(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
