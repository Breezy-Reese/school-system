const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['paid', 'unpaid'], default: 'unpaid' },
  description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Fee', feeSchema);
