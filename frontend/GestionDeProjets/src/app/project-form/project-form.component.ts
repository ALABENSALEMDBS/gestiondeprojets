import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectServiceService } from '../services/project-service.service';

@Component({
  selector: 'app-project-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css'
})
export class ProjectFormComponent implements OnInit {

  projectForm!: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';
  isEditMode = false;
  projectId?: number;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();
  }

  initForm(): void {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
    });
  }

  checkEditMode(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.projectId = +id;
        this.loadProject();
      }
    });
  }

  loadProject(): void {
    if (!this.projectId) return;

    this.projectService.getProjectById(this.projectId).subscribe({
      next: (project) => {
        this.projectForm.patchValue({
          name: project.name,
          description: project.description
        });
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement du projet';
        console.error('Erreur:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.projectForm.invalid) {
      this.errorMessage = 'Veuillez remplir correctement le formulaire';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const projectData = this.projectForm.value;

    if (this.isEditMode && this.projectId) {
      // Mode édition
      this.projectService.updateProject(this.projectId, projectData).subscribe({
        next: (response) => {
          this.successMessage = 'Projet modifié avec succès!';
          this.isSubmitting = false;
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 1000);
        },
        error: (error) => {
          this.errorMessage = 'Erreur lors de la modification du projet';
          this.isSubmitting = false;
          console.error('Erreur:', error);
        }
      });
    } else {
      // Mode création
      this.projectService.createProject(projectData).subscribe({
        next: (response) => {
          this.successMessage = 'Projet créé avec succès!';
          this.isSubmitting = false;
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 1000);
        },
        error: (error) => {
          this.errorMessage = 'Erreur lors de la création du projet';
          this.isSubmitting = false;
          console.error('Erreur:', error);
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/home']);
  }

  // Getters pour faciliter l'accès aux contrôles dans le template
  get name() {
    return this.projectForm.get('name');
  }

  get description() {
    return this.projectForm.get('description');
  }
}
