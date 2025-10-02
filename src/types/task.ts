export interface Task {
  id: string;
  title: string;
  completed: boolean;
  description?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
  createdAt: Date;
}