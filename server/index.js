require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.port || 5005;
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE_URL, { useNewUrlParser: true })
  .then((res) => console.log("CONNECT SUCCESS"))
  .catch((err) => console.log("ERROR"));

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
const commentRoutes = require("./routes/router");
const { addAllComment } = require("./controllers/commentController");
app.use("/comment", commentRoutes);

addAllComment();

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
