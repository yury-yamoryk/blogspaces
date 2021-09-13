package com.yyamoryk.blogspaces.controllers;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreatePostRequest {
    String userName;
    String blogId;
    String postId;
    String postTitle;
    String postDescription;
}
