import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { FAQS } from '../constants';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <motion.section 
      className="py-24 px-4 md:px-12 w-full max-w-4xl mx-auto relative z-10"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <div className="mb-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Frequently Asked Questions</h2>
        <p className="text-gray-400 font-mono text-sm">Everything you need to know before we start.</p>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, index) => (
          <div 
            key={index} 
            className="bg-glass border border-white/5 rounded-xl overflow-hidden transition-all hover:border-white/20"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
            >
              <span className={`font-bold text-lg transition-colors ${openIndex === index ? 'text-accent' : 'text-white'}`}>
                {faq.question}
              </span>
              <div className={`p-2 rounded-full bg-white/5 transition-transform duration-300 ${openIndex === index ? 'rotate-180 bg-accent/20 text-accent' : 'text-gray-400'}`}>
                {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
              </div>
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default FAQ;