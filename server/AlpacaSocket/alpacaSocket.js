import WebSocket from "ws";

const { APCA_API_STREAM_URL, APCA_API_KEY_ID, APCA_API_SECRET_KEY } =
  process.env;

// Function to connect to Alpaca WebSocket
function connectToNewsStream() {
  const ws = new WebSocket(APCA_API_STREAM_URL);

  ws.on("open", () => {
    console.log("🔗 Connected to Alpaca News Stream");

    ws.send(
      JSON.stringify({
        action: "auth",
        key: APCA_API_KEY_ID,
        secret: APCA_API_SECRET_KEY,
      })
    );

    ws.send(JSON.stringify({ action: "subscribe", news: ["*"] }));
  });

  ws.on("message", (data) => {
    const messages = JSON.parse(data.toString());
    console.log("📩 Raw Message:", messages);

    messages.forEach((msg) => {
      if (msg.T === "subscription") {
        console.log("🎯 Subscribed to news:", msg.news);
      }
    });
  });


  ws.on("error", (error) => {
    console.error("❌ WebSocket Error:", error);
  });

  ws.on("close", () => {
    console.log("🔌 WebSocket connection closed. Reconnecting in 5s...");
    setTimeout(connectToNewsStream, 5000); // Auto-reconnect after 5 seconds
  });
}

// Automatically start WebSocket on import
connectToNewsStream();
