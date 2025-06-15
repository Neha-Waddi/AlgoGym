import { useEffect, useState } from "react";

export default function LeaderboardCard({ currentUser }) {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    async function fetchLeaderboard() {
      const res = await fetch("/api/leaderboard");
      const data = await res.json();
      setLeaders(data);
    }

    fetchLeaderboard();
  }, []);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow">
      <h3 className="text-xl font-bold text-white mb-4">🏆 Leaderboard</h3>
      <table className="w-full text-left text-sm text-white">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Email</th>
            <th>XP</th>
            <th>Current Streak</th>
            <th>Total Problems Solved</th>
          </tr>
        </thead>
        <tbody>
          {leaders.map((user, index) => (
            <tr
              key={user.email}
              className={user.email === currentUser ? "text-yellow-400 font-bold" : ""}
            >
              <td>{index + 1}</td>
              <td>{user.email.split("@")[0]}</td>
              <td>{user.xp}</td>
              <td>{user.streak}</td>
              <td>{user.solved}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
