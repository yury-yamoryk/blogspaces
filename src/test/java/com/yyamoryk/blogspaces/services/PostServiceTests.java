package com.yyamoryk.blogspaces.services;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import com.yyamoryk.blogspaces.entities.Blog;
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
public class PostServiceTests {

	@MockBean
    UserRepository userRepository;

    @Autowired
    PostService postService;

    @Test
    public void getPostShouldFilterPostAndItsThemeFromRepository() {
        when(userRepository.findByName("testUserName")).thenReturn(Optional.of(TestDataBuilder.buildTestUser()));

        var actualGetPostOutput = postService.getPost("testUserName", "testBlogId", "testPostId");

        Assertions.assertTrue(actualGetPostOutput.getOptionalTheme().isPresent());
        Assertions.assertTrue(actualGetPostOutput.getOptionalPost().isPresent());
        Assertions.assertEquals("testTheme", actualGetPostOutput.getOptionalTheme().get().getId());
        Assertions.assertEquals("testPostId", actualGetPostOutput.getOptionalPost().get().getId());
    }

    @Test()
    public void createPostShouldThrowWhenUserNotFound() {
        var testUserName = "testUserName";
        when(userRepository.findByName(testUserName)).thenReturn(Optional.empty());

        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            postService.createPost(testUserName, "testBlogId" , new Post());
        });

        Assertions.assertTrue(exception.getMessage().contains("User Name"));
    }

    @Test()
    public void createPostShouldThrowWhenUserDoesntHaveBlogs() {
        var testUserName = "testUserName";
        var user = new User();
        user.setName(testUserName);
        when(userRepository.findByName(testUserName)).thenReturn(Optional.of(user));

        Exception exception = assertThrows(InvocationFailureException.class, () -> {
            postService.createPost(testUserName, "testBlogId" , new Post());
        });

        Assertions.assertTrue(exception.getMessage().contains("User Blogs"));
    }

    @Test()
    public void createPostShouldThrowWhenBlogNotFound() {
        var testUserName = "testUserName";
        var user = new User();
        user.setName(testUserName);
        user.setBlogs(List.of());
        when(userRepository.findByName(testUserName)).thenReturn(Optional.of(user));

        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            postService.createPost(testUserName, "testBlogId" , new Post());
        });

        Assertions.assertTrue(exception.getMessage().contains("User Blog"));
    }

    @Test()
    public void createPostShouldThrowWhenPostIdExists() {
        var testUserName = "testUserName";
        var testBlogId = "testBlogId";
        var user = new User();
        user.setName(testUserName);
        var blog = new Blog();
        blog.setId(testBlogId);
        user.setBlogs(List.of(blog));
        var post = new Post();
        post.setId("testPostId");
        blog.setPosts(List.of(post));
        when(userRepository.findByName(testUserName)).thenReturn(Optional.of(user));

        var newPost = new Post();
        newPost.setId("testPostId");

        Exception exception = assertThrows(InvocationFailureException.class, () -> {
            postService.createPost(testUserName, testBlogId, newPost);
        });

        Assertions.assertTrue(exception.getMessage().contains("testPostId"));
    }
}

