'use client';

import BreathingExercise from '@/components/wellness/BreathingExercise';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function BreathingExercisePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50 to-white py-20">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href="/wellness-tools"
            className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-800 transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            Back to Wellness Tools
          </Link>
        </motion.div>

        <BreathingExercise />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-white rounded-2xl shadow-soft p-8 text-center"
        >
          <h3 className="text-xl font-light text-stone-800 mb-4">Need More Support?</h3>
          <p className="text-stone-600 mb-6">
            While breathing exercises are helpful tools, professional therapy provides comprehensive support
            for your mental health journey.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-sage-600 text-white rounded-full hover:bg-sage-700 transition-colors"
          >
            Schedule a Consultation
          </Link>
        </motion.div>
      </div>
    </div>
  );
}