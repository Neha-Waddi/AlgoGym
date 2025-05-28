export default function ProblemCard({ title, link, difficulty, topic, time, hint }) {
  const badgeColor = {
    Easy: "bg-green-200 text-green-800",
    Medium: "bg-yellow-200 text-yellow-800",
    Hard: "bg-red-200 text-red-800",
  }[difficulty];

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
      {hint && <p className="text-sm italic text-50-600">💡 {hint}</p>}
      <a
        href={link}
        target="_blank"
        className="inline-block mt-2 text-blue-600 font-medium hover:underline hover:cursor-pointer"
      >
        Solve Now →
      </a>
    </div>
  );
}
