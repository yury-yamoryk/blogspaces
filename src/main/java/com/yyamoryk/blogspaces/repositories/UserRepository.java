package com.yyamoryk.blogspaces.repositories;

import java.util.List;
import java.util.Optional;

import com.yyamoryk.blogspaces.entities.User;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByName(String name);

    Boolean existsByName(String name);

    @Query(value="{}", fields="{ name: 1, password: 0, blogs: { posts: 0, theme: 0} }")
    List<User> findUsers();
    
}
