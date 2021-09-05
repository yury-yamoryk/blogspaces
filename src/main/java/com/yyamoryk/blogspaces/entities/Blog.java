package com.yyamoryk.blogspaces.entities;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Blog {
    @Id
    private String id;
    private String title;
    private List<Post> posts;
    @DBRef
    private Theme theme;
}
