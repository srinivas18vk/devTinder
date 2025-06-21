const express = require("express");
const app = express();
const PORT = 2025;

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});
console.log("Server is running on port " + PORT);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
