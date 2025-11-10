
const mongoose = require('mongoose');

const storageSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  data: { type: Object, default: {} }, 
}, { timestamps: true });

module.exports = mongoose.model('Storage', storageSchema);
