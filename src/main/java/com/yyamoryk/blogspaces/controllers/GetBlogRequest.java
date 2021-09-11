package com.yyamoryk.blogspaces.controllers;

import javax.validation.constraints.NotBlank;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GetBlogRequest {
    @NotBlank
    String userName;
    
    @NotBlank
    String blogId;
}
