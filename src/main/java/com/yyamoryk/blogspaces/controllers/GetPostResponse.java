package com.yyamoryk.blogspaces.controllers;

import java.util.Optional;

import lombok.AllArgsConstructor;
import lombok.Data;

import com.yyamoryk.blogspaces.entities.Post;
import com.yyamoryk.blogspaces.entities.Theme;

@Data
@AllArgsConstructor
public class GetPostResponse {
    Optional<Post> optionalPost;
    Optional<Theme> optionalTheme;
}
