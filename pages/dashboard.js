import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import XPProgressBar from "../components/XPProgress";
import StreakCounter from "../components/StreakTracker";
import LinkedAccountsCard from "../components/LinkedAccountsCard";
import DashboardCard from "../components/DashboardCard";
import { CheckCircleIcon,PlusIcon} from "@heroicons/react/24/solid";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [handles, setHandles] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [level, setLevel] = useState(1);
  const [tasks, setTasks] = useState(0);
  const [solvedToday, setSolvedToday] = useState(0);
  const [recentSolved, setRecentSolved] = useState([]);



  useEffect(() => {
    async function fetchHandles() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/user-handles");
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
        const data = await res.json();
        setHandles(data);
      } catch (error) {
        console.error("Failed to fetch user handles:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchHandles();
  }, []);

   useEffect(() => {
    async function fetchStats() {
      const res = await fetch('/api/get-user-stats');
      if (res.ok) {
        const data = await res.json();
        setXp(data.xp);
        setStreak(data.streak);
        setLevel(Math.floor(data.xp / 100) + 1);
        setTasks(data.tasks);
        setSolvedToday(data.solvedToday);
        setRecentSolved(data.recentSolvedProblems || []);

      }
    }

    fetchStats();
  }, []);

  if (status === "loading" || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg text-gray-300">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="p-6 max-w-md bg-gray-800 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-2">Access Denied</h2>
          <p className="text-gray-300 mb-4">Please login to view your dashboard</p>
          <button 
            onClick={() => signIn()} 
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <DashboardHeader 
          name={session.user.name || session.user.email} 
          avatar={session.user.image}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard className="md:col-span-2">
            <XPProgressBar xp={xp} level={level} />
          </DashboardCard>

          <DashboardCard>
            <StreakCounter days={streak} />
          </DashboardCard>

          <DashboardCard>
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
              <div className="grid grid-rows-2 gap-4 flex-grow">
                <div className="bg-gray-800 p-3 rounded-lg">
                  <p className="text-2xl font-bold text-pink-500">{tasks}</p>
                  <p className="text-xs text-gray-400">Total Problems Solved</p>
                </div>
                
                <div className="bg-gray-800 p-3 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-500">{6-solvedToday}</p>
                  <p className="text-xs text-gray-400">more to reach today's goal</p>
                </div>
              </div>
            </div>
          </DashboardCard>

          <DashboardCard className="lg:col-span-2">
  <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
  <div className="space-y-4">
    {recentSolved.length === 0 ? (
      <p className="text-gray-400">No problems solved recently.</p>
    ) : (
      recentSolved.map((problem, idx) => (
        <div key={idx} className="flex items-start p-3 bg-gray-800 rounded-lg">
          <div className="bg-blue-600 p-2 rounded-full mr-3">
            <CheckCircleIcon className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-gray-300 font-medium">{problem.title}</p>
            <p className="text-xs text-gray-500">
              {new Date(problem.dateSolved).toLocaleString(undefined, {
                dateStyle: "medium",
                timeStyle: "short"
              })}
            </p>
          </div>
        </div>
      ))
    )}
  </div>
</DashboardCard>


          <DashboardCard className="lg:col-span-2">
            <LinkedAccountsCard handles={handles} />
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}