const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

// Connect to MongoDB
connectDB();

// Initialize middleware
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }))
app.use(
  cors()
);

// Routes
app.use("/api/domains", require("./routes/api/domains"));
app.use("/api/petTypes", require("./routes/api/petTypes"));
app.use("/api/petDescriptions", require("./routes/api/petDescriptions"));
app.use("/api/breeders", require("./routes/api/breeders"));
app.use("/api/liters", require("./routes/api/liters"));
app.use("/api/babies", require("./routes/api/babies"));
app.use("/api/reservations", require("./routes/api/reservations"));
// app.use("/api/users", require("./routes/api/old/users"));
// app.use("/api/customers", require("./routes/api/old/customers"));
// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
