import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Task } from 'src/app/interfaces/task.interface';
import { TokenService } from 'src/app/shared/services/token.service';
import { TaskCreationRequest } from '../../../interfaces/task-creation-request.interface';
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly BASE_URL = 'http://localhost:8080/api/tasks';
  private _taskUpdateSubject = new Subject<void>();
  public taskUpdateSubject$ = this._taskUpdateSubject.asObservable();

  constructor(private _http: HttpClient, private _tokenService: TokenService) {}

  private setAuthHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = this._tokenService.getToken();
    return headers.set('Authorization', `Bearer ${token}`);
  }

  /**
   * Returns a list of the user's tasks
   * @returns an array of Task
   */
  fetchTasks(): Observable<Task[]> {
    return this._http.get<Task[]>(this.BASE_URL, {
      headers: this.setAuthHeaders(),
    });
  }

  /**
   * 
   * @param title
   * @param description 
   * @param dueDate 
   * @returns an observable of the just created task
   */
  createTask(title: string, description: string, dueDate: string): Observable<Task> {
    const body: TaskCreationRequest = {
      title,
      description,
      dueDate
    };
    return this._http
      .post<Task>(`${this.BASE_URL}/create`, body, {
        headers: this.setAuthHeaders(),
      })
      .pipe(
        tap(() => {
          this._taskUpdateSubject.next();
        })
      );
  }

  /**
   * 
   * @param updatedTask 
   * @returns an observable of the updated task
   */
  updateTask(updatedTask: Task): Observable<Task> {
    return this._http.put<Task>(`${this.BASE_URL}/update`, updatedTask, {
      headers: this.setAuthHeaders(),
    }).pipe(
      tap(() => {
        this._taskUpdateSubject.next();
      })
    )
  }


}
