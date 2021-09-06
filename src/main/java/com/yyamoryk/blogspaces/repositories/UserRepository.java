package com.yyamoryk.blogspaces.repositories;

import java.util.Optional;

import com.yyamoryk.blogspaces.entities.User;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByName(String name);

    Boolean existsByName(String name);
}
