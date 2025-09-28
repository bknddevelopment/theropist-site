// Mock Booking Service
import {
  Service,
  TimeSlot,
  Appointment,
  AppointmentStatus,
  Availability,
  BlockedTime,
  BookingRequest,
  BookingResponse,
  CalendarEvent,
  RecurringPattern
} from './types';
import { addDays, addWeeks, addMonths, format, parse, isWithinInterval, setHours, setMinutes, getDay } from 'date-fns';
import { toZonedTime, fromZonedTime } from 'date-fns-tz';

// Mock data stores
const mockServices: Map<string, Service> = new Map();
const mockAppointments: Map<string, Appointment> = new Map();
const mockAvailability: Map<string, Availability[]> = new Map();
const mockBlockedTimes: Map<string, BlockedTime> = new Map();

// Initialize mock services
const initializeServices = () => {
  const services: Service[] = [
    {
      id: 'service-1',
      name: 'Individual Therapy',
      description: 'One-on-one therapy session focused on personal growth and healing',
      duration: 50,
      price: 150,
      category: 'individual',
      isActive: true,
      color: '#8B7355'
    },
    {
      id: 'service-2',
      name: 'Couples Therapy',
      description: 'Relationship counseling for couples seeking to improve their connection',
      duration: 75,
      price: 200,
      category: 'couples',
      isActive: true,
      color: '#A0826D'
    },
    {
      id: 'service-3',
      name: 'Group Therapy',
      description: 'Small group sessions for shared experiences and peer support',
      duration: 90,
      price: 75,
      category: 'group',
      isActive: true,
      maxParticipants: 8,
      color: '#9B8B7A'
    },
    {
      id: 'service-4',
      name: 'Initial Consultation',
      description: 'First session to understand your needs and create a treatment plan',
      duration: 60,
      price: 175,
      category: 'individual',
      isActive: true,
      requiresConsultation: false,
      color: '#7A6F5D'
    },
    {
      id: 'service-5',
      name: 'Mindfulness Workshop',
      description: 'Learn practical mindfulness techniques for daily life',
      duration: 120,
      price: 50,
      category: 'workshop',
      isActive: true,
      maxParticipants: 20,
      color: '#B8A88A'
    }
  ];

  services.forEach(service => mockServices.set(service.id, service));
};

// Initialize therapist availability
const initializeAvailability = () => {
  const therapistId = 'user-2'; // Dr. Rosa Toral

  const weeklyAvailability: Availability[] = [
    // Monday
    { id: 'avail-1', therapistId, dayOfWeek: 1, startTime: '09:00', endTime: '12:00', isActive: true },
    { id: 'avail-2', therapistId, dayOfWeek: 1, startTime: '14:00', endTime: '18:00', isActive: true },
    // Tuesday
    { id: 'avail-3', therapistId, dayOfWeek: 2, startTime: '10:00', endTime: '13:00', isActive: true },
    { id: 'avail-4', therapistId, dayOfWeek: 2, startTime: '15:00', endTime: '19:00', isActive: true },
    // Wednesday
    { id: 'avail-5', therapistId, dayOfWeek: 3, startTime: '09:00', endTime: '12:00', isActive: true },
    { id: 'avail-6', therapistId, dayOfWeek: 3, startTime: '14:00', endTime: '17:00', isActive: true },
    // Thursday
    { id: 'avail-7', therapistId, dayOfWeek: 4, startTime: '10:00', endTime: '13:00', isActive: true },
    { id: 'avail-8', therapistId, dayOfWeek: 4, startTime: '15:00', endTime: '19:00', isActive: true },
    // Friday
    { id: 'avail-9', therapistId, dayOfWeek: 5, startTime: '09:00', endTime: '12:00', isActive: true },
    { id: 'avail-10', therapistId, dayOfWeek: 5, startTime: '13:00', endTime: '16:00', isActive: true }
  ];

  mockAvailability.set(therapistId, weeklyAvailability);
};

