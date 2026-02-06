package com.esprit.microservice.gestiondeprojets.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Project {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
     Long id;

    @Column(nullable = false)
     String name;

     String description;

//   LocalDateTime createdAt= LocalDateTime.now();
     @Column(updatable = false)
      LocalDateTime createdAt;

     @PrePersist
      protected void onCreate() {
          this.createdAt = LocalDateTime.now();
      }

      @OneToMany(mappedBy = "project", cascade = CascadeType.ALL,orphanRemoval = true, fetch = FetchType.LAZY)
      Set<Task> tasks = new HashSet<>();








    // --- AJOUTE LES GETTERS ET SETTERS MANUELLEMENT ICI ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public Set<Task> getTasks() { return tasks; }
    public void setTasks(Set<Task> tasks) { this.tasks = tasks; }
}
