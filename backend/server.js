
const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Online Food Ordering Backend is running!");
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend is running successfully",
  });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
