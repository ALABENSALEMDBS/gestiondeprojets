import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    },
    {
        path: 'home', loadComponent: () => import('./project-list/project-list.component').then(m => m.ProjectListComponent)
    },
    {
        path: 'tasks/:projectId', loadComponent: () => import('./task-list/task-list.component').then(m => m.TaskListComponent)
    },
    {
        path: 'add-project', loadComponent: () => import('./project-form/project-form.component').then(m => m.ProjectFormComponent)
    },
    {
        path: 'edit-project/:id', loadComponent: () => import('./project-form/project-form.component').then(m => m.ProjectFormComponent)
    }
    
// rest of the routes for tasks (add/edit) will be used in the future when we implement task management features
    ,
    {
        path: 'add-task/:projectId', loadComponent: () => import('./task-form/task-form.component').then(m => m.TaskFormComponent)
    },
    {
        path: 'edit-task/:taskId', loadComponent: () => import('./task-form/task-form.component').then(m => m.TaskFormComponent)
    }
];
