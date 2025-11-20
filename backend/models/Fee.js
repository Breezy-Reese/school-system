import mongoose from 'mongoose';

const feeSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['paid', 'unpaid'], default: 'unpaid' },
  description: { type: String },
}, { timestamps: true });

export default mongoose.model('Fee', feeSchema);
