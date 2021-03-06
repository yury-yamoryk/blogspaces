package com.yyamoryk.blogspaces.controllers;

import javax.validation.constraints.NotBlank;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreateBlogRequest {
    @NotBlank
    String userName;

    @NotBlank
    private String blogId;

    @NotBlank
    private String blogTitle;

    @NotBlank
    private String themeId;
}
