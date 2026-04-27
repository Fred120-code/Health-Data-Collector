import app from "./server.js";

const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  console.log(`📊 POST /data - Add health data`);
  console.log(`📋 GET /data - Get all data`);
  console.log(`📈 GET /regression - Calculate regression`);
});
