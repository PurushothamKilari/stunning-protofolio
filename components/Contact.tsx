import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, Calendar, Check, AlertCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Send to your backend API that handles email delivery
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formState)
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setIsSubmitting(false);
      setSubmitted(true);
      setFormState({ name: '', email: '', service: '', message: '' });
    } catch (err) {
      console.error('Error:', err);
      setIsSubmitting(false);
      setError(
        'Something went wrong. Please try emailing me directly at manojchundru5@gmail.com'
      );
    }
  };

  return (
    <motion.section
      id="contact"
      className="py-24 px-4 md:px-12 w-full max-w-5xl mx-auto relative z-10"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8 }}
    >
      <div className="bg-glass border border-white/10 rounded-3xl p-6 md:p-12 backdrop-blur-md overflow-hidden relative">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
          <div>
            <span className="text-accent font-mono text-xs font-bold tracking-wider uppercase mb-2 block">
              Open to Roles & Consulting
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Let&apos;s Optimize Your
              <br />
              Operations.
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              I help manufacturing plants and operations teams reduce defects,
              cut cycle times, and unlock measurable cost savings using Lean,
              Six Sigma, and data-driven decision making. Share your current
              challenges, and we&apos;ll explore practical improvement
              opportunities.
            </p>

            <div className="flex flex-col gap-4">
              <a
                href="mailto:manojchundru5@gmail.com"
                className="flex items-center gap-4 text-white hover:text-accent transition-colors group p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-mono">
                    Email Me
                  </div>
                  <div className="font-bold text-sm md:text-base break-all">
                    manojchundru5@gmail.com
                  </div>
                </div>
              </a>

              <a
                href="/book-call"
                className="flex items-center gap-4 text-white hover:text-accent transition-colors group p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 cursor-hover"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Calendar size={18} />
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-mono">
                    Process Review Call
                  </div>
                  <div className="font-bold">Book a 15-min Discovery Chat</div>
                </div>
              </a>
            </div>
          </div>

          <div className="bg-black/40 p-6 rounded-2xl border border-white/5">
            {!submitted ? (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div>
                  <label className="text-xs font-mono text-gray-400 mb-2 block">
                    Name
                  </label>
                  <input
                    type="text"
                    name="user_name"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-base text-white focus:border-accent outline-none transition-colors appearance-none"
                    placeholder="Enter your name"
                    value={formState.name}
                    onChange={e =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-gray-400 mb-2 block">
                    Work Email
                  </label>
                  <input
                    type="email"
                    name="user_email"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-base text-white focus:border-accent outline-none transition-colors appearance-none"
                    placeholder="Enter your email"
                    value={formState.email}
                    onChange={e =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-gray-400 mb-2 block">
                    Engagement Type
                  </label>
                  <select
                    name="service"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-base text-white focus:border-accent outline-none transition-colors appearance-none"
                    value={formState.service}
                    onChange={e =>
                      setFormState({ ...formState, service: e.target.value })
                    }
                  >
                    <option value="" className="bg-black text-gray-500">
                      Select engagement type
                    </option>
                    <option
                      value="Lean / Continuous Improvement"
                      className="bg-black"
                    >
                      Lean / Continuous Improvement
                    </option>
                    <option
                      value="Six Sigma / Quality Improvement"
                      className="bg-black"
                    >
                      Six Sigma / Quality Improvement
                    </option>
                    <option value="EHS & Safety" className="bg-black">
                      EHS & Safety
                    </option>
                    <option
                      value="Data & Performance Analytics"
                      className="bg-black"
                    >
                      Data &amp; Performance Analytics
                    </option>
                    <option
                      value="Operations / Plant Consultation"
                      className="bg-black"
                    >
                      Operations / Plant Consultation
                    </option>
                    <option value="Full-time Opportunity" className="bg-black">
                      Full-time Opportunity
                    </option>
                    <option value="Other" className="bg-black">
                      Other
                    </option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono text-gray-400 mb-2 block">
                    Current Situation & Goals
                  </label>
                  <textarea
                    name="message"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-base text-white focus:border-accent outline-none transition-colors h-32 resize-none appearance-none"
                    placeholder="Share your plant / process details, current challenges (defects, cycle time, bottlenecks, safety, etc.) and what success would look like."
                    value={formState.message}
                    onChange={e =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg">
                    <AlertCircle size={16} />
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-accent text-black font-bold rounded-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all flex items-center justify-center gap-2 cursor-hover disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <ArrowUpRight size={18} />
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center p-8"
              >
                <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-4 border border-green-500/50">
                  <Check size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-400 text-sm">
                  Thanks for reaching out. I&apos;ll get back to you within 1–2
                  business days.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-accent text-sm hover:underline cursor-hover"
                >
                  Send another message
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
