package com.yyamoryk.blogspaces.services;

import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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

@SpringBootTest
public class BlogServiceTests {

	@MockBean
    UserRepository userRepository;

    @Autowired
    BlogService blogService;

    @Test
    public void getBlogShouldFilterBlogFromRepositoryAndCleanDescriptionAndCommentsFromPosts() {
        when(userRepository.findByName("testUserName")).thenReturn(Optional.of(buildTestUser()));

        var actualBlog = blogService.getBlog("testUserName", "testBlogId");

        Assertions.assertTrue(actualBlog.isPresent());
        Assertions.assertEquals("testBlogId", actualBlog.get().getId());
        Assertions.assertNull(actualBlog.get().getPosts().get(0).getDescription());
        Assertions.assertNull(actualBlog.get().getPosts().get(1).getDescription());
        Assertions.assertNull(actualBlog.get().getPosts().get(0).getComments());
        Assertions.assertNull(actualBlog.get().getPosts().get(1).getComments());
    }

    private User buildTestUser() {
        Comment testComment1 = new Comment("1", "Test Comment 1 Text", "Comment User 1");
		Comment testComment2 = new Comment("2", "Test Comment 2 Text", "Comment User 2");
		List<Comment> testComments = Stream.of(testComment1, testComment2).collect(Collectors.toList());

		Post testPost1 = new Post("1", "Test Post 1", "Test Post 1 Description", null);
		testPost1.setComments(testComments);
		Post testPost2 = new Post("2", "Test Post 2", "Test Post 2 Description", null);
		testPost2.setComments(testComments);
		List<Post> testPosts = Stream.of(testPost1, testPost2).collect(Collectors.toList());

		Blog testBlog1 = new Blog("testBlogId", "Test Blog 1", null /* posts */, null /* theme */);
		testBlog1.setPosts(testPosts);
		List<Blog> testBlogs = Stream.of(testBlog1).collect(Collectors.toList());

		User testUser = new User("testUserName", "abcdefab", null);
        testUser.setBlogs(testBlogs);

        return testUser;
    }
}

