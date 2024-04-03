const mongoose = require("mongoose");
require("dotenv").config();
// const mongoose = require(Mongoose);

const conn = async (req, res) => {
  await mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log(`Connected to MongoDB`))
    .catch((err) => console.error(`Error connecting to MongoDB: ${err}`));
};

conn();
