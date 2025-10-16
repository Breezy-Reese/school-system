const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: ['student', 'teacher', 'admin', 'parent'] },
  class: { type: String }, // for students
  subject: { type: String }, // for teachers
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // for students, link to parent
  // Add other fields as needed
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
