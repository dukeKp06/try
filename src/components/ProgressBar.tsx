import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, Target } from 'lucide-react';

interface ProgressBarProps {
  completed: number;
  total: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  completed, 
  total, 
  className = '' 
}) => {
  const percentage = total > 0 ? (completed / total) * 100 : 0;
  const isComplete = completed === total && total > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isComplete ? 'bg-green-900/50' : 'bg-blue-900/50'}`}>
            {isComplete ? (
              <CheckCircle className="text-green-400" size={24} />
            ) : (
              <Target className="text-blue-400" size={24} />
            )}
          </div>
          <div>
            <h3 className="font-bold text-white">
              {isComplete ? 'All Done!' : 'Progress'}
            </h3>
            <p className="text-sm text-blue-300">
              {completed} of {total} tasks completed
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <div className={`text-2xl font-bold ${isComplete ? 'text-green-400' : 'text-blue-400'}`}>
            {Math.round(percentage)}%
          </div>
          <div className="text-xs text-blue-300">complete</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`h-full rounded-full ${
              isComplete 
                ? 'bg-gradient-to-r from-green-500 to-green-300' 
                : 'bg-gradient-to-r from-blue-600 to-blue-400'
            }`}
          />
        </div>
        
        {/* Completion celebration effect */}
        {isComplete && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="absolute -top-1 -right-1"
          >
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle size={12} className="text-black" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Task breakdown */}
      {total > 0 && (
        <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-gray-700">
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle size={16} className="text-green-400" />
            <span className="text-blue-200">{completed} completed</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Circle size={16} className="text-gray-500" />
            <span className="text-blue-200">{total - completed} remaining</span>
          </div>
        </div>
      )}
    </motion.div>
  );
};