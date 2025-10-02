import React, { useState } from 'react';
import { Check, Edit3, Trash2, Code, X, Save, GripVertical } from 'lucide-react';
import type { Task } from '../types/task';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
  onDelete: (id: string) => void;
  onShowCode?: (task: Task) => void;
  isDragging?: boolean;
  dragListeners?: SyntheticListenerMap;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onToggle,
  onEdit,
  onDelete,
  onShowCode,
  isDragging = false,
  dragListeners,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);

  const handleSave = () => {
    if (editValue.trim()) {
      onEdit(task.id, editValue.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditValue(task.title);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div
      className={`group bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg border-2 p-4 transition-all duration-200 ${
        isDragging
          ? 'border-blue-400 bg-blue-900/30 rotate-2 shadow-2xl z-50'
          : task.completed 
          ? 'border-blue-500/50 bg-blue-900/20' 
          : 'border-gray-700 hover:border-blue-600'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Drag Handle */}
        <div 
          {...dragListeners}
          className="flex-shrink-0 p-1 text-gray-500 hover:text-blue-400 cursor-grab active:cursor-grabbing"
        >
          <GripVertical size={16} />
        </div>
        
        {/* Checkbox */}
        <button
          onClick={() => onToggle(task.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            task.completed
              ? 'bg-gradient-to-r from-blue-500 to-blue-300 border-blue-400 text-black'
              : 'border-gray-500 hover:border-blue-400'
          }`}
        >
          {task.completed && <Check size={14} className="font-bold" />}
        </button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-2">
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={handleKeyPress}
                className="w-full p-2 border border-blue-600 rounded bg-gray-800 text-white focus:border-blue-400 focus:outline-none"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-blue-600 to-blue-400 text-black font-bold rounded text-sm hover:from-blue-500 hover:to-blue-300"
                >
                  <Save size={12} />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-1 px-2 py-1 bg-gray-700 text-white font-bold rounded text-sm hover:bg-gray-600"
                >
                  <X size={12} />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className={`text-white font-medium leading-relaxed ${
              task.completed ? 'line-through text-blue-300' : ''
            }`}>
              {task.title}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        {!isEditing && (
          <div className="flex items-center gap-1 opacity-100">
            {onShowCode && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onShowCode(task);
                }}
                className="p-1.5 text-blue-400 hover:bg-blue-900/50 rounded transition-colors"
                title="Show code suggestion"
              >
                <Code size={16} />
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
              className="p-1.5 text-gray-400 hover:bg-gray-700 rounded transition-colors"
              title="Edit task"
            >
              <Edit3 size={16} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                console.log('Delete button clicked for task:', task.id);
                onDelete(task.id);
              }}
              className="p-1.5 text-red-400 hover:bg-red-900/50 rounded transition-colors"
              title="Delete task"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};