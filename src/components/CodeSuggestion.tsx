import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Code, Loader2 } from 'lucide-react';
import type { Task } from '../types/task';
import { generateCodeSuggestion } from '../lib/ai';

interface CodeSuggestionProps {
  task: Task | null;
  onClose: () => void;
}

export const CodeSuggestion: React.FC<CodeSuggestionProps> = ({ task, onClose }) => {
  const [code, setCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (task) {
      setIsLoading(true);
      generateCodeSuggestion(task.title)
        .then(setCode)
        .finally(() => setIsLoading(false));
    }
  }, [task]);

  const handleCopy = async () => {
    if (code) {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!task) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden border border-gray-700"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg">
                <Code className="text-black" size={20} />
              </div>
              <div>
                <h3 className="font-bold text-white">Code Suggestion</h3>
                <p className="text-sm text-blue-300 truncate max-w-md">{task.title}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                onClick={handleCopy}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 rounded-lg text-sm font-bold transition-all text-white"
                disabled={isLoading || !code}
              >
                {copied ? (
                  <>
                    <Check size={16} className="text-white" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    Copy
                  </>
                )}
              </motion.button>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X size={20} className="text-white" />
              </motion.button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-auto max-h-[60vh]">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center gap-3 text-blue-300">
                  <Loader2 size={20} className="animate-spin" />
                  Generating code suggestion...
                </div>
              </div>
            ) : (
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm leading-relaxed border border-gray-700">
                  <code>{code}</code>
                </pre>
                
                {/* Language indicator */}
                <div className="absolute top-2 right-2 px-2 py-1 bg-blue-900 text-blue-300 text-xs rounded">
                  JavaScript/TypeScript
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-900/50 border-t border-gray-700">
            <p className="text-xs text-blue-300">
              💡 This is a mock code suggestion. In a real implementation, this would be powered by an AI model like GPT-4.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};