import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import useLoginUser from '../../hooks/useLoginUser'; // Adjust path if needed

export default function LoginForm({ onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState('');

  const { mutate: loginUser, isLoading } = useLoginUser(onClose);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Invalid email address';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      loginUser(formData);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center rounded-md p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-4 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-3 shadow-lg">
            <User className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-1">Welcome Back</h2>
          <p className="text-sm text-gray-600">Sign in to your account</p>
        </div>

        <div className="relative bg-white/80 backdrop-blur-lg border border-white/20 px-6 py-6 animate-fade-in-up">
          {Object.keys(errors).length > 0 && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg animate-slide-down">
              <p className="text-xs text-red-800 flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                Please fix the errors below
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="relative">
              <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${focusedField === 'email' ? 'text-blue-500' : 'text-gray-400'}`} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField('')}
                placeholder="Enter your email"
                className={`w-full pl-12 pr-4 py-2.5 border-2 rounded-lg bg-gray-50/50 backdrop-blur-sm focus:outline-none focus:bg-white ${
                  errors.email ? 'border-red-300 focus:border-red-500' :
                  focusedField === 'email' ? 'border-blue-500 shadow-md shadow-blue-500/20' :
                  'border-gray-200 hover:border-gray-300'
                }`}
              />
              {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${focusedField === 'password' ? 'text-blue-500' : 'text-gray-400'}`} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField('')}
                placeholder="Enter your password"
                className={`w-full pl-12 pr-10 py-2.5 border-2 rounded-lg bg-gray-50/50 backdrop-blur-sm focus:outline-none focus:bg-white ${
                  errors.password ? 'border-red-300 focus:border-red-500' :
                  focusedField === 'password' ? 'border-blue-500 shadow-md shadow-blue-500/20' :
                  'border-gray-200 hover:border-gray-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
              </button>
              {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
            </div>

            {/* Remember Me & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="w-4 h-4"
                />
                <span className="text-gray-700">Remember me</span>
              </label>
              <button type="button" className="text-blue-600 hover:underline">Forgot password?</button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2.5 text-sm font-medium text-white rounded-lg ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
              }`}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Signup */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{' '}
            <button className="text-blue-600 hover:underline">Sign up</button>
          </p>
        </div>
      </div>
    </div>
  );
}
