
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Storage = require('./models/storage');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

app.post('/api/storage', async (req, res) => {
  try {
    const { email, data } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const newEntry = new Storage({ email, data });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/storage', async (req, res) => {
  try {
    const entries = await Storage.find();
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/storage/:email', async (req, res) => {
  try {
    const entry = await Storage.findOne({ email: req.params.email });
    if (!entry) return res.status(404).json({ error: 'Entry not found' });
    res.json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/storage/:email', async (req, res) => {
  try {
    const entry = await Storage.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true, runValidators: true }
    );
    if (!entry) return res.status(404).json({ error: 'Entry not found' });
    res.json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
