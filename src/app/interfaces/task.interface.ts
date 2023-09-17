import * as moment from 'moment';
import { TaskStatus } from '../enums/task-status.enum';

export interface Task {
  id?: number;
  title: string;
  description?: string;
  dueDate?: moment.Moment;
  status: TaskStatus; // Siempre que también tengas este enum en el frontend.
  createdAt?: moment.Moment;
  updatedAt?: moment.Moment;
}