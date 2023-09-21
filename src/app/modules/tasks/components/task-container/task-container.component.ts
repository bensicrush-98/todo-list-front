import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Observable,
  Subject,
  catchError,
  map,
  of,
  shareReplay,
  takeUntil,
  tap,
} from 'rxjs';
import { Task } from 'src/app/interfaces/task.interface';
import { TaskService } from '../../services/task.service';
import { TaskStatus } from 'src/app/enums/task-status.enum';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.scss'],
})
export class TaskContainerComponent implements OnInit, OnDestroy {
  tasks$: Observable<Task[]>;
  //task status types in order to call them in template
  PENDING = TaskStatus.PENDING;
  IN_PROGRESS = TaskStatus.IN_PROGRESS;
  COMPLETED = TaskStatus.COMPLETED;

  _loading: boolean;
  _error: any;
  _unsubscribe$ = new Subject<void>();

  constructor(
    private _taskService: TaskService,
    private _toastrService: ToastrService
  ) {
    this._taskService.taskUpdateSubject$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(() => {
        this._fetchTasks();
      });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this._fetchTasks();
    }, 2000);
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  _fetchTasks(): Observable<Task[]> {
    this._loading = true;
    return (this.tasks$ = this._taskService.fetchTasks().pipe(
      catchError((error) => {
        this._verifyErrorType(error);
        return of([]);
      }),
      tap(() => (this._loading = false)),
      shareReplay(1)
    ));
  }

  _filterTasksByStatus(status: TaskStatus): Observable<Task[]> {
    return this.tasks$.pipe(
      map((tasks) => tasks.filter((task: Task) => task.status === status))
    );
  }

  _verifyErrorType(error: any): void {
    this._error = error;
    // Diferenciar entre tipos de errores
    if (error.status === 0) {
      this._toastrService.error(
        'Parece que hay un problema de conexión. Por favor, verifica tu conexión a internet.'
      );
    } else if (error.status >= 500) {
      this._toastrService.error(
        'Error del servidor. Por favor, inténtalo de nuevo más tarde.'
      );
    } else {
      this._toastrService.error(
        'Error al cargar las tareas. Por favor, inténtalo de nuevo más tarde.'
      );
    }
  }

  _onOpenCreateTaskDialog(): void {
    
  }
}
