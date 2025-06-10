import dbConnectMongoose from '../../lib/mongoose';
import UserHandle from '../../lib/user-handles';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(req, res) {
  await dbConnectMongoose();

  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: 'Not authenticated' });

  const user = await UserHandle.findOne({ email: session.user.email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const today = new Date();
  const todayDate = today.toDateString(); 

  const solvedToday = user.solvedProblems.filter(p =>
    new Date(p.dateSolved).toDateString() === todayDate
  ).length;

  const recentSolvedProblems = [...user.solvedProblems]
  .sort((a, b) => new Date(b.dateSolved) - new Date(a.dateSolved))
  .slice(0, 5); 

  const topicCounts = {};

user.solvedProblems.forEach((p) => {
  const topic = p.topic || 'Unknown';
  topicCounts[topic] = (topicCounts[topic] || 0) + 1;
});


  res.status(200).json({
    xp: user.xp,
    streak: user.streak,
    tasks:user.__v,
    solvedToday:solvedToday,
    recentSolvedProblems: recentSolvedProblems,
    topicCounts:topicCounts
  });
}
