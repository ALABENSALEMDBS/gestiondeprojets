import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../../core/models/Project';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {

  constructor(private http:HttpClient) { }

  private apiUrl = 'http://localhost:8081/GestionDeProjets/api/projects';

      getProjects(): Observable<Project[]> {
          return this.http.get<Project[]>(`${this.apiUrl}`);
      }

      createProject(project: Project): Observable<Project> {
          return this.http.post<Project>(`${this.apiUrl}`, project);
      }

      updateProject(id: number, project: Project): Observable<Project> {
          return this.http.put<Project>(`${this.apiUrl}/${id}`, project);
      }

      getProjectById(id: number): Observable<Project> {
          return this.http.get<Project>(`${this.apiUrl}/${id}`);
      }

      deleteProject(id: number): Observable<string> {
          return this.http.delete(this.apiUrl + '/' + id, { responseType: 'text'});
      }

}
