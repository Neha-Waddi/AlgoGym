import Head from 'next/head';
import { signIn, useSession } from 'next-auth/react'; 
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';


export default function Register() {
  
  const { data: session, status } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState(''); 
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  const handleRegister = async (e) => {
    e.preventDefault(); 
    setError(''); 
    setSuccess(''); 

    if (password != cpassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password ,cpassword}), 
      });

      if (res.ok) {
        setSuccess('Registration successful! You can now log in.');
        setEmail('');
        setPassword('');
        setCPassword('');
        setTimeout(() => {
          router.push("/login");
        }, 2000); 
      } else {
        const { error: backendError } = await res.json();
        setError(backendError || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred during registration.');
      console.error('Registration error:', err);
    }
  };

  if (status == 'loading') {
    return (
      <div className="flex justify-center items-center h-screen text-gray-400">
        Loading authentication...
      </div>
    );
  }

  if (session) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-gray-900 text-white">
      <Head>
        <title>Register - AlgoGym</title>
      </Head>

      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-700">
        <h1 className="text-3xl font-bold text-center text-blue-300 mb-6">Register for AlgoGym</h1>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}
        {success && <p className="text-green-400 text-center mb-4">{success}</p>}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-300 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200"
              placeholder="your@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-300 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="cpassword" className="block text-gray-300 text-sm font-bold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="cpassword"
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200"
              placeholder="********"
              value={cpassword}
              onChange={(e) => setCPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-200"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}