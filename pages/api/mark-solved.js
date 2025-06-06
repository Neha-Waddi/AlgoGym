import dbConnectMongoose from '../../lib/mongoose';
import UserHandle from '../../lib/user-handles';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  await dbConnectMongoose();
  const session = await getServerSession(req, res, authOptions);

  if (!session) return res.status(401).json({ message: 'Not authenticated' });

  const { title, topic } = req.body;
  if (!title || !topic) return res.status(400).json({ message: 'Missing fields' });

  const email = session.user.email;
  const user = await UserHandle.findOne({ email });

  if (!user) return res.status(404).json({ message: 'User not found' });

  const today = new Date().toDateString();
  const last = user.lastSolvedDate?.toDateString();
  const oneDayAgo = new Date(Date.now() - 86400000).toDateString();

  const newStreak = last === today
    ? user.streak
    : last === oneDayAgo
      ? user.streak + 1
      : 1;

  user.solvedProblems.push({
    title,
    topic,
    dateSolved: new Date(),
  });

  user.xp += 10; 
  user.streak = newStreak;
  user.lastSolvedDate = new Date();
  await user.save();

  return res.status(200).json({
    message: 'Problem marked as solved!',
    xp: user.xp,
    streak: user.streak,
  });
}
