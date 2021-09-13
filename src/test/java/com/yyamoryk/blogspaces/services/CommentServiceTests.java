package com.yyamoryk.blogspaces.services;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.yyamoryk.blogspaces.entities.Blog;
import com.yyamoryk.blogspaces.entities.Comment;
import com.yyamoryk.blogspaces.entities.Post;
import com.yyamoryk.blogspaces.entities.User;
import com.yyamoryk.blogspaces.repositories.UserRepository;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.jmx.access.InvocationFailureException;

@SpringBootTest
public class CommentServiceTests {

	@MockBean
    UserRepository userRepository;

    @Autowired
    CommentService commentService;

    @Test()
    public void createCommentShouldThrowWhenUserNotFound() {
        var testUserName = "testUserName";
        when(userRepository.findByName(testUserName)).thenReturn(Optional.empty());

        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            commentService.createComment(testUserName, "testBlogId", "testPostId", new Comment());
        });

        Assertions.assertTrue(exception.getMessage().contains("User Name"));
    }

    @Test()
    public void createCommentShouldThrowWhenUserDoesntHaveBlogs() {
        var testUserName = "testUserName";
        var user = new User();
        user.setName(testUserName);
        when(userRepository.findByName(testUserName)).thenReturn(Optional.of(user));

        Exception exception = assertThrows(InvocationFailureException.class, () -> {
            commentService.createComment(testUserName, "testBlogId", "testPostId", new Comment());
        });

        Assertions.assertTrue(exception.getMessage().contains("No User Blogs"));
    }

    @Test()
    public void createCommentShouldThrowWhenBlogNotFound() {
        var testUserName = "testUserName";
        var user = new User();
        user.setName(testUserName);
        user.setBlogs(List.of());
        when(userRepository.findByName(testUserName)).thenReturn(Optional.of(user));

        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            commentService.createComment(testUserName, "testBlogId", "testPostId", new Comment());
        });

        Assertions.assertTrue(exception.getMessage().contains("User Blog"));
    }

    @Test()
    public void createCommentShouldThrowWhenUserDoesntHavePosts() {
        var testUserName = "testUserName";
        var testBlogId = "testBlogId";
        var user = new User();
        user.setName(testUserName);
        var blog = new Blog();
        blog.setId(testBlogId);
        user.setBlogs(List.of(blog));
        when(userRepository.findByName(testUserName)).thenReturn(Optional.of(user));

        Exception exception = assertThrows(InvocationFailureException.class, () -> {
            commentService.createComment(testUserName, testBlogId, "testPostId", new Comment());
        });

        Assertions.assertTrue(exception.getMessage().contains("No User Posts"));
    }

    @Test()
    public void createCommentShouldThrowWhenPostNotFound() {
        var testUserName = "testUserName";
        var testBlogId = "testBlogId";
        var user = new User();
        user.setName(testUserName);
        var blog = new Blog();
        blog.setId(testBlogId);
        user.setBlogs(List.of(blog));
        blog.setPosts(List.of());
        when(userRepository.findByName(testUserName)).thenReturn(Optional.of(user));

        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            commentService.createComment(testUserName, testBlogId, "testPostId", new Comment());
        });

        Assertions.assertTrue(exception.getMessage().contains("User Post"));
    }

    @Test()
    public void createCommentShouldAssignIncrementedCommentId() {
        var testUserName = "testUserName";
        var testBlogId = "testBlogId";
        var testPostId = "testPostId";
        var user = new User();
        user.setName(testUserName);
        var blog = new Blog();
        blog.setId(testBlogId);
        user.setBlogs(List.of(blog));
        var post = new Post();
        post.setId("testPostId");
        blog.setPosts(List.of(post));
        var comment = new Comment();
        comment.setId(0);
        var comments = new ArrayList<Comment>();
        comments.add(comment);
        post.setComments(comments);
        when(userRepository.findByName(testUserName)).thenReturn(Optional.of(user));

        var newComment = new Comment();

        commentService.createComment(testUserName, testBlogId, testPostId, newComment);

        Assertions.assertEquals(1, newComment.getId());
    }
}
