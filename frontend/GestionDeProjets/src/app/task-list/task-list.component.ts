import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../core/models/Task';
import { TaskServiceService } from '../services/task-service.service';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskServiceService
  ) { }

  projectId!: number;
  tasks: Task[] = [];
  isLoading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('projectId');
      if (id) {
        this.projectId = +id;
        this.getTasks();
      }
    });
  }

  getTasks(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.taskService.getTasksByProjectId(this.projectId).subscribe({
      next: (tasksData) => {
        this.tasks = tasksData;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des tâches';
        this.isLoading = false;
        console.error('Erreur:', error);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}
