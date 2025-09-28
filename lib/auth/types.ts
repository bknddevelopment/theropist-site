// Authentication and User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: 'client' | 'therapist' | 'admin';
  createdAt: Date;
  updatedAt: Date;
  emailVerified: boolean;
  twoFactorEnabled?: boolean;
  lastLogin?: Date;
  profileImage?: string;
  timezone?: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  emailNotifications: boolean;
  smsNotifications: boolean;
  reminderTime: number; // hours before appointment
  preferredLanguage: string;
  theme: 'light' | 'dark' | 'auto';
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
  ipAddress?: string;
  userAgent?: string;
}

export interface AuthResponse {
  user: User | null;
  session: Session | null;
  error?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
  twoFactorCode?: string;
}

export interface SignupData extends LoginCredentials {
  firstName: string;
  lastName: string;
  phone?: string;
  acceptTerms: boolean;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  newPassword: string;
}