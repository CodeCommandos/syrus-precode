const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  transaction_id: { type: String, required: true, unique: true },
  user_id: { type: String, required: true },
  stock_id: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  transaction_type: { type: String, required: true },
  date: { type: Date, required: true },
});

export const Transaction = mongoose.model("Transaction",transactionSchema)