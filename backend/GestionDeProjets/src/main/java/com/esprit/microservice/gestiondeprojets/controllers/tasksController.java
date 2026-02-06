package com.esprit.microservice.gestiondeprojets.controllers;

import com.esprit.microservice.gestiondeprojets.entities.Task;
import com.esprit.microservice.gestiondeprojets.entities.status;
import com.esprit.microservice.gestiondeprojets.services.TasksServicesImplement;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Gestion Tasks API", description = "API pour la gestion des tasks")
@RestController
@RequestMapping("/api")
//@CrossOrigin(origins = "*")
public class tasksController {

    private final TasksServicesImplement tasksService;
    public tasksController(TasksServicesImplement tasksService) {
        this.tasksService = tasksService;
    }

    @Operation(description = "assigné un nouveau task to projet")
    @PostMapping ("/projects/{projectId}/tasks")
    public Task addTaskToProject(@PathVariable Long projectId , @RequestBody Task task) {
           return tasksService.addTaskToProject(projectId, task);
    }

    @Operation(description = "Récupérer tous les tasks")
    @GetMapping("/tasks")
    public List<Task> getAllTasks(@RequestParam(required = false) status status) {
        if (status != null) {
            return tasksService.getTasksByStatus(status);
        }
        return tasksService.getAllTasks();
    }

    @Operation(description = "Récupérer les tasks par ID de projet")
    @GetMapping("/projects/{projectId}/tasks")
    public List<Task> getTasksByProjectId(@PathVariable Long projectId) {
        return tasksService.getTasksByProjectId(projectId);
    }

    @Operation(description = "Supprimer un task par son ID")
    @DeleteMapping("/tasks/{taskId}")
    public String deleteTask(@PathVariable Long taskId) {
        tasksService.deleteTask(taskId);
        return "Task supprimé avec succès";
    }

    @Operation(description = "Modifier un task par son ID")
    @PutMapping("/tasks/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task task) {
        return tasksService.updateTask(id, task);
    }


}
