require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const usersModel = require("./models/Users");
const adminModel = require("./models/Admin");
// const Router=require('/routes')
const cors = require("cors");

const userRouter = require("./routes/userRoutes");
const adminRouter = require("./routes/adminRoutes");

app.use(cors());
app.use(express.json());

app.use("/", userRouter);
app.use("/admin", adminRouter);

mongoose
  .connect("mongodb://0.0.0.0:27017/test", {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.error(error);
  });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () { console.log('Connection to MongoDB established successfully!'); });
// module.exports = db;

// console.log("Hello")
app.listen(process.env.PORT, () => {
  console.log("Express running on Post 3002");
});
