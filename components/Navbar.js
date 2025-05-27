import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session, status } = useSession(); 

  return (
    <nav className="bg-gray-800 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-300 hover:text-blue-200">
          AlgoGym
        </Link>
        <div className="space-x-4">
          <Link href="/" className="hover:text-blue-300">
            Home
          </Link>
          {session && ( 
            <>
              <Link href="/dashboard" className="hover:text-blue-300">
                Dashboard
              </Link>
              <Link href="/profile" className="hover:text-blue-300">
                Profile
              </Link>
              <Link href="/leaderboard" className="hover:text-blue-300">
                Leaderboard
              </Link>
            </>
          )}
          {status === 'loading' ? (
            <span className="text-gray-400">Loading...</span>
          ) : session ? (
            <button
              onClick={() => signOut()}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          ) : (
            <Link href="/login" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}