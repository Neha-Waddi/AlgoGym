import mongoose from 'mongoose';

const UserHandleSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  leetcode: { type: String, default: '' },
  gfg: { type: String, default: '' },
  codeforces: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.models.UserHandle || mongoose.model('UserHandle', UserHandleSchema);
