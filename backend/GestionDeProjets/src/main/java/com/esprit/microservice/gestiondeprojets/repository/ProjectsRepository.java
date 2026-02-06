package com.esprit.microservice.gestiondeprojets.repository;

import com.esprit.microservice.gestiondeprojets.entities.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectsRepository extends JpaRepository<Project, Long> {

}
