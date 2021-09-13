package com.yyamoryk.blogspaces.controllers;

import javax.validation.constraints.NotBlank;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreateCommentRequest {
    @NotBlank
    String userName;

    @NotBlank
    String blogId;

    @NotBlank
    String postId;

    @NotBlank
    String commentText;

    @NotBlank
    String commentUserName;
}
