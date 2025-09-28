// Mock Authentication Service with HIPAA-compliant security measures
import { User, Session, AuthResponse, LoginCredentials, SignupData } from './types';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Mock secret keys - In production, use environment variables and proper key management
const JWT_SECRET = process.env.JWT_SECRET || 'mock-jwt-secret-replace-in-production';
const SESSION_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours
const MFA_EXPIRY = 5 * 60 * 1000; // 5 minutes

// Mock database of users
const mockUsers: Map<string, User & { password: string }> = new Map();
const mockSessions: Map<string, Session> = new Map();
const mockMfaCodes: Map<string, { code: string; expiresAt: Date }> = new Map();

// Initialize with demo users
const initializeDemoUsers = () => {
  const demoPassword = bcrypt.hashSync('Demo123!', 10);

  mockUsers.set('client@therapy.com', {
    id: 'user-1',
    email: 'client@therapy.com',
    password: demoPassword,
    firstName: 'Sarah',
    lastName: 'Johnson',
    phone: '(707) 555-0123',
    role: 'client',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date(),
    emailVerified: true,
    twoFactorEnabled: false,
    lastLogin: new Date(),
    timezone: 'America/Los_Angeles',
    preferences: {
      emailNotifications: true,
      smsNotifications: true,
      reminderTime: 24,
      preferredLanguage: 'en',
      theme: 'light'
    }
  });

  mockUsers.set('therapist@therapy.com', {
    id: 'user-2',
    email: 'therapist@therapy.com',
    password: demoPassword,
    firstName: 'Dr. Rosa',
    lastName: 'Toral',
    phone: '(707) 555-0100',
    role: 'therapist',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date(),
    emailVerified: true,
    twoFactorEnabled: true,
    lastLogin: new Date(),
    timezone: 'America/Los_Angeles',
    preferences: {
      emailNotifications: true,
      smsNotifications: false,
      reminderTime: 60,
      preferredLanguage: 'en',
      theme: 'light'
    }
  });
};

initializeDemoUsers();

// Audit logging for HIPAA compliance
const auditLog = (action: string, userId: string, details?: any) => {
  const log = {
    timestamp: new Date().toISOString(),
    action,
    userId,
    details,
    ipAddress: 'mock-ip', // In production, get from request
    userAgent: 'mock-agent' // In production, get from request
  };
  console.log('[AUDIT]', JSON.stringify(log));
  // In production, store in secure audit log database
};

