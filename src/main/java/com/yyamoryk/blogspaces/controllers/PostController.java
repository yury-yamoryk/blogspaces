package com.yyamoryk.blogspaces.controllers;

import javax.validation.Valid;

import com.yyamoryk.blogspaces.services.PostService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class PostController {

    private final PostService postService;

	public PostController(PostService service) {
		this.postService = service;
	}

    @RequestMapping(method=RequestMethod.GET, value="/api/spaces/{userName}/{blogId}/{postId}")
    public GetPostResponse getPost(@Valid GetPostRequest request) {
        var getPostResponse = postService.getPost(request.getUserName(), request.getBlogId(), request.getPostId());
        return new GetPostResponse(getPostResponse.getOptionalPost(), getPostResponse.getOptionalTheme());
    }
}
