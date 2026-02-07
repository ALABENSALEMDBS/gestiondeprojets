import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../core/models/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  constructor(private http:HttpClient) { }
  private apiUrl = 'http://localhost:8081/GestionDeProjets/api';

    getTasksByProjectId(projectId: number): Observable<Task[]> {
        return this.http.get<Task[]>(`${this.apiUrl}/projects/${projectId}/tasks`);
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
