package com.yyamoryk.blogspaces.services;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import com.yyamoryk.blogspaces.entities.Blog;
import com.yyamoryk.blogspaces.entities.User;
import com.yyamoryk.blogspaces.repositories.UserRepository;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.jmx.access.InvocationFailureException;

@SpringBootTest
public class BlogServiceTests {

	@MockBean
    UserRepository userRepository;

    @Autowired
    BlogService blogService;

    @Test
    public void getBlogShouldFilterBlogFromRepositoryAndCleanDescriptionAndCommentsFromPosts() {
        when(userRepository.findByName("testUserName")).thenReturn(Optional.of(TestDataBuilder.buildTestUser()));

        var actualBlog = blogService.getBlog("testUserName", "testBlogId");

        Assertions.assertTrue(actualBlog.isPresent());
        Assertions.assertEquals("testBlogId", actualBlog.get().getId());
        Assertions.assertNull(actualBlog.get().getPosts().get(0).getDescription());
        Assertions.assertNull(actualBlog.get().getPosts().get(1).getDescription());
        Assertions.assertNull(actualBlog.get().getPosts().get(0).getComments());
        Assertions.assertNull(actualBlog.get().getPosts().get(1).getComments());
    }

    @Test()
    public void createBlogShouldThrowWhenUserNotFound() {
        var testUserName = "testUserName";
        when(userRepository.findByName(testUserName)).thenReturn(Optional.empty());

        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            blogService.createBlog(testUserName, new Blog());
        });

        Assertions.assertTrue(exception.getMessage().contains("User Name"));
    }

    @Test()
    public void createBlogShouldThrowWhenBlogIdExists() {
        var testUserName = "testUserName";
        var user = new User();
        user.setName(testUserName);
        var blog = new Blog();
        blog.setId("testBlogId");
        user.setBlogs(List.of(blog));
        when(userRepository.findByName(testUserName)).thenReturn(Optional.of(user));
        when(userRepository.findByName(testUserName)).thenReturn(Optional.of(user));

        var newBlog = new Blog();
        newBlog.setId("testBlogId");

        Exception exception = assertThrows(InvocationFailureException.class, () -> {
            blogService.createBlog(testUserName, newBlog);
        });

        Assertions.assertTrue(exception.getMessage().contains("testBlogId"));
    }
}

