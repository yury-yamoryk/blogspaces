package com.yyamoryk.blogspaces.controllers;

import javax.validation.Valid;

import com.yyamoryk.blogspaces.entities.Comment;
import com.yyamoryk.blogspaces.entities.MessageData;
import com.yyamoryk.blogspaces.services.CommentService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class CommentController {

    private final CommentService commentService;

	public CommentController(CommentService commentService) {
		this.commentService = commentService;
	}

    @RequestMapping(method=RequestMethod.POST, value="/api/spaces/createComment")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> createComment(@Valid @RequestBody CreateCommentRequest request) {
        var newComment = new Comment(-1, request.getCommentText(), request.getCommentUserName());
        try {
            return ResponseEntity.ok(new CreateCommentResponse(
                commentService.createComment(request.getUserName(), request.getBlogId(), request.getPostId(), newComment)));
        } catch (Exception e) {
            return ResponseEntity
					.ok()
					.body(new MessageData(e.getMessage()));
        }
    }
}
