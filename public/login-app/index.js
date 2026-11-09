
// Make sure these are near the top
app.use(express.json());          // ← very important – parses JSON from frontend

// Add this route (adjust the logic to your needs)
app.post('/login', async (req, res) => {
  try {
    console.log('Someone tried to login:', req.body);   // ← will show in terminal

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // TODO: Replace with real MongoDB lookup + bcrypt compare
    // For testing right now:
    if (email === 'consultant.123@velyon.con' && password === 'test123') {
      return res.json({ success: true, message: 'Login successful' });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    console.error('Login route crashed:', err);
    res.status(500).json({ message: 'Server error – check terminal' });
  }
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('MongoDB connection FAILED:', err));

  // Example of correct client-side fetch (replace your current fetch code)

 