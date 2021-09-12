package com.yyamoryk.blogspaces.services;

import static org.mockito.Mockito.when;

import java.util.Optional;

import com.yyamoryk.blogspaces.repositories.UserRepository;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

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
}

