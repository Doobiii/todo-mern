const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 1000;
const auth = require("./routes/auth");
const list = require("./routes/list");

require("./connection/conn");

app.use(express.json());
app.use(cors(
  {
    origin:["https://todo-mern-orpin.vercel.app"],
    methods:["POST","GET"],
    credentials:true
  }
));
// app.get("/", (req, res) => {
//   res.send("hi");
// });

app.use("/api/v1", auth);
app.use("/api/v2", list);

app.listen(1000, () => {
  console.log("Server connected to 1000");
});
