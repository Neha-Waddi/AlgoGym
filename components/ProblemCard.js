import { useState } from "react";
import axios from "axios";

export default function ProblemCard({ title, link, difficulty, topic, time, hint, onSolve }) {
  const [solved, setSolved] = useState(false);
  const [loading, setLoading] = useState(false);

  const badgeColor = {
    Easy: "bg-green-200 text-green-800",
    Medium: "bg-yellow-200 text-yellow-800",
    Hard: "bg-red-200 text-red-800",
  }[difficulty];

  const handleSolve = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/mark-solved", { title, topic });
      setSolved(true);
      onSolve?.(); 
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 shadow-md rounded-xl p-4 space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <span className={`px-2 py-1 rounded-full text-sm ${badgeColor}`}>
          {difficulty}
        </span>
      </div>
      <p className="text-sm text-gray-50">🧠 Topic: {topic}</p>
      <p className="text-sm text-gray-50">🕒 Time: {time}</p>
      {hint && <p className="text-sm italic text-gray-300">💡 {hint}</p>}
      <a
        href={link}
        target="_blank"
        className="inline-block mt-2 text-blue-500 font-medium hover:underline"
      >
        Solve Now →
      </a>

      <button
        onClick={handleSolve}
        disabled={solved || loading}
        className={`block mt-2 px-4 py-1 rounded bg-green-600 hover:bg-green-700 text-white transition ${
          solved ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {solved ? "Solved ✔️" : loading ? "Marking..." : "Mark as Solved"}
      </button>
    </div>
  );
}
