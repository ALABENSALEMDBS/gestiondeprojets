package com.esprit.microservice.gestiondeprojets.controllers;

import com.esprit.microservice.gestiondeprojets.entities.Project;
import com.esprit.microservice.gestiondeprojets.services.ProjectsServiceImplement;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Tag(name = "Gestion Projets API", description = "API pour la gestion des projets")
@RestController
@RequestMapping("/api/projects")
//@CrossOrigin(origins = "*")
public class projectsController {

    private final ProjectsServiceImplement projectsService;
    public projectsController(ProjectsServiceImplement projectsService) {
        this.projectsService = projectsService;
    }


    @Operation(description = "Créer un nouveau projet")
    @PostMapping
    public Project createProject(@RequestBody Project project) {
        return projectsService.addProject(project);
    }

    @Operation(description = "Récupérer tous les projets")
    @GetMapping
    public List<Project> getAllProjects() {
        return projectsService.getAllProjects();
    }

    @Operation(description = "Récupérer un projet par son ID")
    @GetMapping("/{id}")
    public Project getProjectById(@PathVariable Long id) {
        Project project = projectsService.getProjectById(id);
        return project;
    }

    @Operation(description = "Supprimer un projet par son ID")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProject(@PathVariable Long id) {
        projectsService.deleteProject(id);
        return ResponseEntity.ok("Projet supprimé avec succès");
    }


    @Operation(description = "Modifier un projet par son ID")
    @PutMapping("/{id}")
    public ResponseEntity<?> modifyProject(@PathVariable Long id, @RequestBody Project projet) {
        try {
            Project updatedProject = projectsService.modifyProject(id, projet);
            return ResponseEntity.ok(updatedProject);
        } catch (RuntimeException ex) {
            // renvoyer un JSON clair pour Angular
            Map<String, Object> error = new HashMap<>();
            error.put("timestamp", LocalDateTime.now());
            error.put("status", 404);
            error.put("error", "Not Found");
            error.put("message", ex.getMessage());
            return ResponseEntity.status(404).body(error);
        }
    }

}
