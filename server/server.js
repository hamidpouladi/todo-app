require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const todoRoutes = require("./routes/todos");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/", todoRoutes);

const PORT = process.env.PORT || 5001;

(async function connect() {
  try {
    mongoose.Promise = global.Promise;
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  } catch (err) {
    console.log("Mongoose error", err);
  }
  app.listen(PORT, (error) => {
    if (error) {
      throw error;
    }
    console.log(`API listening on localhost:${PORT}`);
  });
})();
