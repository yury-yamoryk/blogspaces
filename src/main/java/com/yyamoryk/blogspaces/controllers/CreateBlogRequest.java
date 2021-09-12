package com.yyamoryk.blogspaces.controllers;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreateBlogRequest {
    String userName;
    private String blogId;
    private String blogTitle;
    private String themeId;
}
