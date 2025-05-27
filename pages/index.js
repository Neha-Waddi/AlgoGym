import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center">
      <Head>
        <title>AlgoGym - Home</title>
        <meta name="description" content="Improve your coding skills with AI-generated problems." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-6xl font-extrabold text-blue-400 mb-6 animate-fade-in-down">
        Welcome to AlgoGym
      </h1>
      <p className="text-xl text-gray-300 mb-8 max-w-2xl animate-fade-in-up">
        Daily AI-generated coding problems to challenge your skills and track your progress.
      </p>
      <div className="space-x-4 animate-fade-in-up delay-200">
        <Link href="/dashboard" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200">
          Start Solving
        </Link>
        <Link href="/login" className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200">
          Login / Register
        </Link>
      </div>
    </div>
  );
}