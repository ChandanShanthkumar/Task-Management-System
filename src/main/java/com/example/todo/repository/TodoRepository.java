package com.example.todo.repository;

import com.example.todo.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    @Modifying
    @Transactional
    @Query("DELETE FROM Todo t WHERE t.isCompleted = true")
    void deleteAllCompleted();
    List<Todo> findByUserId(Long userId);
}
