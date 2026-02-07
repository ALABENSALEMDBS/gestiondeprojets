import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../core/models/Task';
import { status } from '../../core/models/status';
import { TaskServiceService } from '../services/task-service.service';

@Component({
  selector: 'app-task-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit {

  taskForm!: FormGroup;
  projectId!: number;
  taskId?: number;
  isEditMode = false;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';
  statusOptions = Object.values(status);

  constructor(
    private fb: FormBuilder,
    private taskService: TaskServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.checkRouteParams();
  }

  initForm(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      status: [status.TODO, Validators.required],
      dueDate: ['', Validators.required]
    });
  }

  checkRouteParams(): void {
    // Vérifier si c'est une édition ou une création
    this.route.paramMap.subscribe(params => {
      const projectIdParam = params.get('projectId');
      const taskIdParam = params.get('taskId');

      if (taskIdParam) {
        this.taskId = +taskIdParam;
        this.isEditMode = true;
        
        // Récupérer le projectId depuis les query params
        this.route.queryParamMap.subscribe(queryParams => {
          const projectIdQuery = queryParams.get('projectId');
          if (projectIdQuery) {
            this.projectId = +projectIdQuery;
          }
        });
        
        // Charger la tâche existante
        this.loadTask(this.taskId);
      } else if (projectIdParam) {
        this.projectId = +projectIdParam;
        this.isEditMode = false;
      }
    });
  }

  loadTask(taskId: number): void {
    this.taskService.getTaskById(taskId).subscribe({
      next: (task) => {
        // Convertir la date au format yyyy-MM-dd pour l'input date
        const dueDate = task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '';
        
        this.taskForm.patchValue({
          title: task.title,
          status: task.status,
          dueDate: dueDate
        });
        
        // Récupérer le projectId si disponible dans la tâche
        if (task.project && task.project.id && !this.projectId) {
          this.projectId = task.project.id;
        }
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement de la tâche';
        console.error('Erreur:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const taskData: Task = {
      title: this.taskForm.value.title,
      status: this.taskForm.value.status,
      dueDate: new Date(this.taskForm.value.dueDate)
    };

    if (this.isEditMode && this.taskId) {
      this.updateTask(taskData);
    } else {
      this.createTask(taskData);
    }
  }

  createTask(task: Task): void {
    this.taskService.addTaskToProject(this.projectId, task).subscribe({
      next: (response) => {
        this.successMessage = 'Tâche créée avec succès!';
        this.isSubmitting = false;
        setTimeout(() => {
          this.router.navigate(['/tasks', this.projectId]);
        }, 1500);
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la création de la tâche';
        this.isSubmitting = false;
        console.error('Erreur:', error);
      }
    });
  }

  updateTask(task: Task): void {
    if (this.taskId) {
      this.taskService.updateTask(this.taskId, task).subscribe({
        next: (response) => {
          this.successMessage = 'Tâche modifiée avec succès!';
          this.isSubmitting = false;
          setTimeout(() => {
            this.router.navigate(['/tasks', this.projectId]);
          }, 1500);
        },
        error: (error) => {
          this.errorMessage = 'Erreur lors de la modification de la tâche';
          this.isSubmitting = false;
          console.error('Erreur:', error);
        }
      });
    }
  }

  onCancel(): void {
    if (this.projectId) {
      this.router.navigate(['/tasks', this.projectId]);
    } else {
      this.router.navigate(['/home']);
    }
  }

  // Getters pour faciliter l'accès aux contrôles du formulaire
  get title() {
    return this.taskForm.get('title');
  }

  get status() {
    return this.taskForm.get('status');
  }

  get dueDate() {
    return this.taskForm.get('dueDate');
  }
}
