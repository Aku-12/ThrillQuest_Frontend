import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';
import useRegisterUser from '../../hooks/useRegisterUser';

export default function RegisterForm({ onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const [formData, setFormData] = useState({
    fName: '',
    lName: '',
    email: '',
    password: '',
    phoneNo: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const { mutate: registerUser, isLoading } = useRegisterUser(
    onClose
  );

  const validateField = (name, value) => {
    switch (name) {
      case 'fName': return !value ? 'First name is required' : '';
      case 'lName': return !value ? 'Last name is required' : '';
      case 'email': {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !value ? 'Email is required' : !emailRegex.test(value) ? 'Invalid email address' : '';
      }
      case 'password': return !value ? 'Password is required' : value.length < 6 ? 'Must be at least 6 characters' : '';
      case 'phoneNo': return !value ? 'Phone number is required' : value.length < 10 ? 'Must be at least 10 digits' : '';
      default: return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
    setFocusedField('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);
    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    if (Object.keys(newErrors).length === 0) {
      registerUser(formData);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center rounded-md p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-4 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-3 shadow-lg">
            <User className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-1">Create Account</h2>
          <p className="text-sm text-gray-600">Join us today and get started</p>
        </div>

        <div className="relative bg-white/80 backdrop-blur-lg border border-white/20 px-6 py-6 animate-fade-in-up">
          {Object.keys(errors).some(key => errors[key] && touched[key]) && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg animate-slide-down">
              <p className="text-xs text-red-800 flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                Please fix the errors below
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First Name */}
            <div className="relative">
              <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${focusedField === 'fName' ? 'text-blue-500' : 'text-gray-400'}`} />
              <input
                type="text"
                name="fName"
                value={formData.fName}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('fName')}
                onBlur={handleBlur}
                placeholder="First Name"
                className={`w-full pl-12 pr-4 py-2.5 border-2 rounded-lg bg-gray-50/50 focus:outline-none focus:bg-white ${
                  errors.fName && touched.fName
                    ? 'border-red-300 focus:border-red-500'
                    : focusedField === 'fName'
                    ? 'border-blue-500 shadow-md shadow-blue-500/20'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              />
              {errors.fName && touched.fName && <p className="text-xs text-red-600 mt-1">{errors.fName}</p>}
            </div>

            {/* Last Name */}
            <div className="relative">
              <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${focusedField === 'lName' ? 'text-blue-500' : 'text-gray-400'}`} />
              <input
                type="text"
                name="lName"
                value={formData.lName}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('lName')}
                onBlur={handleBlur}
                placeholder="Last Name"
                className={`w-full pl-12 pr-4 py-2.5 border-2 rounded-lg bg-gray-50/50 focus:outline-none focus:bg-white ${
                  errors.lName && touched.lName
                    ? 'border-red-300 focus:border-red-500'
                    : focusedField === 'lName'
                    ? 'border-blue-500 shadow-md shadow-blue-500/20'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              />
              {errors.lName && touched.lName && <p className="text-xs text-red-600 mt-1">{errors.lName}</p>}
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${focusedField === 'email' ? 'text-blue-500' : 'text-gray-400'}`} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('email')}
                onBlur={handleBlur}
                placeholder="Email Address"
                className={`w-full pl-12 pr-4 py-2.5 border-2 rounded-lg bg-gray-50/50 focus:outline-none focus:bg-white ${
                  errors.email && touched.email
                    ? 'border-red-300 focus:border-red-500'
                    : focusedField === 'email'
                    ? 'border-blue-500 shadow-md shadow-blue-500/20'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              />
              {errors.email && touched.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
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
                onBlur={handleBlur}
                placeholder="Password"
                className={`w-full pl-12 pr-10 py-2.5 border-2 rounded-lg bg-gray-50/50 focus:outline-none focus:bg-white ${
                  errors.password && touched.password
                    ? 'border-red-300 focus:border-red-500'
                    : focusedField === 'password'
                    ? 'border-blue-500 shadow-md shadow-blue-500/20'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
              </button>
              {errors.password && touched.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
            </div>

            {/* Phone */}
            <div className="relative">
              <Phone className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${focusedField === 'phoneNo' ? 'text-blue-500' : 'text-gray-400'}`} />
              <input
                type="tel"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('phoneNo')}
                onBlur={handleBlur}
                placeholder="Phone Number"
                className={`w-full pl-12 pr-4 py-2.5 border-2 rounded-lg bg-gray-50/50 focus:outline-none focus:bg-white ${
                  errors.phoneNo && touched.phoneNo
                    ? 'border-red-300 focus:border-red-500'
                    : focusedField === 'phoneNo'
                    ? 'border-blue-500 shadow-md shadow-blue-500/20'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              />
              {errors.phoneNo && touched.phoneNo && <p className="text-xs text-red-600 mt-1">{errors.phoneNo}</p>}
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
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Login link */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{' '}
            <button className="text-blue-600 hover:underline">Sign in</button>
          </p>
        </div>
      </div>
    </div>
  );
}
