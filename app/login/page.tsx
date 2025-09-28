'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Shield, AlertCircle } from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [requires2FA, setRequires2FA] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await login({
        email,
        password,
        rememberMe,
        twoFactorCode: requires2FA ? twoFactorCode : undefined
      });

      if (response.error === '2FA_REQUIRED') {
        setRequires2FA(true);
        setError('Please enter your 2FA code');
      } else if (response.error) {
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
    <div className="min-h-screen bg-gradient-to-b from-sand-50 to-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-earth-800 mb-2">Welcome Back</h1>
          <p className="text-earth-600">Sign in to your secure client portal</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-earth-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-earth-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-earth-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-earth-300 rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-earth-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-earth-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
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

            {/* 2FA Code Field (if required) */}
            {requires2FA && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                <label className="block text-sm font-medium text-earth-700 mb-2">
                  Two-Factor Authentication Code
                </label>
                <input
                  type="text"
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  required
                  className="w-full px-4 py-3 border border-earth-300 rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-transparent transition-all"
                />
              </motion.div>
            )}

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-earth-600 rounded focus:ring-earth-500"
                />
                <span className="text-sm text-earth-600">Remember me</span>
              </label>
              <a
                href="/forgot-password"
                className="text-sm text-earth-600 hover:text-earth-700 underline"
              >
                Forgot password?
              </a>
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
              disabled={isLoading}
              className="w-full py-3 px-6 bg-earth-600 text-white rounded-lg hover:bg-earth-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-sand-50 rounded-lg">
            <p className="text-sm font-medium text-earth-700 mb-2">Demo Credentials:</p>
            <div className="space-y-1 text-sm text-earth-600">
              <p>Client: client@therapy.com / Demo123!</p>
              <p>Therapist: therapist@therapy.com / Demo123! (2FA: check console)</p>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-6 flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900">HIPAA Compliant</p>
              <p className="text-xs text-blue-700 mt-1">
                Your data is encrypted and protected according to healthcare privacy standards.
              </p>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-earth-600">
              Don't have an account?{' '}
              <a
                href="/signup"
                className="font-medium text-earth-700 hover:text-earth-800 underline"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}