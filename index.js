const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: ".env" });

app.use(require("./src/router/route"));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
const corsAllow = {
  origin: "*",
  method: "PUT,GET,PATCH,DELETE,POST",
  credentials: true,
};

app.use(cors(corsAllow));
app.get("/", (req, res) => {
  res.send("hello");
});
app.listen(3000 || process.env.PORT, (err) => {
  console.log(`server running on ${PORT}`);
});
