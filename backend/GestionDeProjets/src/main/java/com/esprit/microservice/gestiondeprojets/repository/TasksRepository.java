package com.esprit.microservice.gestiondeprojets.repository;

import com.esprit.microservice.gestiondeprojets.entities.Project;
import com.esprit.microservice.gestiondeprojets.entities.Task;
import com.esprit.microservice.gestiondeprojets.entities.status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TasksRepository extends JpaRepository<Task, Long> {
    List<Task> findByProject_Id(Long projectId);

    List<Task> findByStatus(status status);
}
