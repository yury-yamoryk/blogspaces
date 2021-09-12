package com.yyamoryk.blogspaces.services;

import java.util.List;

import com.yyamoryk.blogspaces.entities.Theme;
import com.yyamoryk.blogspaces.repositories.ThemeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ThemeService {

    @Autowired
    ThemeRepository themeRepository;

    public Iterable<Theme> getAll() {
        List<Theme> themes = themeRepository.findAll();
        themes.forEach(theme -> {
            theme.setBlogColor(null);
            theme.setBlogBackgroundColor(null);
            theme.setPostColor(null);
            theme.setPostBackgroundColor(null);
            theme.setCommentColor(null);
            theme.setCommentBackgroundColor(null);
        });
        return themes;
    }
}
