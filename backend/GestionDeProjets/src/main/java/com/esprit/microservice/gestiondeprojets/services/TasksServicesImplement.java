package com.esprit.microservice.gestiondeprojets.services;

import com.esprit.microservice.gestiondeprojets.entities.Project;
import com.esprit.microservice.gestiondeprojets.entities.Task;
import com.esprit.microservice.gestiondeprojets.entities.status;
import com.esprit.microservice.gestiondeprojets.repository.ProjectsRepository;
import com.esprit.microservice.gestiondeprojets.repository.TasksRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class TasksServicesImplement {

    private final TasksRepository tasksRepository;
    private final ProjectsRepository projectsRepository;
    public TasksServicesImplement(TasksRepository tasksRepository, ProjectsRepository projectsRepository) {
        this.projectsRepository = projectsRepository;
        this.tasksRepository = tasksRepository;
    }

    public Task addTaskToProject(Long projectId, Task task) {
        Project project = projectsRepository.findById(projectId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Le projet avec l'ID " + projectId + " n'existe pas"
                ));
        task.setProject(project);
        return tasksRepository.save(task);
    }

    public List<Task> getAllTasks() {
        List<Task> tasks = tasksRepository.findAll();
        return tasks;
    }

    public Task getTaskById(Long id) {
        return tasksRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Le task avec l'ID " + id + " n'existe pas"
                ));
    }

    public List<Task> getTasksByProjectId(Long projectId) {
        Project project = projectsRepository.findById(projectId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Le projet avec l'ID " + projectId + " n'existe pas"
                ));
        return tasksRepository.findByProject_Id(projectId);
    }

    public void deleteTask(Long taskId) {
        if (!tasksRepository.existsById(taskId)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "La tâche avec l'ID " + taskId + " n'existe pas"
            );
        }
        tasksRepository.deleteById(taskId);
    }

    public Task updateTask(Long id, Task task) {
        Task existingTask = tasksRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Le task avec l'ID " + id + " n'existe pas"
                ));
        existingTask.setTitle(task.getTitle());
        existingTask.setStatus(task.getStatus());
        existingTask.setDueDate(task.getDueDate());

        return tasksRepository.save(existingTask);
    }


    // bonus : get tasks by status
    public List<Task> getTasksByStatus(status status) {
        return tasksRepository.findByStatus(status);
    }
}
