package com.yyamoryk.blogspaces.services;

import com.yyamoryk.blogspaces.entities.User;
import com.yyamoryk.blogspaces.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public Iterable<User> getAll() {
        return userRepository.findAll();
    }

    public User save(User user) {
        userRepository.save(user);
        return user;
    }
}
