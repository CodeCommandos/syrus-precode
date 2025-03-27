import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    otpToVerify: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    profilePic: {
      type: String,
      default: "https://example.com/default-avatar.png",
    },
    role: {
      type: String,
    },
    bio: {
      type: String,
      maxlength: 150,
      default: "",
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    refreshToken: {
      type: String,
      default: null,
    },
    notifications: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Notification",
      default: [],
    },
    balance: { type: Number, required: true },
    portfolio: [
      {
        asset_id: { type: String, required: true }, 
        quantity: { type: Number, required: true },
        purchase_price: { type: Number, required: true },
        asset_type: { type: String, enum: ["stock", "crypto"], required: true }, 
      },
    ],
    transaction_history: [
      {
        transaction_id: { type: String, required: true },
        asset_id: { type: String, required: true }, 
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        transaction_type: {
          type: String,
          required: true,
          enum: ["BUY", "SELL", "TRANSFER"],
        }, 
        asset_type: { type: String, enum: ["stock", "crypto"], required: true }, 
        date: { type: Date, required: true },
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
