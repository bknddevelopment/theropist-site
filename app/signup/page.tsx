'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Phone, Eye, EyeOff, Shield, Check, X, AlertCircle } from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Password strength validation
  const passwordRequirements = [
    { label: 'At least 8 characters', met: formData.password.length >= 8 },
    { label: 'Contains uppercase letter', met: /[A-Z]/.test(formData.password) },
    { label: 'Contains lowercase letter', met: /[a-z]/.test(formData.password) },
    { label: 'Contains number', met: /\d/.test(formData.password) },
    { label: 'Contains special character', met: /[@$!%*?&]/.test(formData.password) }
  ];

  const allRequirementsMet = passwordRequirements.every(req => req.met);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password strength
    if (!allRequirementsMet) {
      setError('Please meet all password requirements');
      return;
    }

    // Validate terms acceptance
    if (!acceptTerms) {
      setError('Please accept the terms and conditions');
      return;
    }

    setIsLoading(true);

    try {
      const response = await signup({
        ...formData,
        acceptTerms
      });

      if (response.error) {
        setError(response.error);
      } else if (response.user) {
        // Redirect handled by auth context
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sand-50 to-white flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-earth-800 mb-2">Create Your Account</h1>
          <p className="text-earth-600">Begin your journey to wellness today</p>
        </div>

        {/* Signup Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-earth-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-2">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-earth-400" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-earth-300 rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-2">
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-earth-400" />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-earth-300 rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-earth-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-earth-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-earth-300 rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-sm font-medium text-earth-700 mb-2">
                Phone Number (Optional)
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-earth-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(555) 123-4567"
                  className="w-full pl-10 pr-4 py-3 border border-earth-300 rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-earth-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create password"
                    required
                    className="w-full pl-10 pr-12 py-3 border border-earth-300 rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-earth-400 hover:text-earth-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-earth-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-earth-300 rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Password Requirements */}
            {formData.password && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-sand-50 rounded-lg p-4"
              >
                <p className="text-sm font-medium text-earth-700 mb-2">Password Requirements:</p>
                <div className="space-y-1">
                  {passwordRequirements.map((req, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      {req.met ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <X className="w-4 h-4 text-red-500" />
                      )}
                      <span className={`text-sm ${req.met ? 'text-green-700' : 'text-earth-600'}`}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Terms and Conditions */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="mt-1 w-4 h-4 text-earth-600 rounded focus:ring-earth-500"
              />
              <label htmlFor="terms" className="text-sm text-earth-600 cursor-pointer">
                I accept the{' '}
                <a href="/terms" className="text-earth-700 underline">Terms and Conditions</a>
                {' '}and{' '}
                <a href="/privacy" className="text-earth-700 underline">Privacy Policy</a>.
                I understand that my information will be handled in accordance with HIPAA regulations.
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg"
              >
                <AlertCircle className="w-5 h-5 text-red-500" />
                <p className="text-sm text-red-700">{error}</p>
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !allRequirementsMet || !acceptTerms}
              className="w-full py-3 px-6 bg-earth-600 text-white rounded-lg hover:bg-earth-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900">Your Privacy is Our Priority</p>
              <p className="text-xs text-blue-700 mt-1">
                All personal health information is encrypted and stored in compliance with HIPAA regulations.
                We never share your data without explicit consent.
              </p>
            </div>
          </div>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-earth-600">
              Already have an account?{' '}
              <a
                href="/login"
                className="font-medium text-earth-700 hover:text-earth-800 underline"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}