'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, MapPin, Video, Phone, ChevronLeft, ChevronRight, Check, X } from 'lucide-react';
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, isToday, isPast, isFuture } from 'date-fns';
import { bookingService } from '@/lib/booking/booking-service';
import { Service, TimeSlot, BookingRequest } from '@/lib/booking/types';
import { useAuth } from '@/lib/auth/auth-context';

export default function BookingPage() {
  const { user, isAuthenticated } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [locationType, setLocationType] = useState<'in-person' | 'online' | 'phone'>('in-person');
  const [notes, setNotes] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringFrequency, setRecurringFrequency] = useState<'weekly' | 'biweekly' | 'monthly'>('weekly');
  const [recurringOccurrences, setRecurringOccurrences] = useState(4);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  useEffect(() => {
    loadServices();
  }, []);

  useEffect(() => {
    if (selectedService && selectedDate) {
      loadAvailableSlots();
    }
  }, [selectedService, selectedDate]);

  const loadServices = async () => {
    try {
      const serviceList = await bookingService.getServices();
      setServices(serviceList);
    } catch (error) {
      console.error('Failed to load services:', error);
    }
  };

  const loadAvailableSlots = async () => {
    if (!selectedService) return;

    try {
      const slots = await bookingService.getAvailableSlots(
        selectedDate,
        selectedService.id,
        undefined,
        Intl.DateTimeFormat().resolvedOptions().timeZone
      );
      setAvailableSlots(slots);
    } catch (error) {
      console.error('Failed to load available slots:', error);
    }
  };

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setCurrentStep(2);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setCurrentStep(3);
  };

  const handleBookingSubmit = async () => {
    if (!selectedService || !selectedSlot || !user) return;

    setIsLoading(true);
    try {
      const bookingRequest: BookingRequest = {
        serviceId: selectedService.id,
        preferredDate: selectedSlot.startTime,
        notes,
        isRecurring,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        recurringPattern: isRecurring
          ? {
              frequency: recurringFrequency,
              interval: recurringFrequency === 'biweekly' ? 2 : 1,
              occurrences: recurringOccurrences
            }
          : undefined
      };

      const response = await bookingService.createBooking(bookingRequest, user.id);

      if (response.success && response.appointment) {
        setBookingSuccess(true);
        setConfirmationCode(response.appointment.confirmationCode || '');
        setCurrentStep(4);
      }
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderCalendar = () => {
    const monthStart = startOfWeek(currentMonth);
    const monthEnd = endOfWeek(addDays(currentMonth, 30));
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-earth-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-earth-800">Select a Date</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentMonth(addDays(currentMonth, -30))}
              className="p-2 hover:bg-earth-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-earth-600" />
            </button>
            <span className="text-earth-700 font-medium px-3">
              {format(currentMonth, 'MMMM yyyy')}
            </span>
            <button
              onClick={() => setCurrentMonth(addDays(currentMonth, 30))}
              className="p-2 hover:bg-earth-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-earth-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-earth-600 py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((day, idx) => {
            const isSelected = isSameDay(day, selectedDate);
            const isCurrentDay = isToday(day);
            const isPastDay = isPast(day) && !isCurrentDay;
            const isCurrentMonth = day.getMonth() === currentMonth.getMonth();

            return (
              <motion.button
                key={idx}
                whileHover={!isPastDay ? { scale: 1.05 } : {}}
                whileTap={!isPastDay ? { scale: 0.95 } : {}}
                onClick={() => !isPastDay && handleDateSelect(day)}
                disabled={isPastDay}
                className={`
                  p-3 rounded-lg transition-all relative
                  ${isSelected ? 'bg-earth-600 text-white' : ''}
                  ${isCurrentDay && !isSelected ? 'bg-sage-100 text-earth-800' : ''}
                  ${!isSelected && !isCurrentDay && isCurrentMonth ? 'hover:bg-earth-100 text-earth-700' : ''}
                  ${!isCurrentMonth ? 'text-earth-400' : ''}
                  ${isPastDay ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                <span className="text-sm">{format(day, 'd')}</span>
                {isCurrentDay && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-terracotta-500 rounded-full" />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderTimeSlots = () => {
    const morningSlots = availableSlots.filter(slot => {
      const hour = slot.startTime.getHours();
      return hour < 12;
    });

    const afternoonSlots = availableSlots.filter(slot => {
      const hour = slot.startTime.getHours();
      return hour >= 12 && hour < 17;
    });

    const eveningSlots = availableSlots.filter(slot => {
      const hour = slot.startTime.getHours();
      return hour >= 17;
    });

    const renderSlotGroup = (title: string, slots: TimeSlot[]) => (
      <div className="mb-6">
        <h4 className="text-sm font-medium text-earth-600 mb-3">{title}</h4>
        <div className="grid grid-cols-3 gap-2">
          {slots.map(slot => (
            <motion.button
              key={slot.id}
              whileHover={slot.isAvailable ? { scale: 1.05 } : {}}
              whileTap={slot.isAvailable ? { scale: 0.95 } : {}}
              onClick={() => slot.isAvailable && handleSlotSelect(slot)}
              disabled={!slot.isAvailable}
              className={`
                py-2 px-3 rounded-lg text-sm font-medium transition-all
                ${selectedSlot?.id === slot.id
                  ? 'bg-earth-600 text-white'
                  : slot.isAvailable
                  ? 'bg-white hover:bg-earth-50 text-earth-700 border border-earth-300'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              {format(slot.startTime, 'h:mm a')}
            </motion.button>
          ))}
        </div>
      </div>
    );

    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-earth-200">
        <h3 className="text-xl font-semibold text-earth-800 mb-4">
          Available Times for {format(selectedDate, 'EEEE, MMMM d')}
        </h3>

        {availableSlots.length === 0 ? (
          <p className="text-earth-600 text-center py-8">No available slots for this date</p>
        ) : (
          <>
            {morningSlots.length > 0 && renderSlotGroup('Morning', morningSlots)}
            {afternoonSlots.length > 0 && renderSlotGroup('Afternoon', afternoonSlots)}
            {eveningSlots.length > 0 && renderSlotGroup('Evening', eveningSlots)}
          </>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sand-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map(step => (
              <React.Fragment key={step}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-medium
                    ${currentStep >= step
                      ? 'bg-earth-600 text-white'
                      : 'bg-earth-200 text-earth-500'
                    }
                  `}
                >
                  {bookingSuccess && step === 4 ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    step
                  )}
                </motion.div>
                {step < 4 && (
                  <div
                    className={`w-20 h-0.5 ${
                      currentStep > step ? 'bg-earth-600' : 'bg-earth-200'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Select Service */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-earth-800 mb-8 text-center">
                Select a Service
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {services.map(service => (
                  <motion.div
                    key={service.id}
                    whileHover={{ y: -5 }}
                    onClick={() => handleServiceSelect(service)}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-earth-200 cursor-pointer hover:shadow-xl transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-semibold text-earth-800">{service.name}</h3>
                      <span className="text-earth-600 font-medium">${service.price}</span>
                    </div>
                    <p className="text-earth-600 mb-4">{service.description}</p>
                    <div className="flex items-center justify-between text-sm text-earth-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {service.duration} minutes
                      </span>
                      {service.maxParticipants && (
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          Max {service.maxParticipants} participants
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Select Date and Time */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-6xl mx-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="flex items-center gap-2 text-earth-600 hover:text-earth-700"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Back to Services
                </button>
                <h2 className="text-3xl font-bold text-earth-800">
                  Schedule Your {selectedService?.name}
                </h2>
                <div className="w-32" />
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {renderCalendar()}
                {renderTimeSlots()}
              </div>
            </motion.div>
          )}

          {/* Step 3: Booking Details */}
          {currentStep === 3 && selectedService && selectedSlot && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-earth-200">
                <h2 className="text-2xl font-bold text-earth-800 mb-6">Booking Details</h2>

                {/* Summary */}
                <div className="bg-sand-50 rounded-xl p-6 mb-6">
                  <h3 className="font-semibold text-earth-800 mb-4">Appointment Summary</h3>
                  <div className="space-y-3 text-earth-600">
                    <div className="flex justify-between">
                      <span>Service:</span>
                      <span className="font-medium">{selectedService.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span className="font-medium">{format(selectedSlot.startTime, 'EEEE, MMMM d, yyyy')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time:</span>
                      <span className="font-medium">
                        {format(selectedSlot.startTime, 'h:mm a')} - {format(selectedSlot.endTime, 'h:mm a')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="font-medium">{selectedService.duration} minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Price:</span>
                      <span className="font-medium">${selectedService.price}</span>
                    </div>
                  </div>
                </div>

                {/* Session Type */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-earth-700 mb-3">
                    Session Type
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'in-person', icon: MapPin, label: 'In-Person' },
                      { value: 'online', icon: Video, label: 'Video Call' },
                      { value: 'phone', icon: Phone, label: 'Phone' }
                    ].map(type => (
                      <button
                        key={type.value}
                        onClick={() => setLocationType(type.value as any)}
                        className={`
                          flex flex-col items-center gap-2 py-3 px-4 rounded-lg border transition-all
                          ${locationType === type.value
                            ? 'bg-earth-600 text-white border-earth-600'
                            : 'bg-white text-earth-600 border-earth-300 hover:bg-earth-50'
                          }
                        `}
                      >
                        <type.icon className="w-5 h-5" />
                        <span className="text-sm font-medium">{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recurring Appointment */}
                <div className="mb-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isRecurring}
                      onChange={(e) => setIsRecurring(e.target.checked)}
                      className="w-5 h-5 text-earth-600 rounded focus:ring-earth-500"
                    />
                    <span className="text-earth-700 font-medium">Make this a recurring appointment</span>
                  </label>

                  {isRecurring && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 space-y-4 pl-8"
                    >
                      <div>
                        <label className="block text-sm text-earth-600 mb-2">Frequency</label>
                        <select
                          value={recurringFrequency}
                          onChange={(e) => setRecurringFrequency(e.target.value as any)}
                          className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-earth-500"
                        >
                          <option value="weekly">Weekly</option>
                          <option value="biweekly">Every 2 Weeks</option>
                          <option value="monthly">Monthly</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-earth-600 mb-2">
                          Number of Sessions
                        </label>
                        <input
                          type="number"
                          min="2"
                          max="52"
                          value={recurringOccurrences}
                          onChange={(e) => setRecurringOccurrences(parseInt(e.target.value))}
                          className="w-full px-4 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-earth-500"
                        />
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Notes */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-earth-700 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    placeholder="Any specific concerns or topics you'd like to discuss..."
                    className="w-full px-4 py-3 border border-earth-300 rounded-lg focus:ring-2 focus:ring-earth-500 resize-none"
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="flex-1 py-3 px-6 border border-earth-300 text-earth-700 rounded-lg hover:bg-earth-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleBookingSubmit}
                    disabled={isLoading || !isAuthenticated}
                    className="flex-1 py-3 px-6 bg-earth-600 text-white rounded-lg hover:bg-earth-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Booking...' : isAuthenticated ? 'Confirm Booking' : 'Login to Book'}
                  </button>
                </div>

                {!isAuthenticated && (
                  <p className="text-sm text-earth-600 text-center mt-4">
                    Please <a href="/login" className="text-earth-700 font-medium underline">login</a> or{' '}
                    <a href="/signup" className="text-earth-700 font-medium underline">create an account</a> to book an appointment
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && bookingSuccess && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-earth-200">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Check className="w-10 h-10 text-green-600" />
                </motion.div>

                <h2 className="text-3xl font-bold text-earth-800 mb-4">Booking Confirmed!</h2>

                <p className="text-earth-600 mb-6">
                  Your appointment has been successfully scheduled. We've sent a confirmation email with all the details.
                </p>

                <div className="bg-sand-50 rounded-xl p-6 mb-6">
                  <p className="text-sm text-earth-500 mb-2">Confirmation Code</p>
                  <p className="text-2xl font-bold text-earth-800">{confirmationCode}</p>
                </div>

                <div className="flex gap-4">
                  <a
                    href="/portal"
                    className="flex-1 py-3 px-6 bg-earth-600 text-white rounded-lg hover:bg-earth-700 transition-colors inline-block"
                  >
                    Go to Portal
                  </a>
                  <button
                    onClick={() => {
                      setCurrentStep(1);
                      setSelectedService(null);
                      setSelectedSlot(null);
                      setBookingSuccess(false);
                    }}
                    className="flex-1 py-3 px-6 border border-earth-300 text-earth-700 rounded-lg hover:bg-earth-50 transition-colors"
                  >
                    Book Another
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}