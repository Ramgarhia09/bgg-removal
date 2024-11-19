import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/mongodb.js';
import userRouter from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 4001;

// Connect to MongoDB
(async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
})();

// Middleware
app.use(express.json());
app.use(cors());

// API routes
app.get('/', (req, res) => res.send('API working'));
app.use('/api/user', userRouter)



app.post('/webhook', (req, res) => {
    
  const signature = req.headers['x-hub-signature-256'];
  const payload = JSON.stringify(req.body);

  const hmac = crypto.createHmac('sha256', GITHUB_SECRET);
  const digest = sha256=${hmac.update(payload).digest('hex')};

  if (signature !== digest) {
      console.error('Request signature did not match');
      return res.status(401).send('Unauthorized');
  }

  console.log('Webhook payload received:', req.body);
  res.status(200).send('Webhook received');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
