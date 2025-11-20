import mongoose from 'mongoose';

const timetableSchema = new mongoose.Schema({
  class: { type: String, required: true },
  day: { type: String, required: true, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
  subject: { type: String, required: true },
  time: { type: String, required: true }, // e.g., "9:00 AM - 10:00 AM"
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export default mongoose.model('Timetable', timetableSchema);
