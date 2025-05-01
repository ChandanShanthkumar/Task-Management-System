package com.example.todo.controller;

import com.example.todo.config.UserDetailsImpl;
import com.example.todo.exception.TodoNotFoundException;
import com.example.todo.model.Todo;
import com.example.todo.model.User;
import com.example.todo.repository.UserRepository;
import com.example.todo.service.UserService;
import com.example.todo.service.TodoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.time.LocalDateTime;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@RestController
@RequestMapping("/todos")
@CrossOrigin(origins = "http://localhost:5173") // Allows frontend access
public class TodoController {

  @Autowired
  private TodoService todoService;

  @Autowired
  private UserRepository userRepository;


  @GetMapping
  public List<Todo> getTodos() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
    User user = userRepository.findByUsername(userDetails.getUsername()).orElse(null);
    return todoService.getTodosByUserId(user.getId());
  }

  @PostMapping
  public Todo addTodo(@RequestBody Todo todo) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
    User user = userRepository.findByUsername(userDetails.getUsername()).orElse(null);
    todo.setUser(user);
    return todoService.saveTodo(todo);
  }

  @GetMapping("/completed")
  public List<Todo> getCompletedTodos() {
    List<Todo> completedTodos = todoService.getCompletedTodos();

    return completedTodos;
  }

  @GetMapping("/{id}") // ✅ Correct method for fetching a todo by ID
  public Todo getTodoById(@PathVariable Long id) {
    return todoService.getTodoById(id);
  }

  @PutMapping("/{id}") // ✅ Correct method for updating a todo
  public Todo editTodo(@PathVariable Long id, @RequestBody Todo todoDetails) {
    return todoService.editTodo(id, todoDetails);
  }

  @DeleteMapping("/{id}")
  public void deleteTodo(@PathVariable Long id) {
    todoService.deleteTodoById(id);
  }

  @PutMapping("/{id}/status")
  public Todo updateTodoStatus(@PathVariable Long id, @RequestBody Todo todo) {
    Todo existingTodo = todoService.getTodoById(id);
    if (existingTodo == null) {
      throw new TodoNotFoundException("Todo not found with id: " + id);
    }

    existingTodo.setCompleted(todo.isCompleted());

    return todoService.saveTodo(existingTodo);
  }

   @DeleteMapping("/deleteallcompleted")
    public void deleteAllCompletedTodos() {
      todoService.deleteAllCompletedTodos();
    }

}
