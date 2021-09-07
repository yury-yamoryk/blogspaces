package com.yyamoryk.blogspaces.entities;

import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User {
    @Id
    @NotBlank
    @Size(max = 20)
    private String name;
    
    @NotBlank
    @Size(max = 120)
    private String password;

    private List<Blog> blogs;
}
