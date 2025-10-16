const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true },
  marks: { type: Number, required: true, min: 0, max: 100 },
  examType: { type: String, default: 'regular' }, // e.g., 'midterm', 'final', 'regular'
  date: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Result', resultSchema);
