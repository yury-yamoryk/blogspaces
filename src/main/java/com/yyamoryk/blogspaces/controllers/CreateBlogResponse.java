package com.yyamoryk.blogspaces.controllers;

import com.yyamoryk.blogspaces.entities.Blog;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CreateBlogResponse {
    Blog newBlog;
}
