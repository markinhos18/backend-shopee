import Mongoose from "../../db.js";

const productSchema = new Mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    summary: String,
    inventory: Number,
    image: String,
  },
  {
    collection: "products",
    timestamps: true,
  }
);

export default Mongoose.model("products", productSchema, "products");
