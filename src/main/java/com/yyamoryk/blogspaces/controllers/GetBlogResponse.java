package com.yyamoryk.blogspaces.controllers;

import java.util.Optional;

import lombok.AllArgsConstructor;
import lombok.Data;

import com.yyamoryk.blogspaces.entities.Blog;

@Data
@AllArgsConstructor
public class GetBlogResponse {
    Optional<Blog> optionalBlog;
}
