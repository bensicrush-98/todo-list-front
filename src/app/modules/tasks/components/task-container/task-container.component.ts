import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, catchError, map, of, shareReplay, tap } from 'rxjs';
import { Task } from 'src/app/interfaces/task.interface';
import { TaskService } from '../../services/task.service';
import { TaskStatus } from 'src/app/enums/task-status.enum';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskContainerComponent implements OnInit {
  tasks$: Observable<Task[]>;
  //task status types in order to call them in template
  PENDING = TaskStatus.PENDING;
  IN_PROGRESS = TaskStatus.IN_PROGRESS;
  COMPLETED = TaskStatus.COMPLETED;
  loading: boolean = true;
  error: any;

  constructor(
    private _taskService: TaskService,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.tasks$ = this._taskService.fetchTasks().pipe(
      catchError((error) => {
        this._toastrService.error(
          'Error al cargar las tareas. Por favor, inténtalo de nuevo más tarde.'
        );
        this.error = error;
        return of(null);
      }),
      shareReplay(1)
    );
  }

  _filterTasksByStatus(status: TaskStatus): Observable<Task[]> {
    return this.tasks$.pipe(
      map((tasks) => tasks.filter((task: Task) => task.status === status))
    );
  }
}
