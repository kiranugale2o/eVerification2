const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: ".env" });

app.use(require("./src/router/route"));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
const corsAllow = {
 origin: 'http://localhost:3000', // Frontend URL
  methods: 'PUT, GET, PATCH, DELETE, POST, OPTIONS',
  credentials: true, // Allows cookies and other credentials
  allowedHeaders: 'Content-Type, Authorization', // Allow these headers
};

app.use(cors(corsAllow));
app.options('*', cors(corsOptions)); // Enable preflight for all routes

app.get("/", (req, res) => {
  res.send("hello");
});
app.listen(3000 || process.env.PORT, (err) => {
  console.log(`server running on ${PORT}`);
});
