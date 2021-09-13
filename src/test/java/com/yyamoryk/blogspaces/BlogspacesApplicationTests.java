package com.yyamoryk.blogspaces;

import com.yyamoryk.blogspaces.entities.Theme;
import com.yyamoryk.blogspaces.entities.User;

import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.List;

import com.yyamoryk.blogspaces.entities.Blog;
import com.yyamoryk.blogspaces.entities.Post;
import com.yyamoryk.blogspaces.entities.Comment;
import com.yyamoryk.blogspaces.repositories.ThemeRepository;
import com.yyamoryk.blogspaces.repositories.UserRepository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class BlogspacesApplicationTests {

	@Autowired
	ThemeRepository themeRepository;

	@Autowired
	UserRepository userRepository;

	@Test
	void contextLoads() {
	}

	@Test
	void loadsDb() {
		Theme greenTheme = new Theme("1", "Greenish", "#065535", "#065535", "#065535", "#b6fcd5", "#66cdaa", "#b4eeb4");
		Theme redTheme = new Theme("2", "Redish", "#800000", "#800000", "#800000", "#ffc0cb", "#ff7373", "#ffe4e1");
		Theme blueTheme = new Theme("3", "Blueish", "#003366", "#003366", "#003366", "#f0f8ff", "#4ca3dd", "#c6e2ff");
		themeRepository.save(greenTheme);
		themeRepository.save(redTheme);
		themeRepository.save(blueTheme);
		
		Comment testComment1 = new Comment(0, "Test Comment 1 Text", "Comment User 1");
		Comment testComment2 = new Comment(1, "Test Comment 2 Text", "Comment User 2");
		List<Comment> testComments = Stream.of(testComment1, testComment2).collect(Collectors.toList());

		Post testPost1 = new Post("1", "Test Post 1", "Test Post 1 Description", null);
		testPost1.setComments(testComments);
		Post testPost2 = new Post("2", "Test Post 2", "Test Post 2 Description", null);
		testPost2.setComments(testComments);
		List<Post> testPosts = Stream.of(testPost1, testPost2).collect(Collectors.toList());

		Blog testBlog1 = new Blog("1", "Test Blog 1", null, greenTheme);
		testBlog1.setPosts(testPosts);
		Blog testBlog2 = new Blog("2", "Test Blog 2", null, redTheme);
		testBlog2.setPosts(testPosts);
		List<Blog> testBlogs = Stream.of(testBlog1, testBlog2).collect(Collectors.toList());

		User testUser1 = new User("Test User 1", "abcdefab", null);
		testUser1.setBlogs(testBlogs);
		userRepository.save(testUser1);

		User testUser2 = new User("Test User 2", "qwertyab", null);
		testUser2.setBlogs(testBlogs);
		userRepository.save(testUser2);
	}

}
