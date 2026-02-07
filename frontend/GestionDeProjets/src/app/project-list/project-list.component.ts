import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '../../core/models/Project';
import { ProjectServiceService } from '../services/project-service.service';

@Component({
  selector: 'app-project-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent implements OnInit {

  constructor(private projectService: ProjectServiceService) { }
  
  projects: Project[] = [];
  isLoading = false;
  errorMessage = '';
  
  // Modal de confirmation
  showDeleteModal = false;
  projectToDelete: Project | null = null;
  
  // Messages de suppression
  deleteSuccessMessage = '';
  deleteErrorMessage = '';

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.projectService.getProjects().subscribe({
      next: (projectsData) => {
        this.projects = projectsData;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des projets';
        this.isLoading = false;
        console.error('Erreur:', error);
      }
    });
  }

  deleteProject(project: Project): void {
    this.projectToDelete = project;
    this.showDeleteModal = true;
  }

  confirmDelete(): void {
    if (this.projectToDelete) {
      this.projectService.deleteProject(this.projectToDelete.id!).subscribe({
        next: (response) => {
          this.projects = this.projects.filter(p => p.id !== this.projectToDelete!.id);
          this.deleteSuccessMessage = `Le projet "${this.projectToDelete!.name}" a été supprimé avec succès`;
          console.log('Projet supprimé avec succès');
          this.closeDeleteModal();
          
          // Masquer le message après 3 secondes
          setTimeout(() => {
            this.deleteSuccessMessage = '';
          }, 3000);
        },
        error: (error) => {
          this.deleteErrorMessage = 'Erreur lors de la suppression du projet';
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
    this.projectToDelete = null;
  }

}
