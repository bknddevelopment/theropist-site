// Booking System Types
export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  category: 'individual' | 'couples' | 'group' | 'workshop';
  isActive: boolean;
  maxParticipants?: number;
  requiresConsultation?: boolean;
  color?: string;
}

export interface TimeSlot {
  id: string;
  startTime: Date;
  endTime: Date;
  isAvailable: boolean;
  therapistId?: string;
  serviceId?: string;
  isRecurring?: boolean;
  recurringPattern?: RecurringPattern;
}

export interface RecurringPattern {
  frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly';
  interval: number;
  daysOfWeek?: number[]; // 0-6 for Sunday-Saturday
  endDate?: Date;
  occurrences?: number;
}

export interface Appointment {
  id: string;
  clientId: string;
  therapistId: string;
  serviceId: string;
  startTime: Date;
  endTime: Date;
  status: AppointmentStatus;
  notes?: string;
  isRecurring?: boolean;
  recurringId?: string;
  recurringPattern?: RecurringPattern;
  createdAt: Date;
  updatedAt: Date;
  confirmationCode?: string;
  zoomLink?: string;
  location?: AppointmentLocation;
  reminders?: Reminder[];
  forms?: string[]; // Form IDs to be completed
  payment?: PaymentInfo;
  cancellationReason?: string;
  rescheduledFrom?: string;
  rescheduledTo?: string;
}

export type AppointmentStatus =
  | 'scheduled'
  | 'confirmed'
  | 'pending'
  | 'cancelled'
  | 'completed'
  | 'no-show'
  | 'rescheduled';

export interface AppointmentLocation {
  type: 'in-person' | 'online' | 'phone';
  address?: string;
  room?: string;
  meetingUrl?: string;
  phoneNumber?: string;
}

export interface Reminder {
  id: string;
  appointmentId: string;
  type: 'email' | 'sms' | 'push';
  scheduledFor: Date;
  sent: boolean;
  sentAt?: Date;
  error?: string;
}

export interface PaymentInfo {
  id: string;
  amount: number;
  status: 'pending' | 'paid' | 'failed' | 'refunded';
  method?: 'card' | 'insurance' | 'cash' | 'check';
  transactionId?: string;
  insuranceClaimId?: string;
  paidAt?: Date;
}

export interface Availability {
  id: string;
  therapistId: string;
  dayOfWeek: number; // 0-6
  startTime: string; // HH:MM format
  endTime: string;
  isActive: boolean;
  effectiveFrom?: Date;
  effectiveTo?: Date;
}

export interface BlockedTime {
  id: string;
  therapistId?: string;
  startTime: Date;
  endTime: Date;
  reason?: string;
  isRecurring?: boolean;
  recurringPattern?: RecurringPattern;
}

export interface BookingRequest {
  serviceId: string;
  therapistId?: string;
  preferredDate: Date;
  preferredTime?: string;
  alternativeDates?: Date[];
  notes?: string;
  isRecurring?: boolean;
  recurringPattern?: RecurringPattern;
  timezone: string;
}

export interface BookingResponse {
  success: boolean;
  appointment?: Appointment;
  suggestedSlots?: TimeSlot[];
  error?: string;
  requiresConsultation?: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  resource?: {
    appointment?: Appointment;
    type: 'appointment' | 'blocked' | 'holiday';
    color?: string;
  };
}