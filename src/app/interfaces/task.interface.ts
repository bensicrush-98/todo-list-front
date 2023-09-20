import { TaskStatus } from '../enums/task-status.enum';

export interface Task {
  id: number;
  title?: string;
  description?: string;
  dueDate?: Date;
  status?: TaskStatus;
}