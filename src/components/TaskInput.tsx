import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Plus, Sparkles, Loader2 } from 'lucide-react';

interface TaskInputProps {
  onSubmit: (goal: string) => void;
  isLoading?: boolean;
}

interface FormData {
  goal: string;
}

export const TaskInput: React.FC<TaskInputProps> = ({ onSubmit, isLoading = false }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const [isFocused, setIsFocused] = useState(false);

  const handleFormSubmit = (data: FormData) => {
    onSubmit(data.goal);
    reset();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto mb-8"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div className="relative">
          <motion.div
            animate={{
              scale: isFocused ? 1.02 : 1,
              boxShadow: isFocused 
                ? '0 20px 25px -5px rgb(59 130 246 / 0.3), 0 8px 10px -6px rgb(59 130 246 / 0.3)'
                : '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
            }}
            className="relative"
          >
            <textarea
              {...register('goal', { 
                required: 'Please enter a goal or feature to build',
                minLength: { value: 10, message: 'Goal should be at least 10 characters' }
              })}
              placeholder="Describe what you want to build... (e.g., 'Build a user authentication system with login and signup')"
              className="w-full p-4 pr-12 text-lg border-2 border-gray-700 rounded-xl resize-none focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-gray-900 text-white placeholder-gray-500"
              rows={3}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={isLoading}
            />
            <div className="absolute right-3 top-3 text-blue-400">
              <Sparkles size={20} />
            </div>
          </motion.div>
          
          {errors.goal && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm mt-2 ml-1"
            >
              {errors.goal.message}
            </motion.p>
          )}
        </div>

        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-black font-bold py-3 px-6 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Generating tasks...
            </>
          ) : (
            <>
              <Plus size={20} />
              Break down into tasks
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};