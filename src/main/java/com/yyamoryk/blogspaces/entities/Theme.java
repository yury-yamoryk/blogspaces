package com.yyamoryk.blogspaces.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "themes")
public class Theme {
    @Id
    private String id;
    private String blogColor;
    private String postColor;
    private String commentColor;
    private String blogBackgroundColor;
    private String postBackgroundColor;
    private String commentBackgroundColor;
}
