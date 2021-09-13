package com.yyamoryk.blogspaces.controllers;

import javax.validation.constraints.NotBlank;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreatePostRequest {
    @NotBlank
    String userName;

    @NotBlank
    String blogId;

    @NotBlank
    String postId;

    @NotBlank
    String postTitle;

    @NotBlank
    String postDescription;
}
