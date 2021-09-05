package com.yyamoryk.blogspaces.repositories;

import com.yyamoryk.blogspaces.entities.User;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, String> {

}
