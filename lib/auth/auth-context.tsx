'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session, LoginCredentials, SignupData, AuthResponse } from './types';
import { authService } from './auth-service';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  signup: (data: SignupData) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<User | null>;
  resetPasswordRequest: (email: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const storedSession = localStorage.getItem('therapy_session');
        if (storedSession) {
          const sessionData = JSON.parse(storedSession);
          const verifiedUser = await authService.verifySession(sessionData.token);

          if (verifiedUser) {
            setUser(verifiedUser);
            setSession(sessionData);
          } else {
            localStorage.removeItem('therapy_session');
          }
        }
      } catch (error) {
        console.error('Session check failed:', error);
        localStorage.removeItem('therapy_session');
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await authService.login(credentials);

      if (response.user && response.session) {
        setUser(response.user);
        setSession(response.session);
        localStorage.setItem('therapy_session', JSON.stringify(response.session));

        // Redirect based on role
        if (response.user.role === 'client') {
          router.push('/portal');
        } else if (response.user.role === 'therapist') {
          router.push('/therapist');
        }
      }

      return response;
    } catch (error) {
      console.error('Login failed:', error);
      return { user: null, session: null, error: 'Login failed' };
    }
  };

  const signup = async (data: SignupData): Promise<AuthResponse> => {
    try {
      const response = await authService.signup(data);

      if (response.user && response.session) {
        setUser(response.user);
        setSession(response.session);
        localStorage.setItem('therapy_session', JSON.stringify(response.session));
        router.push('/portal/onboarding');
      }

      return response;
    } catch (error) {
      console.error('Signup failed:', error);
      return { user: null, session: null, error: 'Signup failed' };
    }
  };

  const logout = async () => {
    try {
      if (session) {
        await authService.logout(session.id);
      }
      setUser(null);
      setSession(null);
      localStorage.removeItem('therapy_session');
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const updateProfile = async (updates: Partial<User>): Promise<User | null> => {
    if (!user) return null;

    try {
      const updatedUser = await authService.updateProfile(user.id, updates);
      if (updatedUser) {
        setUser(updatedUser);
      }
      return updatedUser;
    } catch (error) {
      console.error('Profile update failed:', error);
      return null;
    }
  };

  const resetPasswordRequest = async (email: string) => {
    return authService.resetPasswordRequest(email);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        isAuthenticated: !!user && !!session,
        login,
        signup,
        logout,
        updateProfile,
        resetPasswordRequest
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// HOC for protecting routes
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  allowedRoles?: string[]
) {
  return function AuthenticatedComponent(props: P) {
    const { user, isLoading, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading) {
        if (!isAuthenticated) {
          router.push('/login');
        } else if (allowedRoles && user && !allowedRoles.includes(user.role)) {
          router.push('/unauthorized');
        }
      }
    }, [isLoading, isAuthenticated, user, router]);

    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-earth-600"></div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return null;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
      return null;
    }

    return <Component {...props} />;
  };
}