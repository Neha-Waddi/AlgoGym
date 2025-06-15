import { useState } from "react";
import ProblemCard from "../components/ProblemCard";

export default function ProblemsPage() {
  const [problemList, setProblemList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPersonalizedProblems = async () => {
    setLoading(true);
    setError("");

    try {
      const progressRes = await fetch("/api/user-progress");
      const { weakTopics } = await progressRes.json();

      if (!weakTopics || weakTopics.length === 0) {
        setError("No weak topics found from user progress.");
        setLoading(false);
        return;
      }

      const topic = weakTopics[0]; 
      const level = "easy";

      const res = await fetch("/api/generate-problems", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, level }),
      });

      const { problems } = await res.json();
      setProblemList(problems);
    } catch (err) {
      setError("Something went wrong while generating problems.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold mb-4">
        🎯 Generate Personalized DSA Problems
      </h1>

      <button
        onClick={fetchPersonalizedProblems}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Generate Problems from My Weak Topics
      </button>

      {loading && <p>Loading problems...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="grid gap-4 mt-6">
        {problemList.map((p, idx) => (
          <ProblemCard
            key={idx}
            title={p.title}
            link={p.link}
            difficulty={p.difficulty}
            topic={p.topic}
            time={p.time}
            hint={p.hint}
          />
        ))}
      </div>
    </div>
  );
}
