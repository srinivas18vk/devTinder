const express = require("express");
const app = express();
const morgan = require("morgan");
const User = require("./Models/userModel");

// console.log(`${process.env.ENV} Environment`);

app.use(morgan("dev"));

app.use(express.json());
// app.use("/", (req, res) => {
//   console.log("iuktavufyatf iaufa iufga ifug aiut");
//   res.send("<h1>Hello World!</h1>");
// });
// app.use("/", (req, res) => {
//   res.send("<h1>Hello World!</h1>");
// });

app.post("/createUser", async (req, res) => {
  try {
    console.log("req.body :", req.body);
    const user = await User.create(req.body);

    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }
    res.status(201).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    console.log(err);
  }
});

// app.use("/test", (req, res) => {
//   res.send("<h1>Korbo Lorbo Jeetbo re</h1>");
// });

// app.listen(PORT, () => {
//   console.log(`server is running on port ${PORT}`);
// });

module.exports = app;
