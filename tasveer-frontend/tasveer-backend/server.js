const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ================= FAKE DATABASE =================
let users = [];
let photographers = [];
let bookings = [];

// ================= AUTH =================

// SIGNUP
app.post("/api/auth/signup", (req, res) => {
  const newUser = {
    id: Date.now(),
    ...req.body
  };

  users.push(newUser);
  res.json(newUser);
});

// LOGIN
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }

  res.json(user);
});

// ================= PHOTOGRAPHERS / STUDIOS =================

// ADD
app.post("/api/photographers", (req, res) => {
  const newItem = {
    id: Date.now(),
    ...req.body
  };

  photographers.push(newItem);
  res.json(newItem);
});

// GET ALL
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});
app.get("/api/photographers", (req, res) => {
  res.json(photographers);
});

// GET BY ID
app.get("/api/photographers/:id", (req, res) => {
  const item = photographers.find(
    (p) => String(p.id) === req.params.id
  );

  if (!item) {
    return res.status(404).json({ msg: "Not found" });
  }

  res.json(item);
});

// ================= PACKAGES =================

app.post("/api/photographers/:id/packages", (req, res) => {
  const photographer = photographers.find(
    (p) => String(p.id) === req.params.id
  );

  if (!photographer) {
    return res.status(404).json({ msg: "Not found" });
  }

  if (!photographer.packages) {
    photographer.packages = [];
  }

  const newPackage = {
    id: Date.now(),
    ...req.body
  };

  photographer.packages.push(newPackage);

  res.json(newPackage);
});

// ================= BOOKINGS =================

app.post("/api/bookings", (req, res) => {
  const booking = {
    id: Date.now(),
    status: "Pending",
    ...req.body
  };

  bookings.push(booking);
  res.json(booking);
});

app.get("/api/bookings", (req, res) => {
  res.json(bookings);
});

// ================= START SERVER =================

app.listen(5000, () => {
  console.log("🚀 Server running at http://localhost:5000");
});