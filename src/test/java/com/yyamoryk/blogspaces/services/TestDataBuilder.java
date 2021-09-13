package com.yyamoryk.blogspaces.services;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.yyamoryk.blogspaces.entities.Blog;
import com.yyamoryk.blogspaces.entities.Comment;
import com.yyamoryk.blogspaces.entities.Post;
import com.yyamoryk.blogspaces.entities.Theme;
import com.yyamoryk.blogspaces.entities.User;

public final class TestDataBuilder {
    static User buildTestUser() {
        Comment testComment1 = new Comment(0, "Test Comment 1 Text", "Comment User 1");
		Comment testComment2 = new Comment(1, "Test Comment 2 Text", "Comment User 2");
		List<Comment> testComments = Stream.of(testComment1, testComment2).collect(Collectors.toList());

		Post testPost1 = new Post("1", "Test Post 1", "Test Post 1 Description", null);
		testPost1.setComments(testComments);
		Post testPost2 = new Post("2", "Test Post 2", "Test Post 2 Description", null);
		testPost2.setComments(testComments);
        Post testPost3 = new Post("testPostId", "Test Post", "Test Description", null);
        testPost3.setComments(testComments);
		List<Post> testPosts = Stream.of(testPost1, testPost2, testPost3).collect(Collectors.toList());

        Theme testTheme = new Theme("testTheme", "Test Theme", "#003366", "#003366", "#003366", "#f0f8ff", "#4ca3dd", "#c6e2ff");
		Blog testBlog1 = new Blog("testBlogId", "Test Blog 1", null /* posts */, testTheme);
		testBlog1.setPosts(testPosts);
		List<Blog> testBlogs = Stream.of(testBlog1).collect(Collectors.toList());

		User testUser = new User("testUserName", "abcdefab", null);
        testUser.setBlogs(testBlogs);

        return testUser;
    }
}
