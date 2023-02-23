const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();
const port = process.env.PORT || 4000;

// Mongoose Connection Setup
mongoose.connect(
  "mongodb+srv://michaelbajun:09225585319@224-oneza.yigp5un.mongodb.net/3rd-capstone-app?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

let db = mongoose.connection;

db.on("error", () => console.error("Connection error."));
db.once("open", () => console.log("Connected to MongoDB."));

// Middlewares
// Allows our frontend app to access our backend app.
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Main URI
app.use("/users", userRoutes);
app.use("/products", productRoutes);

app.listen(port, () => {
  console.log(`API is now running at port: ${port}`);
});
