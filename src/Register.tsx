import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [emailValid, setEmailValid] = useState(true);

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate email format using a regular expression
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setEmailValid(false);
      setLoading(false);
      return;
    } else {
      setEmailValid(true);
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Check password strength (at least 6 characters for Firebase)
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      // Create the user with email and password
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setError('This email is already in use. Please try another one.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Invalid email format. Please enter a valid email address.');
      } else {
        setError('Error creating account. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-gray-100">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null); // Clear error when the user starts typing
              }}
              required
              className={`w-full p-2 mt-1 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${!emailValid ? 'border-2 border-red-500' : ''}`}
            />
            {!emailValid && <p className="text-red-500 text-sm">Please enter a valid email.</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(null); // Clear error when the user starts typing
              }}
              required
              className="w-full p-2 mt-1 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError(null); // Clear error when the user starts typing
              }}
              required
              className="w-full p-2 mt-1 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-500 focus:outline-none"
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate('/login')}
            className="text-blue-500 hover:underline"
          >
            Already have an account? Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
