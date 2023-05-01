const connectToMongo = require("./db");
connectToMongo();

const express = require("express");
//var cors = require("cors");

const app = express();
const port = 3000;
app.get("/", async(req, res) => {
  res.send("Hello,connection check");
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
