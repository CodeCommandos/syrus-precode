import Alpaca from "@alpacahq/alpaca-trade-api";

const info = {
  keyId: process.env.APCA_API_KEY_ID,
  secretKey: process.env.APCA_API_SECRET_KEY,
  paper: true,
};

const alpaca = new Alpaca(info);

export async function getAccountInfo() {
  try {
    const account = await alpaca.getAccount();

    if (account.trading_blocked) {
      console.log("❌ Account is currently restricted from trading.");
    }
    console.log(`💰 Buying Power: $${account.buying_power}`);
  } catch (error) {
    console.error("❌ Error fetching account info:", error.message);
  }
}


