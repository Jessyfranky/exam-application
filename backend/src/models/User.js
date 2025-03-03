import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  selectedSubjects: [String],
  scores: [{ subject: String, score: Number }]
});

export default mongoose.model('User', userSchema);
