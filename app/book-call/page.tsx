'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Check, AlertCircle, Video, Phone, MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';

const AVAILABLE_TIMES = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
  '05:00 PM', '05:30 PM', '06:00 PM'
];

const CALL_TYPES = [
  { id: 'video', label: 'Video Call', icon: Video, description: 'Google Meet / Zoom' },
  { id: 'phone', label: 'Phone Call', icon: Phone, description: 'Traditional voice call' },
  { id: 'chat', label: 'Text Chat', icon: MessageSquare, description: 'WhatsApp / Telegram' },
];

export default function BookCallPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    callType: 'video',
    date: '',
    time: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    topic: '',
    additionalInfo: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/book-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to book call');

      setIsSubmitting(false);
      setSubmitted(true);
    } catch (err) {
      console.error('Error:', err);
      setIsSubmitting(false);
      setError('Something went wrong. Please try emailing me directly at manojchundru5@gmail.com');
    }
  };

  if (submitted) {
    return (
      <>
        <div className="min-h-screen bg-space flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-glass border border-white/10 rounded-3xl p-8 backdrop-blur-md text-center"
        >
          <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-green-500/50">
            <Check size={40} />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">Call Booked!</h2>
          <p className="text-gray-400 mb-2">
            Thanks for booking a call with me. I've sent a confirmation email to <strong className="text-accent">{formData.email}</strong>
          </p>
          <p className="text-sm text-gray-500 mb-6">
            You'll receive a calendar invite and meeting link shortly.
          </p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-accent text-black font-bold rounded-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-space py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-gray-400 hover:text-accent transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Book a Strategy Call
          </h1>
          <p className="text-gray-400 text-lg">
            Let's discuss your project and see how I can help you achieve your goals.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  step >= s
                    ? 'bg-accent text-black'
                    : 'bg-white/5 text-gray-500 border border-white/10'
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div className={`w-16 h-1 rounded-full ${step > s ? 'bg-accent' : 'bg-white/10'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-glass border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-md"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Personal Info */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <h3 className="text-2xl font-bold text-white mb-6">Your Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-mono text-gray-400 mb-2 block">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-accent outline-none transition-colors"
                      placeholder="Enter Your Name"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-mono text-gray-400 mb-2 block">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-accent outline-none transition-colors"
                      placeholder="Enter Your Email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-mono text-gray-400 mb-2 block">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-accent outline-none transition-colors"
                      placeholder="Enter Your Phone Number"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-mono text-gray-400 mb-2 block">Company (Optional)</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-accent outline-none transition-colors"
                      placeholder="Enter Your Company Name"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (!formData.name || !formData.email || !formData.phone) {
                      alert('Please fill in all required fields');
                      return;
                    }
                    setStep(2);
                  }}
                  className="w-full py-4 bg-accent text-black font-bold rounded-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all"
                >
                  Continue to Schedule
                </button>
              </motion.div>
            )}

            {/* Step 2: Call Type & Schedule */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-white mb-6">Choose Call Type & Time</h3>

                {/* Call Type Selection */}
                <div>
                  <label className="text-sm font-mono text-gray-400 mb-3 block">Call Type *</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {CALL_TYPES.map((type) => {
                      const Icon = type.icon;
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, callType: type.id })}
                          className={`p-4 rounded-xl border transition-all text-left ${
                            formData.callType === type.id
                              ? 'bg-accent/10 border-accent text-white'
                              : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30'
                          }`}
                        >
                          <Icon size={24} className="mb-2" />
                          <div className="font-bold text-sm">{type.label}</div>
                          <div className="text-xs opacity-70">{type.description}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-mono text-gray-400 mb-2 block flex items-center gap-2">
                      <Calendar size={16} />
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-accent outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-mono text-gray-400 mb-2 block flex items-center gap-2">
                      <Clock size={16} />
                      Preferred Time *
                    </label>
                    <select
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-accent outline-none transition-colors"
                    >
                      <option value="" className="bg-black">Select Time</option>
                      {AVAILABLE_TIMES.map((time) => (
                        <option key={time} value={time} className="bg-black">
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="text-sm text-gray-500 bg-white/5 p-3 rounded-lg">
                  <strong>Your Timezone:</strong> {formData.timezone}
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-lg hover:bg-white/10 transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!formData.date || !formData.time) {
                        alert('Please select both date and time');
                        return;
                      }
                      setStep(3);
                    }}
                    className="flex-1 py-4 bg-accent text-black font-bold rounded-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all"
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Topic & Submit */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-white mb-6">Tell Me About Your Project</h3>

                <div>
                  <label className="text-sm font-mono text-gray-400 mb-2 block">Main Topic *</label>
                  <input
                    type="text"
                    required
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-accent outline-none transition-colors"
                    placeholder="Enter Discussion Topic"
                  />
                </div>

                <div>
                  <label className="text-sm font-mono text-gray-400 mb-2 block">Additional Information</label>
                  <textarea
                    value={formData.additionalInfo}
                    onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-accent outline-none transition-colors h-32 resize-none"
                    placeholder="Enter Additional Details (Optional)"
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg">
                    <AlertCircle size={16} />
                    {error}
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={isSubmitting}
                    className="flex-1 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-lg hover:bg-white/10 transition-all disabled:opacity-50"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-4 bg-accent text-black font-bold rounded-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? 'Booking...' : 'Confirm Booking'}
                  </button>
                </div>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
    </>
  );
}
