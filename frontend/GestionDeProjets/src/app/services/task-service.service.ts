import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../core/models/Task';
import { status } from '../../core/models/status';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  constructor(private http:HttpClient) { }
  private apiUrl = 'http://localhost:8081/GestionDeProjets/api';

    getTasksByProjectId(projectId: number, status?: status): Observable<Task[]> {
        let params = new HttpParams();
        if (status) {
            params = params.set('status', status);
        }
        return this.http.get<Task[]>(`${this.apiUrl}/projects/${projectId}/tasks`, { params });
    }

    getTaskById(taskId: number): Observable<Task> {
        return this.http.get<Task>(`${this.apiUrl}/tasks/${taskId}`);
    }

    addTaskToProject(projectId: number, task: Task): Observable<Task> {
        return this.http.post<Task>(`${this.apiUrl}/projects/${projectId}/tasks`, task);
    }

    updateTask(id: number, task: Task): Observable<Task> {
        return this.http.put<Task>(`${this.apiUrl}/tasks/${id}`, task);
    }

    deleteTask(taskId: number): Observable<string> {
        return this.http.delete(`${this.apiUrl}/tasks/${taskId}`, { responseType: 'text' });
    }

}
