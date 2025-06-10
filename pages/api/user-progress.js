import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import { getUserProgress } from '../../lib/get-userprogress';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const weakTopics = await getUserProgress(session.user.email);
    console.log("weaktopics from api/user-progress",weakTopics)
    return res.status(200).json({ weakTopics });
  } catch (err) {
    console.log("error is",err)
    return res.status(500).json({ error: err.message });
  }
}
