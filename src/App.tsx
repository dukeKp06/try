import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, Sparkles, Github, ExternalLink } from 'lucide-react';
import { TaskInput } from './components/TaskInput';
import { TaskList } from './components/TaskList';
import { ProgressBar } from './components/ProgressBar';
import { CodeSuggestion } from './components/CodeSuggestion';
import type { Task } from './types/task';
import { generateSubtasks } from './lib/ai';


function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [currentGoal, setCurrentGoal] = useState<string>('');

  const handleGoalSubmit = async (goal: string) => {
    setIsLoading(true);
    setCurrentGoal(goal);
    try {
      const newTasks = await generateSubtasks(goal);
      setTasks(newTasks);
    } catch (error) {
      console.error('Error generating tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTaskToggle = (id: string) => {
    console.log('Toggling task completion for ID:', id);
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleTaskEdit = (id: string, newTitle: string) => {
    console.log('Editing task ID:', id, 'with new title:', newTitle);
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, title: newTitle } : task
    ));
  };

  const handleTaskDelete = (id: string) => {
    console.log('handleTaskDelete called with ID:', id);
    console.log('Current tasks before deletion:', tasks);
    const newTasks = tasks.filter(task => task.id !== id);
    console.log('Tasks after filtering:', newTasks);
    setTasks(newTasks);
    console.log('Tasks state updated');
  };

  const handleTaskReorder = (newTasks: Task[]) => {
    setTasks(newTasks);
  };

  const handleShowCode = (task: Task) => {
    setSelectedTask(task);
  };

  const completedTasks = tasks.filter(task => task.completed).length;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Starry background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Stars layer 1 - small, subtle */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={`star-1-${i}`}
              className="absolute rounded-full bg-white animate-twinkle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                opacity: Math.random() * 0.5 + 0.1,
                animationDuration: `${Math.random() * 3 + 2}s`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
        
        {/* Stars layer 2 - medium */}
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={`star-2-${i}`}
              className="absolute rounded-full bg-blue-200 animate-twinkle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                opacity: Math.random() * 0.3 + 0.1,
                animationDuration: `${Math.random() * 4 + 3}s`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600/20 to-blue-400/20 backdrop-blur-md border-b border-blue-300/30 sticky top-0 z-40"
      >
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/80 rounded-lg">
                <Layers className="text-blue-600" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Traycer AI</h1>
                <p className="text-sm text-blue-100">Planning layer for coding agents</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-blue-100 hover:text-white hover:bg-blue-500/20 rounded-lg transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="https://traycer.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-white/80 text-blue-600 font-bold rounded-lg text-sm transition-all hover:bg-white"
              >
                <ExternalLink size={16} />
                Visit Traycer
              </a>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="text-blue-400" size={32} />
            <h2 className="text-4xl font-bold text-white">
              Break Down Your Ideas
            </h2>
          </div>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            Transform high-level goals into actionable tasks. Our AI-powered planning layer 
            helps you structure your development process efficiently.
          </p>
        </motion.div>

        {/* Task Input */}
        <TaskInput onSubmit={handleGoalSubmit} isLoading={isLoading} />

        {/* Current Goal Display */}
        {currentGoal && tasks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-r from-blue-900/50 to-blue-800/50 backdrop-blur-sm rounded-xl p-4 border border-blue-700">
              <h3 className="font-bold text-blue-300 mb-1">Current Goal:</h3>
              <p className="text-white font-medium">{currentGoal}</p>
            </div>
          </motion.div>
        )}

        {/* Progress Bar */}
        {tasks.length > 0 && (
          <div className="mb-8">
            <ProgressBar completed={completedTasks} total={tasks.length} />
          </div>
        )}

        {/* Task List */}
        <div className="mb-8">
          <TaskList
            tasks={tasks}
            onReorder={handleTaskReorder}
            onToggle={handleTaskToggle}
            onEdit={handleTaskEdit}
            onDelete={handleTaskDelete}
            onShowCode={handleShowCode}
          />
        </div>

        {/* Footer */}
        {tasks.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-blue-400 mb-4">
              <Layers size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-xl font-bold">Ready to start planning?</p>
              <p className="text-blue-300">Enter your development goal above to get started</p>
            </div>
          </motion.div>
        )}
      </main>

      {/* Code Suggestion Modal */}
      <CodeSuggestion
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
      />

      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-900 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-800 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>
    </div>
  );
}

export default App;