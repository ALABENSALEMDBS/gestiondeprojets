import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../core/models/Task';
import { status } from '../../core/models/status';
import { TaskServiceService } from '../services/task-service.service';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, FormsModule],
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
  selectedFilter: string = 'ALL';
  statusEnum = status;
  isLoading = false;
  errorMessage = '';
  
  // Modal de confirmation
  showDeleteModal = false;
  taskToDelete: Task | null = null;
  
  // Messages de suppression
  deleteSuccessMessage = '';
  deleteErrorMessage = '';

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('projectId');
      if (id) {
        this.projectId = +id;
        
        // Lire le query param 'status' pour initialiser le filtre
        this.route.queryParams.subscribe(queryParams => {
          const statusParam = queryParams['status'];
          if (statusParam && Object.values(status).includes(statusParam as status)) {
            this.selectedFilter = statusParam;
          } else {
            this.selectedFilter = 'ALL';
          }
          this.getTasks();
        });
      }
    });
  }

  getTasks(): void {
    this.isLoading = true;
    this.errorMessage = '';

    // Si le filtre est 'ALL', ne pas passer de status, sinon passer le status sélectionné
    const statusFilter = this.selectedFilter === 'ALL' ? undefined : this.selectedFilter as status;
    
    this.taskService.getTasksByProjectId(this.projectId, statusFilter).subscribe({
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

  onFilterChange(): void {
    // Mettre à jour l'URL avec le query param
    if (this.selectedFilter === 'ALL') {
      // Supprimer tous les query params
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {}
      });
    } else {
      // Ajouter le query param status
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { status: this.selectedFilter }
      });
    }
    
    this.getTasks();
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  editTask(task: Task): void {
    this.router.navigate(['/edit-task', task.id], {
      queryParams: { projectId: this.projectId }
    });
  }

  deleteTask(task: Task): void {
    this.taskToDelete = task;
    this.showDeleteModal = true;
  }

  confirmDelete(): void {
    if (this.taskToDelete && this.taskToDelete.id) {
      this.taskService.deleteTask(this.taskToDelete.id).subscribe({
        next: (response) => {
          this.tasks = this.tasks.filter(t => t.id !== this.taskToDelete!.id);
          this.deleteSuccessMessage = `La tâche "${this.taskToDelete!.title}" a été supprimée avec succès`;
          console.log('Tâche supprimée avec succès');
          this.closeDeleteModal();
          
          // Masquer le message après 3 secondes
          setTimeout(() => {
            this.deleteSuccessMessage = '';
          }, 3000);
        },
        error: (error) => {
          this.deleteErrorMessage = 'Erreur lors de la suppression de la tâche';
          console.error('Erreur:', error);
          this.closeDeleteModal();
          
          // Masquer le message après 3 secondes
          setTimeout(() => {
            this.deleteErrorMessage = '';
          }, 3000);
        }
      });
    }
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.taskToDelete = null;
  }
}
