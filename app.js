// app.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 8080;

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB URI from environment variable (configured in Kubernetes)
const mongoURI = process.env.MONGO_URI || "mongodb://root:rootpassword@mongo:27017";

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Error connecting to MongoDB:', error));

// Define a simple schema and model for MongoDB
const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true }
});

const Item = mongoose.model('Item', ItemSchema);

// Define a basic route to check if the app is running
app.get('/', (req, res) => {
  res.send('Hello from MongoDB-powered Node.js app!');
});

// Route to add an item to MongoDB
app.post('/add', async (req, res) => {
  const { name, description } = req.body;
  const newItem = new Item({ name, description });

  try {
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add item' });
  }
});

// Route to get all items from MongoDB
app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
