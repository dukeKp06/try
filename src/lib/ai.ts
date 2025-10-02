import type { Task } from '../types/task';

// Function to list available models
async function listAvailableModels(apiKey: string) {
  try {
    console.log('Attempting to list available models...');
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models`, {
      headers: {
        'x-goog-api-key': apiKey,
      },
    });
    
    if (!response.ok) {
      console.error('Error listing models:', response.status, response.statusText);
      return;
    }
    
    const data = await response.json();
    console.log('Available models:', data.models?.map((m: any) => m.name));
  } catch (error) {
    console.error('Error listing models:', error);
  }
}

// Get API key from environment variables
const apiKey = typeof import.meta !== 'undefined' ? import.meta.env.VITE_GOOGLE_GEMINI_API_KEY : undefined;
console.log('Gemini API Key present:', !!apiKey);
console.log('Gemini API Key value (first 5 chars):', apiKey ? apiKey.substring(0, 5) + '...' : 'N/A');

// Validate API key format (should start with AIza)
if (apiKey && !apiKey.startsWith('AIza')) {
  console.error('Invalid API key format. API keys should start with "AIza"');
} else if (apiKey) {
  console.log('API key format appears valid');
  
  // Try to list available models
  listAvailableModels(apiKey);
}

// Mock AI task breakdown - replace with OpenAI API if needed
export const generateSubtasks = async (goal: string): Promise<Task[]> => {
  // Use Gemini if available, otherwise fallback to mock
  if (apiKey) {
    try {
      console.log('Generating tasks with Gemini API directly');
      
      const prompt = `Break down the following development goal into specific, actionable subtasks. 
      Return only a numbered list of tasks, one per line, without any additional text or formatting.
      
      Goal: ${goal}
      
      Example format:
      1. Research and plan the implementation
      2. Set up the basic structure
      3. Implement core functionality
      4. Add error handling
      5. Write tests
      6. Review and refactor code`;

      console.log('Sending prompt to Gemini API directly');
      console.log('Request URL:', `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-latest:generateContent`);
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-latest:generateContent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          }
        })
      });

      if (!response.ok) {
        // Try to read the error response body for more details
        let errorDetails = '';
        try {
          const errorText = await response.text();
          errorDetails = `. Error details: ${errorText}`;
        } catch (e) {
          errorDetails = `. Could not read error details.`;
        }
        console.error('Gemini API error:', response.status, response.statusText, errorDetails);
        throw new Error(`API request failed with status ${response.status}${errorDetails}`);
      }

      const result = await response.json();
      const generatedText = result.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!generatedText) {
        console.error('No text generated from Gemini API');
        throw new Error('No content generated');
      }

      console.log('Gemini response text:', generatedText);
      
      // Parse the numbered list into tasks
      const tasks = generatedText.split('\n')
        .filter((line: string) => line.trim() !== '')
        .map((line: string, index: number) => {
          // Remove numbering and clean up the task text
          const cleanedLine = line.replace(/^\d+\.\s*/, '').trim();
          return {
            id: `task-${Date.now()}-${index}`,
            title: cleanedLine,
            completed: false
          };
        });
      
      return tasks;
    } catch (error: any) {
      console.error('Error generating tasks with Gemini:', error);
      // Fallback to mock implementation
    }
  }
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const taskTemplates: Record<string, string[]> = {
    'login': [
      'Design login UI components',
      'Create authentication API endpoints',
      'Implement form validation',
      'Add password hashing',
      'Set up JWT token management',
      'Create protected route middleware',
      'Add error handling and feedback'
    ],
    'dashboard': [
      'Design dashboard layout',
      'Create data visualization components',
      'Set up API data fetching',
      'Implement responsive design',
      'Add loading states',
      'Create user navigation'
    ],
    'api': [
      'Design API schema',
      'Set up database models',
      'Create CRUD endpoints',
      'Add authentication middleware',
      'Implement error handling',
      'Write API documentation',
      'Add input validation'
    ]
  };

  // Simple keyword matching for demo
  const goalLower = goal.toLowerCase();
  let tasks: string[] = [];
  
  for (const [key, taskList] of Object.entries(taskTemplates)) {
    if (goalLower.includes(key)) {
      tasks = taskList;
      break;
    }
  }
  
  // Fallback generic tasks
  if (tasks.length === 0) {
    tasks = [
      'Research and plan the implementation',
      'Set up the basic structure',
      'Implement core functionality',
      'Add error handling',
      'Write tests',
      'Review and refactor code'
    ];
  }

  return tasks.map((task, index) => ({
    id: `task-${Date.now()}-${index}`,
    title: task,
    completed: false
  }));
};

// Export a function to demonstrate the direct API call
export const getDirectApiUrl = (): string => {
  if (apiKey) {
    return `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-latest:generateContent (with x-goog-api-key header)`;
  }
  return 'API key not available';
};

export const generateCodeSuggestion = async (taskTitle: string): Promise<string> => {
  // Use Gemini if available, otherwise fallback to mock
  if (apiKey) {
    try {
      console.log('Generating code suggestion with Gemini API directly');
      
      const prompt = `Provide a code example for the following task. 
      Return only the code without any additional explanation or formatting.
      
      Task: ${taskTitle}`;

      console.log('Sending prompt to Gemini API directly for code suggestion');
      console.log('Request URL:', `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-latest:generateContent`);
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-latest:generateContent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          }
        })
      });

      if (!response.ok) {
        // Try to read the error response body for more details
        let errorDetails = '';
        try {
          const errorText = await response.text();
          errorDetails = `. Error details: ${errorText}`;
        } catch (e) {
          errorDetails = `. Could not read error details.`;
        }
        console.error('Gemini API error:', response.status, response.statusText, errorDetails);
        throw new Error(`API request failed with status ${response.status}${errorDetails}`);
      }

      const result = await response.json();
      const generatedText = result.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!generatedText) {
        console.error('No text generated from Gemini API');
        throw new Error('No content generated');
      }

      console.log('Gemini code suggestion:', generatedText);
      
      return generatedText;
    } catch (error: any) {
      console.error('Error generating code suggestion with Gemini:', error);
      // Fallback to mock implementation
    }
  }
  
  // Mock code suggestions
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const suggestions: Record<string, string> = {
    'login ui': `// Login Component Example
import React from 'react';
import { useForm } from 'react-hook-form';

export const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} type="email" placeholder="Email" />
      <input {...register('password')} type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
};`,
    'api': `// API Endpoint Example
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    const isValid = await bcrypt.compare(password, user.password);
    
    if (isValid) {
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
      res.json({ token, user });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});`
  };

  const taskLower = taskTitle.toLowerCase();
  for (const [key, code] of Object.entries(suggestions)) {
    if (taskLower.includes(key)) {
      return code;
    }
  }
  
  return `// Code suggestion for: ${taskTitle}
// Implementation details would go here
console.log('Implementing: ${taskTitle}');`;
};