// Initialize sample appointments
const initializeSampleAppointments = () => {
  const now = new Date();
  const appointments: Appointment[] = [
    {
      id: 'appt-1',
      clientId: 'user-1',
      therapistId: 'user-2',
      serviceId: 'service-1',
      startTime: addDays(now, 2),
      endTime: addDays(setMinutes(now, 50), 2),
      status: 'confirmed',
      notes: 'Follow-up session on anxiety management',
      createdAt: now,
      updatedAt: now,
      confirmationCode: 'CONF-001',
      location: { type: 'in-person', room: 'Suite 201' },
      reminders: [
        {
          id: 'rem-1',
          appointmentId: 'appt-1',
          type: 'email',
          scheduledFor: addDays(now, 1),
          sent: false
        }
      ]
    },
    {
      id: 'appt-2',
      clientId: 'user-1',
      therapistId: 'user-2',
      serviceId: 'service-1',
      startTime: addDays(now, 9),
      endTime: addDays(setMinutes(now, 50), 9),
      status: 'scheduled',
      isRecurring: true,
      recurringId: 'recurring-1',
      recurringPattern: {
        frequency: 'weekly',
        interval: 1,
        occurrences: 8
      },
      createdAt: now,
      updatedAt: now,
      confirmationCode: 'CONF-002',
      location: { type: 'online', meetingUrl: 'https://zoom.us/j/123456789' }
    }
  ];

  appointments.forEach(appt => mockAppointments.set(appt.id, appt));
};

initializeServices();
initializeAvailability();
initializeSampleAppointments();

// Helper functions
const generateTimeSlots = (
  date: Date,
  therapistId: string,
  serviceDuration: number,
  timezone: string
): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const dayOfWeek = getDay(date);
  const availability = mockAvailability.get(therapistId) || [];
  const dayAvailability = availability.filter(a => a.dayOfWeek === dayOfWeek && a.isActive);

  dayAvailability.forEach(avail => {
    const [startHour, startMinute] = avail.startTime.split(':').map(Number);
    const [endHour, endMinute] = avail.endTime.split(':').map(Number);

    let currentTime = setMinutes(setHours(date, startHour), startMinute);
    const endTime = setMinutes(setHours(date, endHour), endMinute);

    while (currentTime < endTime) {
      const slotEnd = new Date(currentTime.getTime() + serviceDuration * 60000);

      if (slotEnd <= endTime) {
        // Check if slot conflicts with existing appointments
        const isAvailable = !Array.from(mockAppointments.values()).some(appt =>
          appt.therapistId === therapistId &&
          appt.status !== 'cancelled' &&
          isWithinInterval(currentTime, { start: appt.startTime, end: appt.endTime })
        );

        // Check blocked times
        const isBlocked = Array.from(mockBlockedTimes.values()).some(blocked =>
          (!blocked.therapistId || blocked.therapistId === therapistId) &&
          isWithinInterval(currentTime, { start: blocked.startTime, end: blocked.endTime })
        );

        slots.push({
          id: `slot-${date.getTime()}-${currentTime.getTime()}`,
          startTime: currentTime,
          endTime: slotEnd,
          isAvailable: isAvailable && !isBlocked,
          therapistId,
          serviceId: undefined
        });
      }

      currentTime = new Date(currentTime.getTime() + 30 * 60000); // 30-minute slots
    }
  });

  return slots;
};

const generateRecurringAppointments = (
  baseAppointment: Appointment,
  pattern: RecurringPattern
): Appointment[] => {
  const appointments: Appointment[] = [];
  let currentDate = new Date(baseAppointment.startTime);
  const occurrences = pattern.occurrences || 52; // Default to 1 year

  for (let i = 0; i < occurrences; i++) {
    if (pattern.endDate && currentDate > pattern.endDate) {
      break;
    }

    const appointment: Appointment = {
      ...baseAppointment,
      id: `${baseAppointment.id}-${i}`,
      startTime: new Date(currentDate),
      endTime: new Date(currentDate.getTime() + (baseAppointment.endTime.getTime() - baseAppointment.startTime.getTime())),
      recurringId: baseAppointment.recurringId || `recurring-${Date.now()}`
    };

    appointments.push(appointment);

    // Calculate next occurrence
    switch (pattern.frequency) {
      case 'daily':
        currentDate = addDays(currentDate, pattern.interval);
        break;
      case 'weekly':
        currentDate = addWeeks(currentDate, pattern.interval);
        break;
      case 'biweekly':
        currentDate = addWeeks(currentDate, pattern.interval * 2);
        break;
      case 'monthly':
        currentDate = addMonths(currentDate, pattern.interval);
        break;
    }
  }

  return appointments;
};

