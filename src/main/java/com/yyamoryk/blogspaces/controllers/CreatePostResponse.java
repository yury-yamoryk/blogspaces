package com.yyamoryk.blogspaces.controllers;

import com.yyamoryk.blogspaces.entities.Post;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CreatePostResponse {
    Post newPost;
}
