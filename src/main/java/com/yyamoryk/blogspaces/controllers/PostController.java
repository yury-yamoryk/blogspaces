package com.yyamoryk.blogspaces.controllers;

import javax.validation.Valid;

import com.yyamoryk.blogspaces.entities.MessageData;
import com.yyamoryk.blogspaces.entities.Post;
import com.yyamoryk.blogspaces.services.PostService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;

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

    @RequestMapping(method=RequestMethod.PUT, value="/api/spaces/post")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> createPost(@Valid @RequestBody CreatePostRequest request) {
        var newPost = new Post(request.getPostId(), request.getPostTitle(), request.getPostDescription(), null /* comments */);
        try {
            return ResponseEntity.ok(new CreatePostResponse(postService.createPost(request.getUserName(), request.getBlogId(), newPost)));
        } catch (Exception e) {
            return ResponseEntity
					.ok()
					.body(new MessageData(e.getMessage()));
        }
    }

    @RequestMapping(method=RequestMethod.POST, value="/api/spaces/post")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> deletePost(@Valid @RequestBody DeletePostRequest request) {
        try {
            postService.deletePost(request.getUserName(), request.getBlogId(), request.getPostId());
            return ResponseEntity.ok(new DeletePostResponse(true));
        } catch (Exception e) {
            return ResponseEntity
					.ok()
					.body(new MessageData(e.getMessage()));
        }
    }
}
