package com.example.todo.service;

import com.example.todo.controller.AuthController;
import com.example.todo.exception.EmailAlreadyExistsException;
import com.example.todo.exception.UsernameAlreadyExistsException;
import com.example.todo.model.User;
import com.example.todo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User registerUser(AuthController.RegisterRequest registerRequest) {
        // Check if username or email already exists
        if (userRepository.findByUsername(registerRequest.getUsername()).isPresent()) {
            throw new UsernameAlreadyExistsException("Username already exists");
        }
        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            throw new EmailAlreadyExistsException("Email already exists");
        }

        // Hash the password
        String encodedPassword = passwordEncoder.encode(registerRequest.getPassword());
        String username = registerRequest.getUsername();
        String email = registerRequest.getEmail();
        // Create a new user
        User user = new User(username, email, encodedPassword);

        // Save the user to the database
        return userRepository.save(user);
    }
}