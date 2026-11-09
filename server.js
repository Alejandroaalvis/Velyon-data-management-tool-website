const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const PORT = 3000;
const app = express();

// ────────────────────────────────────────────────
// 1. Middleware – only once, in the correct order
// ────────────────────────────────────────────────
app.use(express.json());                          // parses JSON bodies
app.use(express.urlencoded({ extended: true }));  // parses form-urlencoded (optional but useful)
app.use(cors());                                  // allow frontend requests (you can restrict origin later)
app.use(express.static(path.join(__dirname, 'public'))); // serve static files (HTML, CSS, JS)

// ────────────────────────────────────────────────
// 2. MongoDB connection
// ────────────────────────────────────────────────
const mongoURI = 'mongodb+srv://velyon1234:westlondon@cluster0.wcjvrtf.mongodb.net/velyon?retryWrites=true&w=majority';

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// ────────────────────────────────────────────────
// 3. User model
// ────────────────────────────────────────────────
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// ────────────────────────────────────────────────
// 4. Routes
// ────────────────────────────────────────────────

// Debug route – check if server responds at all
app.get('/debug-alive', (req, res) => {
  res.json({
    status: "server is alive",
    time: new Date().toISOString(),
    message: "If you see this → server is running correctly"
  });
});

// Login route (temporary safe version – no crash)
app.post('/login', async (req, res) => {
  console.log('[LOGIN] Route hit');
  console.log('[LOGIN] Content-Type:', req.headers['content-type']);
  console.log('[LOGIN] Body:', req.body);

  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // ── Real login logic can go here later ──
    // Example placeholder:
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // For now just return success (add bcrypt later)
    return res.status(200).json({
      message: 'Login successful (placeholder)',
      email: user.email
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Server error during login' });
  }
});

// ────────────────────────────────────────────────
// 5. Global error handler – very useful for seeing real 500 causes
// ────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('SERVER ERROR ──────────────────────────────');
  console.error('URL:     ', req.method, req.originalUrl);
  console.error('Message: ', err.message);
  console.error('Stack:   ', err.stack);
  console.error('───────────────────────────────────────────');

  res.status(500).json({
    error: 'Internal server error – check server console'
  });
});

// ────────────────────────────────────────────────
// 6. Start server
// ────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

console.log('MONGO_URI:', process.env.MONGO_URI || process.env.MONGODB_URI || 'NOT SET!');