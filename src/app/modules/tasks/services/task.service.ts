import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/interfaces/task.interface';
import { TokenService } from 'src/app/shared/services/token.service';
import { TaskCreationRequest } from '../../../interfaces/task-creation-request.interface';
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly BASE_URL = 'http://localhost:8080/api/tasks';

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

  createTask(title: string, description: string, dueDate: moment.Moment): Observable<Task> {
    const body: TaskCreationRequest = {
      title,
      description,
      dueDate
    };
    return this._http.post<Task>(`${this.BASE_URL}/create`, body, { headers: this.setAuthHeaders() });
  }
}
