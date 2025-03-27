import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user_model.js";
import Alpaca from "@alpacahq/alpaca-trade-api";

export const buyAsset = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { assetId, quantity, price, isCrypto } = req.body;

  try {
    if (!assetId || !quantity || !price || isCrypto === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const totalCost = price * quantity;
    if (user.balance < totalCost) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    user.balance -= totalCost;

    const assetIndex = user.portfolio.findIndex(
      (asset) => asset.asset_id === assetId
    );

    if (assetIndex !== -1) {
      user.portfolio[assetIndex].quantity += quantity;
      user.portfolio[assetIndex].purchase_price = price;
    } else {
      user.portfolio.push({
        asset_id: assetId,
        quantity,
        purchase_price: price,
        is_crypto: isCrypto,
      });
    }

    user.transaction_history.push({
      transaction_id: `txn-${Date.now()}`,
      asset_id: assetId,
      quantity,
      price,
      transaction_type: "buy",
      date: new Date(),
    });

    await user.save();

    res.status(200).json({ message: "Asset purchased successfully", user });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Invalid input" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

export const sellAsset = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { assetId, quantity, price } = req.body;

  try {
    if (!assetId || !quantity || !price) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const assetIndex = user.portfolio.findIndex(
      (asset) => asset.asset_id === assetId
    );

    if (assetIndex === -1) {
      return res.status(404).json({ message: "Asset not found in portfolio" });
    }

    if (user.portfolio[assetIndex].quantity < quantity) {
      return res.status(400).json({ message: "Insufficient asset quantity" });
    }

    user.portfolio[assetIndex].quantity -= quantity;
    if (user.portfolio[assetIndex].quantity === 0) {
      user.portfolio.splice(assetIndex, 1);
    }

    const totalSaleAmount = price * quantity;
    user.balance += totalSaleAmount;

    user.transaction_history.push({
      transaction_id: `txn-${Date.now()}`,
      asset_id: assetId,
      quantity,
      price,
      transaction_type: "sell",
      date: new Date(),
    });

    await user.save();

    res.status(200).json({ message: "Asset sold successfully", user });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Invalid input" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

export const getBalance = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId).select("balance");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ balance: user.balance });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Invalid input" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

export const getAllAssets = asyncHandler(async (req, res) => {
  try {
    const alpaca = new Alpaca({
      keyId: process.env.ALPACA_API_KEY,
      secretKey: process.env.ALPACA_API_SECRET,
      paper: true, 
    });
    const assets = await alpaca.getAssets();
    const stocks = assets.filter((asset) => asset.class === "us_equity").slice(0,20);
    const cryptos = assets.filter((asset) => asset.class === "crypto").slice(0,20);
    res.status(200).json({ stocks, cryptos });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching assets", error: error.message });
  }
});
