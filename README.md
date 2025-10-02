# Traycer AI - Planning Layer for Coding Agents

A simplified version of Traycer - a planning layer for coding agents that helps break down high-level development goals into actionable tasks.

## Features

- **Task Planning**: Enter high-level goals and automatically break them into subtasks
- **Drag & Drop**: Reorder tasks with intuitive drag-and-drop functionality
- **Progress Tracking**: Visual progress bar showing completion percentage
- **AI-Powered Suggestions**: Get code suggestions for each task
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- React with TypeScript
- Vite for fast bundling
- Tailwind CSS for styling
- @dnd-kit/core for drag-and-drop
- React Hook Form for input handling
- Lucide React for icons
- Framer Motion for animations
- Google Gemini AI (optional) for task generation and code suggestions

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. For Gemini AI integration, create a `.env` file based on `.env.example` and add your Google Gemini API key
4. Start the development server:
   ```bash
   npm run dev
   ```

## Gemini AI Integration

This project includes optional integration with Google Gemini AI for enhanced task generation and code suggestions:

1. Get your API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a `.env` file in the project root with your API key:
   ```env
   VITE_GOOGLE_GEMINI_API_KEY=your_actual_api_key_here
   ```
3. The app will automatically use Gemini when an API key is present, falling back to mock data otherwise

## Project Structure

```
src/
├─ components/
│  ├─ TaskInput.tsx        # Input box for feature/goal
│  ├─ TaskList.tsx         # List of tasks with drag & drop
│  ├─ TaskCard.tsx         # Single task card with checkbox/edit/delete
│  ├─ ProgressBar.tsx      # Progress tracker
│  └─ CodeSuggestion.tsx   # AI code suggestions
├─ lib/
│  └─ ai.ts                # Helper for AI integration
├─ types/
│  └─ task.ts              # Task type definitions
├─ App.tsx                 # Main dashboard
├─ main.tsx                # Entry point
```

## Usage

1. Enter a high-level development goal in the input field (e.g., "Build a login system")
2. The app will generate subtasks (using Gemini AI if API key is provided)
3. Check off completed tasks, edit task titles, or reorder tasks using drag-and-drop
4. Click on any task to see AI-generated code suggestions
