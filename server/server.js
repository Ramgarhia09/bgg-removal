import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/mongodb.js';

// App config
const PORT = process.env.PORT || 4000;

// Initialize Express app
const app = express();

// Connect to MongoDB
(async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the application if the database connection fails
  }
})();

// Middleware
app.use(express.json());
app.use(cors());

// API routes
app.get('/', (req, res) => res.send('API working'));

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
