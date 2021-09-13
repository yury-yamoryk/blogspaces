package com.yyamoryk.blogspaces.controllers;

import javax.validation.Valid;

import com.yyamoryk.blogspaces.entities.Blog;
import com.yyamoryk.blogspaces.entities.MessageData;
import com.yyamoryk.blogspaces.repositories.ThemeRepository;
import com.yyamoryk.blogspaces.services.BlogService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class BlogController {

    private final BlogService blogService;

    private final ThemeRepository themeRepository;

	public BlogController(BlogService blogService, ThemeRepository themeRepository) {
		this.blogService = blogService;
        this.themeRepository = themeRepository;
	}

    @RequestMapping(method=RequestMethod.GET, value="/api/spaces/{userName}/{blogId}")
    public GetBlogResponse getBlog(@Valid GetBlogRequest request) {
        return new GetBlogResponse(blogService.getBlog(request.getUserName(), request.getBlogId()));
    }

    @RequestMapping(method=RequestMethod.POST, value="/api/spaces/createBlog")
    public ResponseEntity<?> createBlog(@Valid @RequestBody CreateBlogRequest request) {
        var optionalTheme = themeRepository.findAll().stream().filter(theme -> theme.getId().equals(request.getThemeId())).findFirst();
        if (optionalTheme.isEmpty()) {
            return ResponseEntity
					.ok()
					.body(new MessageData("Unknown Theme"));
        }

        var newBlog = new Blog(request.getBlogId(), request.getBlogTitle(), null /* posts */, optionalTheme.get());
        try {
            return ResponseEntity.ok(new CreateBlogResponse(blogService.createBlog(request.getUserName(), newBlog)));
        } catch (Exception e) {
            return ResponseEntity
					.ok()
					.body(new MessageData(e.getMessage()));
        }
    }
}