// Booking Service API
export const bookingService = {
  async getServices(): Promise<Service[]> {
    return Array.from(mockServices.values());
  },

  async getService(serviceId: string): Promise<Service | null> {
    return mockServices.get(serviceId) || null;
  },

  async getAvailableSlots(
    date: Date,
    serviceId: string,
    therapistId?: string,
    timezone: string = 'America/Los_Angeles'
  ): Promise<TimeSlot[]> {
    const service = mockServices.get(serviceId);
    if (!service) return [];

    const targetTherapist = therapistId || 'user-2';
    return generateTimeSlots(date, targetTherapist, service.duration, timezone);
  },

  async getAppointments(
    clientId?: string,
    therapistId?: string,
    startDate?: Date,
    endDate?: Date
  ): Promise<Appointment[]> {
    let appointments = Array.from(mockAppointments.values());

    if (clientId) {
      appointments = appointments.filter(a => a.clientId === clientId);
    }

    if (therapistId) {
      appointments = appointments.filter(a => a.therapistId === therapistId);
    }

    if (startDate && endDate) {
      appointments = appointments.filter(a =>
        isWithinInterval(a.startTime, { start: startDate, end: endDate })
      );
    }

    return appointments.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
  },

  async createBooking(request: BookingRequest, clientId: string): Promise<BookingResponse> {
    try {
      const service = mockServices.get(request.serviceId);
      if (!service) {
        return { success: false, error: 'Service not found' };
      }

      const therapistId = request.therapistId || 'user-2';

      // Convert preferred time to proper date
      const startTime = request.preferredTime
        ? parse(request.preferredTime, 'HH:mm', request.preferredDate)
        : request.preferredDate;

      const endTime = new Date(startTime.getTime() + service.duration * 60000);

      // Check availability
      const slots = await this.getAvailableSlots(
        request.preferredDate,
        request.serviceId,
        therapistId,
        request.timezone
      );

      const requestedSlot = slots.find(
        s => s.startTime.getTime() === startTime.getTime() && s.isAvailable
      );

      if (!requestedSlot) {
        // Suggest alternative slots
        const suggestedSlots = slots.filter(s => s.isAvailable).slice(0, 3);
        return {
          success: false,
          error: 'Requested time is not available',
          suggestedSlots
        };
      }

      // Create appointment
      const appointment: Appointment = {
        id: `appt-${Date.now()}`,
        clientId,
        therapistId,
        serviceId: request.serviceId,
        startTime,
        endTime,
        status: service.requiresConsultation ? 'pending' : 'scheduled',
        notes: request.notes,
        isRecurring: request.isRecurring,
        recurringPattern: request.recurringPattern,
        createdAt: new Date(),
        updatedAt: new Date(),
        confirmationCode: `CONF-${Date.now().toString(36).toUpperCase()}`,
        location: {
          type: 'in-person',
          address: '123 Wellness Way, Sonoma, CA 95476',
          room: 'Suite 201'
        },
        reminders: [
          {
            id: `rem-${Date.now()}`,
            appointmentId: `appt-${Date.now()}`,
            type: 'email',
            scheduledFor: new Date(startTime.getTime() - 24 * 60 * 60 * 1000),
            sent: false
          }
        ]
      };

      // Handle recurring appointments
      if (request.isRecurring && request.recurringPattern) {
        const recurringAppointments = generateRecurringAppointments(appointment, request.recurringPattern);
        recurringAppointments.forEach(appt => mockAppointments.set(appt.id, appt));
      } else {
        mockAppointments.set(appointment.id, appointment);
      }

      return {
        success: true,
        appointment,
        requiresConsultation: service.requiresConsultation
      };
    } catch (error) {
      console.error('Booking error:', error);
      return { success: false, error: 'Failed to create booking' };
    }
  },

  async updateAppointment(
    appointmentId: string,
    updates: Partial<Appointment>
  ): Promise<Appointment | null> {
    const appointment = mockAppointments.get(appointmentId);
    if (!appointment) return null;

    const updatedAppointment = {
      ...appointment,
      ...updates,
      updatedAt: new Date()
    };

    mockAppointments.set(appointmentId, updatedAppointment);
    return updatedAppointment;
  },

  async cancelAppointment(
    appointmentId: string,
    reason?: string
  ): Promise<{ success: boolean; error?: string }> {
    const appointment = mockAppointments.get(appointmentId);
    if (!appointment) {
      return { success: false, error: 'Appointment not found' };
    }

    // Check cancellation policy (24 hours notice)
    const hoursUntilAppointment = (appointment.startTime.getTime() - Date.now()) / (1000 * 60 * 60);
    if (hoursUntilAppointment < 24) {
      return {
        success: false,
        error: 'Appointments must be cancelled at least 24 hours in advance'
      };
    }

    appointment.status = 'cancelled';
    appointment.cancellationReason = reason;
    appointment.updatedAt = new Date();

    mockAppointments.set(appointmentId, appointment);
    return { success: true };
  },

  async rescheduleAppointment(
    appointmentId: string,
    newStartTime: Date,
    timezone: string
  ): Promise<BookingResponse> {
    const appointment = mockAppointments.get(appointmentId);
    if (!appointment) {
      return { success: false, error: 'Appointment not found' };
    }

    const service = mockServices.get(appointment.serviceId);
    if (!service) {
      return { success: false, error: 'Service not found' };
    }

    // Check new time availability
    const slots = await this.getAvailableSlots(
      newStartTime,
      appointment.serviceId,
      appointment.therapistId,
      timezone
    );

    const requestedSlot = slots.find(
      s => s.startTime.getTime() === newStartTime.getTime() && s.isAvailable
    );

    if (!requestedSlot) {
      return { success: false, error: 'New time is not available' };
    }

    // Create new appointment
    const newAppointment: Appointment = {
      ...appointment,
      id: `appt-${Date.now()}`,
      startTime: newStartTime,
      endTime: new Date(newStartTime.getTime() + service.duration * 60000),
      status: 'rescheduled',
      rescheduledFrom: appointmentId,
      updatedAt: new Date()
    };

    // Update old appointment
    appointment.status = 'rescheduled';
    appointment.rescheduledTo = newAppointment.id;
    appointment.updatedAt = new Date();

    mockAppointments.set(appointmentId, appointment);
    mockAppointments.set(newAppointment.id, newAppointment);

    return { success: true, appointment: newAppointment };
  },

  async getCalendarEvents(
    startDate: Date,
    endDate: Date,
    therapistId?: string,
    clientId?: string
  ): Promise<CalendarEvent[]> {
    const appointments = await this.getAppointments(clientId, therapistId, startDate, endDate);

    return appointments.map(appt => {
      const service = mockServices.get(appt.serviceId);
      return {
        id: appt.id,
        title: service ? service.name : 'Appointment',
        start: appt.startTime,
        end: appt.endTime,
        resource: {
          appointment: appt,
          type: 'appointment',
          color: service?.color || '#8B7355'
        }
      };
    });
  },

  async getTherapistAvailability(therapistId: string): Promise<Availability[]> {
    return mockAvailability.get(therapistId) || [];
  },

  async updateAvailability(
    therapistId: string,
    availability: Availability[]
  ): Promise<Availability[]> {
    mockAvailability.set(therapistId, availability);
    return availability;
  },

  async blockTime(blockedTime: BlockedTime): Promise<BlockedTime> {
    const id = `blocked-${Date.now()}`;
    const newBlockedTime = { ...blockedTime, id };
    mockBlockedTimes.set(id, newBlockedTime);
    return newBlockedTime;
  },

  async unblockTime(blockedTimeId: string): Promise<boolean> {
    return mockBlockedTimes.delete(blockedTimeId);
  }
};

export default bookingService;