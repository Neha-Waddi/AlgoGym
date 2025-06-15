import dbConnectMongoose from "../../lib/mongoose";
import UserHandle from "../../lib/user-handles";

export default async function handler(req, res) {
  await dbConnectMongoose();

  try {
    const users = await UserHandle.find({}, "email xp streak solvedProblems")
      .sort({ xp: -1 })
      .limit(20);

    const leaderboard = users.map((user) => ({
      email: user.email,
      xp: user.xp,
      streak: user.streak,
      solved: user.solvedProblems.length,
    }));

    res.status(200).json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: "Error fetching leaderboard" });
  }
}
