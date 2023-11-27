// Redesigned ProductModel to support multiple categories

const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
      trim: true,
  },
  price: {
      type: Number,
      required: true,
  },
  description: {
      type: String,
      required: true,
      trim: true,
  },
  categories: [
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category",
          required: true,
      },
  ],
  photoUrl: {
      type: String,
      required: true,
  },
  rating: {
      type: Number,
      default: null,
  },
  owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Replace "User" with the actual model name for the user
      required: true,
  },
  stock: {
    type: Number,
    default: 1
  }
});
mongoose.model("ProductModel", productSchema);
