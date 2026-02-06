package com.esprit.microservice.gestiondeprojets.services;

import com.esprit.microservice.gestiondeprojets.entities.Project;
import com.esprit.microservice.gestiondeprojets.repository.ProjectsRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
//@AllArgsConstructor
public class ProjectsServiceImplement {

    private final ProjectsRepository projectsRepository;

    public ProjectsServiceImplement(ProjectsRepository projectsRepository) {
        this.projectsRepository = projectsRepository;
    }



    public Project addProject(Project projet) {

        return projectsRepository.save(projet);
    }

    public List<Project> getAllProjects() {
        List<Project> projects = projectsRepository.findAll();
        return projects;
    }

    public Project getProjectById(Long id) {
        return projectsRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Le projet avec l'ID " + id + " n'existe pas"
                ));
    }

    public void deleteProject(Long id) {
        if (!projectsRepository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Le projet avec l'ID " + id + " n'existe pas"
            );
        }
        projectsRepository.deleteById(id);
    }

    public Project modifyProject(Long id, Project projet) {
        Project project = projectsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id " + id));

        project.setName(projet.getName());
        project.setDescription(projet.getDescription());
        project.setCreatedAt(project.getCreatedAt());

        return projectsRepository.save(project);
    }
}
