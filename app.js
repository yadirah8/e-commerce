const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routerUser = require("./resources/users/user.service");
const routerAuth = require("./router/auth");
const routerProduct = require("./resources/product/product.service");
const routerCart = require("./resources/cart/cart.service");
const routerOrder = require("./resources/orders/order.service");
const routerCheckout = require("./router/stripe");
const cors = require("cors");
const validateEnv = require("./config/validate");

const app = express();
dotenv.config();

validateEnv();
app.use(cors());
app.use(express.json());
app.use("/api/auth", routerAuth);
app.use("/api/users", routerUser);
app.use("/api/products", routerProduct);
app.use("/api/carts", routerCart);
app.use("/api/orders", routerOrder);
app.use("/api/checkout", routerCheckout);

const { DATABASE_NAME, DATABASE_URL, PORT } = process.env;

mongoose
  .connect(`${DATABASE_URL}/${DATABASE_NAME}`)
  .then(() => console.log("MONGODB CONNECTED"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
