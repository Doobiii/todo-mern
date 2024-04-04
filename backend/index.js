const express = require("express");
const app = express();
require("dotenv").config();

const cors = require("cors");
const PORT = process.env.PORT || 4000;
const auth = require("./routes/auth");
const list = require("./routes/list");

require("./connection/conn");

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("hi");
});

app.use("/api/v1", auth);
app.use("/api/v2", list);

app.listen(PORT, () => {
  console.log(`Server connected to ${PORT}`);
});