// Password validation for HIPAA compliance
const validatePassword = (password: string): boolean => {
  // Minimum 8 characters, at least 1 uppercase, 1 lowercase, 1 number, 1 special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// Session management with secure token generation
const createSession = (user: User): Session => {
  const sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const token = jwt.sign(
    {
      userId: user.id,
      sessionId,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  const session: Session = {
    id: sessionId,
    userId: user.id,
    token,
    expiresAt: new Date(Date.now() + SESSION_EXPIRY),
    createdAt: new Date(),
    ipAddress: 'mock-ip',
    userAgent: 'mock-agent'
  };

  mockSessions.set(sessionId, session);
  return session;
};

// Authentication service methods
export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const userEntry = Array.from(mockUsers.values()).find(u => u.email === credentials.email);

      if (!userEntry) {
        auditLog('LOGIN_FAILED', credentials.email, { reason: 'User not found' });
        return { user: null, session: null, error: 'Invalid credentials' };
      }

      const isPasswordValid = await bcrypt.compare(credentials.password, userEntry.password);

      if (!isPasswordValid) {
        auditLog('LOGIN_FAILED', userEntry.id, { reason: 'Invalid password' });
        return { user: null, session: null, error: 'Invalid credentials' };
      }

      // Check 2FA if enabled
      if (userEntry.twoFactorEnabled && !credentials.twoFactorCode) {
        // Generate and send 2FA code
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        mockMfaCodes.set(userEntry.id, {
          code,
          expiresAt: new Date(Date.now() + MFA_EXPIRY)
        });
        console.log('[2FA CODE]', code); // In production, send via SMS/email
        return { user: null, session: null, error: '2FA_REQUIRED' };
      }

      if (userEntry.twoFactorEnabled && credentials.twoFactorCode) {
        const mfaEntry = mockMfaCodes.get(userEntry.id);
        if (!mfaEntry || mfaEntry.code !== credentials.twoFactorCode || mfaEntry.expiresAt < new Date()) {
          auditLog('LOGIN_FAILED', userEntry.id, { reason: 'Invalid 2FA code' });
          return { user: null, session: null, error: 'Invalid 2FA code' };
        }
        mockMfaCodes.delete(userEntry.id);
      }

      // Create user object without password
      const { password, ...user } = userEntry;
      user.lastLogin = new Date();
      mockUsers.set(user.email, { ...userEntry, lastLogin: user.lastLogin });

      const session = createSession(user);

      auditLog('LOGIN_SUCCESS', user.id);

      return { user, session, error: undefined };
    } catch (error) {
      console.error('Login error:', error);
      return { user: null, session: null, error: 'Login failed' };
    }
  },

  async signup(data: SignupData): Promise<AuthResponse> {
    try {
      // Check if user already exists
      if (mockUsers.has(data.email)) {
        return { user: null, session: null, error: 'Email already registered' };
      }

      // Validate password strength
      if (!validatePassword(data.password)) {
        return {
          user: null,
          session: null,
          error: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character'
        };
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(data.password, 12);

      // Create new user
      const newUser: User & { password: string } = {
        id: `user-${Date.now()}`,
        email: data.email,
        password: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        role: 'client',
        createdAt: new Date(),
        updatedAt: new Date(),
        emailVerified: false,
        twoFactorEnabled: false,
        preferences: {
          emailNotifications: true,
          smsNotifications: false,
          reminderTime: 24,
          preferredLanguage: 'en',
          theme: 'light'
        }
      };

      mockUsers.set(data.email, newUser);

      // Create user object without password
      const { password, ...user } = newUser;
      const session = createSession(user);

      auditLog('SIGNUP_SUCCESS', user.id);

      // In production, send verification email
      console.log('[EMAIL VERIFICATION] Send to:', user.email);

      return { user, session, error: undefined };
    } catch (error) {
      console.error('Signup error:', error);
      return { user: null, session: null, error: 'Signup failed' };
    }
  },

  async logout(sessionId: string): Promise<void> {
    const session = mockSessions.get(sessionId);
    if (session) {
      auditLog('LOGOUT', session.userId);
      mockSessions.delete(sessionId);
    }
  },

  async verifySession(token: string): Promise<User | null> {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      const session = mockSessions.get(decoded.sessionId);

      if (!session || session.expiresAt < new Date()) {
        return null;
      }

      const userEntry = Array.from(mockUsers.values()).find(u => u.id === decoded.userId);
      if (!userEntry) {
        return null;
      }

      const { password, ...user } = userEntry;
      return user;
    } catch (error) {
      console.error('Session verification error:', error);
      return null;
    }
  },

  async resetPasswordRequest(email: string): Promise<{ success: boolean; error?: string }> {
    const userEntry = Array.from(mockUsers.values()).find(u => u.email === email);

    if (!userEntry) {
      // Don't reveal if email exists
      return { success: true };
    }

    // Generate reset token
    const resetToken = jwt.sign(
      { userId: userEntry.id, type: 'password-reset' },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    auditLog('PASSWORD_RESET_REQUEST', userEntry.id);

    // In production, send email with reset link
    console.log('[PASSWORD RESET] Token:', resetToken);

    return { success: true };
  },

  async resetPasswordConfirm(token: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;

      if (decoded.type !== 'password-reset') {
        return { success: false, error: 'Invalid reset token' };
      }

      if (!validatePassword(newPassword)) {
        return {
          success: false,
          error: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character'
        };
      }

      const userEntry = Array.from(mockUsers.values()).find(u => u.id === decoded.userId);
      if (!userEntry) {
        return { success: false, error: 'User not found' };
      }

      const hashedPassword = await bcrypt.hash(newPassword, 12);
      userEntry.password = hashedPassword;
      userEntry.updatedAt = new Date();

      auditLog('PASSWORD_RESET_SUCCESS', userEntry.id);

      return { success: true };
    } catch (error) {
      console.error('Password reset error:', error);
      return { success: false, error: 'Invalid or expired reset token' };
    }
  },

  async updateProfile(userId: string, updates: Partial<User>): Promise<User | null> {
    const userEntry = Array.from(mockUsers.values()).find(u => u.id === userId);

    if (!userEntry) {
      return null;
    }

    // Update allowed fields only
    const allowedUpdates = ['firstName', 'lastName', 'phone', 'timezone', 'preferences'];
    Object.keys(updates).forEach(key => {
      if (allowedUpdates.includes(key)) {
        (userEntry as any)[key] = (updates as any)[key];
      }
    });

    userEntry.updatedAt = new Date();

    auditLog('PROFILE_UPDATE', userId, { fields: Object.keys(updates) });

    const { password, ...user } = userEntry;
    return user;
  },

  async enableTwoFactor(userId: string): Promise<{ success: boolean; secret?: string }> {
    const userEntry = Array.from(mockUsers.values()).find(u => u.id === userId);

    if (!userEntry) {
      return { success: false };
    }

    userEntry.twoFactorEnabled = true;
    userEntry.updatedAt = new Date();

    // In production, generate TOTP secret
    const secret = 'MOCK-2FA-SECRET-' + userId;

    auditLog('2FA_ENABLED', userId);

    return { success: true, secret };
  },

  async disableTwoFactor(userId: string, password: string): Promise<{ success: boolean; error?: string }> {
    const userEntry = Array.from(mockUsers.values()).find(u => u.id === userId);

    if (!userEntry) {
      return { success: false, error: 'User not found' };
    }

    const isPasswordValid = await bcrypt.compare(password, userEntry.password);

    if (!isPasswordValid) {
      auditLog('2FA_DISABLE_FAILED', userId, { reason: 'Invalid password' });
      return { success: false, error: 'Invalid password' };
    }

    userEntry.twoFactorEnabled = false;
    userEntry.updatedAt = new Date();

    auditLog('2FA_DISABLED', userId);

    return { success: true };
  }
};

export default authService;