import mongoose, { Schema } from 'mongoose';

const SolvedProblemSchema = new Schema({
  title: String,
  topic: String,
  dateSolved: Date,
}, { _id: false }); 

const UserHandleSchema = new Schema({
  email: { type: String, required: true, unique: true },
  leetcode: { type: String, default: '' },
  gfg: { type: String, default: '' },
  codeforces: { type: String, default: '' },
  solvedProblems: {
    type: [SolvedProblemSchema],
    default: [],
  },
  xp: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  lastSolvedDate: Date,
}, { timestamps: true });

export default mongoose.models.UserHandle || mongoose.model('UserHandle', UserHandleSchema);
