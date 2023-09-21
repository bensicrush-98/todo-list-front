import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from 'src/app/interfaces/task.interface';
import { TaskStatus } from 'src/app/enums/task-status.enum';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() id: number;
  @Input() title: string;
  @Input() description: string;
  @Input() dueDate: any;
  @Input() status: TaskStatus;
  taskStatus = TaskStatus;

  constructor(
    private _taskService: TaskService,
    private _toastrService: ToastrService
  ) {}

  onStatusChanged($event: any): void {
    let status: TaskStatus = null;

    switch ($event.target.value) {
      case 'pending':
        status = TaskStatus.PENDING;
        break;
      case 'in-progress':
        status = TaskStatus.IN_PROGRESS;
        break;
      case 'completed':
        status = TaskStatus.COMPLETED;
        break;
      default:
        break;
    }

    const body: Task = {
      id: this.id,
      status,
    };
    this._taskService.updateTask(body).subscribe({
      error: () => this._handleTaskUpdatedError(),
    });
  }

  _handleTaskUpdatedError(): void {
    this._toastrService.error(
      'There has been an error while updating the task'
    );
  }
}
