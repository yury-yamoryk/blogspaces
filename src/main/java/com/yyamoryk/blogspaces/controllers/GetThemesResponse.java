package com.yyamoryk.blogspaces.controllers;

import com.yyamoryk.blogspaces.entities.Theme;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GetThemesResponse {
    Iterable<Theme> themes;
}
