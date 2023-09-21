import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { TaskStatus } from 'src/app/enums/task-status.enum';
import { Task } from 'src/app/interfaces/task.interface';

type TaskGroupType = {
  status: TaskStatus;
  tasks: Task[];
};

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent implements OnInit {
  @Input() pendingTasks: Task[];
  @Input() inProgressTasks: Task[];
  @Input() completedTasks: Task[];

  tasksGroup: TaskGroupType[] = [];

  ngOnInit(): void {
    this.tasksGroup = [
      { status: TaskStatus.PENDING, tasks: this.pendingTasks },
      { status: TaskStatus.IN_PROGRESS, tasks: this.inProgressTasks },
      { status: TaskStatus.COMPLETED, tasks: this.completedTasks },
    ];
  }

  _getSectionTitle(status: TaskStatus) {
    return status != TaskStatus.IN_PROGRESS ? status : "IN PROGRESS";
  }
}
