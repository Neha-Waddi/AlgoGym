import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import dbConnectMongoose from '../../lib/mongoose';
import UserHandle from '../../lib/user-handles';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: 'Unauthorized' });

  const email = session.user.email;
  await dbConnectMongoose();

  if (req.method === 'GET') {
    const user = await UserHandle.findOne({ email });
    return res.status(200).json({
      leetcode: user?.leetcode || '',
      gfg: user?.gfg || '',
      codeforces: user?.codeforces || '',
    });
  }

  if (req.method === 'POST') {
    const { leetcode, gfg, codeforces } = req.body;
    const existing = await UserHandle.findOneAndUpdate(
      { email },
      { leetcode, gfg, codeforces },
      { new: true, upsert: true }
    );
    return res.status(200).json({ message: 'Handles updated successfully' });
  }

  res.status(405).json({ message: 'Method not allowed' });
}
