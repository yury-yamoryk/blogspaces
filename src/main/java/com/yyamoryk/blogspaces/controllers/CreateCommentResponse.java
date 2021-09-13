package com.yyamoryk.blogspaces.controllers;

import com.yyamoryk.blogspaces.entities.Comment;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CreateCommentResponse {
    Comment newComment;
}
