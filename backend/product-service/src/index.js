require("dotenv").config();
const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/product.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "product-service ok" }));
app.use("/api/products", productRoutes);
app.use("/", (req, res) => res.send("you are in product service"));
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Product service running on port ${PORT}`));
