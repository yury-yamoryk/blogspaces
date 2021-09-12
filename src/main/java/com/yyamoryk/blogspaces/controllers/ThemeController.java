package com.yyamoryk.blogspaces.controllers;

import com.yyamoryk.blogspaces.services.ThemeService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class ThemeController {

    private final ThemeService themeService;

	public ThemeController(ThemeService themeService) {
		this.themeService = themeService;
	}

    @RequestMapping(method=RequestMethod.GET, value="/api/spaces/themes")
    public GetThemesResponse getThemes() {
        return new GetThemesResponse(themeService.getAll());
    }
}
