import axios from "axios" ;

const API_KEY = process.env.APCA_API_KEY_ID;
const SECRET_KEY = process.env.APCA_API_SECRET_KEY;
const BASE_URL = "https://paper-api.alpaca.markets/v2/account";

export async function getAlpacaAccount() {
  console.log(API_KEY);
  
  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        "APCA-API-KEY-ID": API_KEY,
        "APCA-API-SECRET-KEY": SECRET_KEY,
      },
    });
    
    console.log("Account Data:", response.data);
    console.log("Request ID:", response.headers["x-request-id"]);
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
}

