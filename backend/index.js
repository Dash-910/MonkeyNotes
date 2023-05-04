const connectToMongo = require("./db");
const express = require("express");
var cors = require('cors');
connectToMongo();

const app = express();
const port = 5000;
app.use(cors())
// we are adding the express.json() middleware function to the middleware stack for all routes. This means that any incoming requests with a JSON payload will be automatically parsed by this middleware function.
app.use(express.json());

//app.use middleware defined in Routes with more requests functions
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

//Port should continously listen,so it can server any incomeing requests
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
