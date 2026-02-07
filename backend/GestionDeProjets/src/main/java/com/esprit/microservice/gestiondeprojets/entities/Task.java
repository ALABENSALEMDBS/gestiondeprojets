package com.esprit.microservice.gestiondeprojets.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(nullable = false)
    String title;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    status status;  // Enum TODO / IN_PROGRESS / DONE

    @Column(nullable = false)
    LocalDate dueDate;

    @JsonIgnore
    @ManyToOne
    Project project;
//    @Transient
//    public Long getProjectId() {
//        return project != null ? project.getId() : null;
//    }


    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public status getStatus() {
        return status;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public Project getProject() {
        return project;
    }



    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setStatus(status status) {
        this.status = status;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public void setProject(Project project) {
        this.project = project;
    }
}
