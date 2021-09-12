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
}

