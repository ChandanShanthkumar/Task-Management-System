package com.example.todo.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;


@Entity // Ensures it is a database entity
@Table(name = "todos")
public class Todo {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String task;

  private String details;

  private boolean isCompleted;

  private LocalDateTime date;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private User user;
  public LocalDateTime getDate() {
    return date;
  }

  // Getters and Setters
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getTask() {
    return task;
  }

  public void setTask(String task) {
    this.task = task;
  }

  public String getDetails() {
    return details;
  }

  public void setDetails(String details) {
    this.details = details;
  }
  public void setDate(LocalDateTime date) {
    this.date = date;
  }

  public boolean isCompleted() {
    return isCompleted;
  }

  public void setCompleted(boolean completed) {
    isCompleted = completed;
  }
  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public Todo(String task, String details, boolean isCompleted, LocalDateTime date, User user) {
    this.task = task;
    this.details = details;
    this.isCompleted = isCompleted;
    this.date = date;
    this.user = user;
  }
}
