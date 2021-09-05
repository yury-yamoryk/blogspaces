package com.yyamoryk.blogspaces.repositories;

import com.yyamoryk.blogspaces.entities.User;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {

}
