import { useState, useEffect } from "react";
import ProblemCard from "../components/ProblemCard";

const loadingJokes = [
  "Converting coffee ☕ into DSA problems…",
  "Asking Gemini nicely… please wait 🙏",
  "Optimizing algorithms… O(1) patience required 😄",
  "Searching problems faster than binary search 🔍",
  "Allocating brain cells… no memory leak found 🧠",
  "Compiling fun + logic… almost there ✨",
  "Avoiding already solved problems like a pro 🚫",
  "Generating interview nightmares 😈 (just kidding)",
  "Running AI on hamster power 🐹⚡"
];

export default function ProblemsPage() {
  const [problemList, setProblemList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [joke, setJoke] = useState(loadingJokes[0]);

  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setJoke(
        loadingJokes[Math.floor(Math.random() * loadingJokes.length)]
      );
    }, 3500);

    return () => clearInterval(interval);
  }, [loading]);

  const fetchPersonalizedProblems = async () => {
    setLoading(true);
    setError("");
    setProblemList([]);

    try {
      const progressRes = await fetch("/api/user-progress");
      const { weakTopics } = await progressRes.json();

      if (!weakTopics || weakTopics.length === 0) {
        setError("No weak topics found from user progress.");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/generate-problems", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to generate problems");
        setLoading(false);
        return;
      }

      const { problems } = await res.json();
      setProblemList(problems);

    } catch (err) {
      console.error(err);
      setError("Something went wrong while generating problems.");
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
        disabled={loading}
        className={`px-4 py-2 rounded text-white ${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Generating…" : "Generate Problems from My Weak Topics"}
      </button>

      {loading && (
        <p className="italic text-white animate-pulse mt-4">
          {joke}
        </p>
      )}

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
