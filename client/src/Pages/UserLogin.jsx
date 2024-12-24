import { useState } from 'react';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Track loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when login is in progress

    try {
      const data = await authService.login(email, password);
      localStorage.setItem('userToken', data.token);
      toast.success('Login as user successful');
      navigate('/restaurants');
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Invalid credentials');
    } finally {
      setLoading(false); // Reset loading state after the attempt
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
      <motion.div
        className="p-8 bg-white rounded-lg shadow-lg w-full max-w-md"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          User Login
        </h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 mb-4 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-3 mb-6 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
          <motion.button
            type="submit"
            disabled={loading} // Disable button while loading
            className={`w-full py-3 rounded-lg ${loading ? 'bg-violet-600' : 'bg-blue-600'} text-white font-bold hover:bg-violet-700 transition duration-300`}
            whileHover={!loading ? { scale: 1.1 } : {}}
            whileTap={!loading ? { scale: 0.95 } : {}}
          >
            {loading ? 'Logging...' : 'Login'} {/* Button text changes */}
          </motion.button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-500 hover:underline">
            Register
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
