package com.yyamoryk.blogspaces.repositories;

import com.yyamoryk.blogspaces.entities.Theme;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ThemeRepository extends MongoRepository<Theme, String> {

}
