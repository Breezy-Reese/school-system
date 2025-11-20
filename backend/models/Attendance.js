import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['present', 'absent'], required: true },
  class: { type: String }, // optional, if needed
}, { timestamps: true });

export default mongoose.model('Attendance', attendanceSchema);
