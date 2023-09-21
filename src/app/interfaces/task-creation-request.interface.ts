import * as moment from 'moment';

export interface TaskCreationRequest {
  title: string;
  description?: string;
  dueDate: string;
}
