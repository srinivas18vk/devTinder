const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const mongoose = require("mongoose");

app.use("/", (req, res) => {
  console.log("iuktavufyatf iaufa iufga ifug aiut");
  res.send("<h1>Hello World!!!!!!</h1>");
});

// Database Connection
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("App connected to devTinder Db");
  })
  .catch((err) => {
    console.log("Error connecting to the Db", err);
  });

//Server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
