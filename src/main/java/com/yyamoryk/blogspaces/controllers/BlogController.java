package com.yyamoryk.blogspaces.controllers;

import javax.validation.Valid;

import com.yyamoryk.blogspaces.services.BlogService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class BlogController {

    private final BlogService blogService;

	public BlogController(BlogService service) {
		this.blogService = service;
	}

    @RequestMapping(method=RequestMethod.GET, value="/api/spaces/{userName}/{blogId}")
    public GetBlogResponse getBlog(@Valid GetBlogRequest request) {
        return new GetBlogResponse(blogService.getBlog(request.getUserName(), request.getBlogId()));
    }
}
