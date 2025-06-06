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

  res.status(200).json({
    xp: user.xp,
    streak: user.streak,
  });
}
