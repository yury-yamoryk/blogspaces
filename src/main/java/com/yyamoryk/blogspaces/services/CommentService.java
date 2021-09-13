package com.yyamoryk.blogspaces.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.yyamoryk.blogspaces.entities.Blog;
import com.yyamoryk.blogspaces.entities.Comment;
import com.yyamoryk.blogspaces.entities.Post;
import com.yyamoryk.blogspaces.entities.User;
import com.yyamoryk.blogspaces.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jmx.access.InvocationFailureException;
import org.springframework.stereotype.Service;

@Service
public class CommentService {

    @Autowired
    UserRepository userRepository;

    public Comment createComment(String userName, String blogId, String postId, Comment newComment)
        throws InvocationFailureException, IllegalArgumentException {
        Optional<User> user = userRepository.findByName(userName);
        if (!user.isPresent()) {
            throw new IllegalArgumentException("User Name");
        }

        List<Blog> userBlogs = user.get().getBlogs();
        if (userBlogs == null) {
            throw new InvocationFailureException("No User Blogs");
        }

        Optional<Blog> blog = userBlogs.stream().filter(b -> b.getId().equals(blogId)).findFirst();
        if (!blog.isPresent()) {
            throw new IllegalArgumentException("User Blog");
        }

        List<Post> userBlogPosts = blog.get().getPosts();
        if (userBlogPosts == null) {
            throw new InvocationFailureException("No User Posts");
        }

        Optional<Post> post = userBlogPosts.stream().filter(p -> p.getId().equals(postId)).findFirst();
        if (!post.isPresent()) {
            throw new IllegalArgumentException("User Post");
        }

        List<Comment> userBlogPostComments = post.get().getComments();
        if (userBlogPostComments == null) {
            userBlogPostComments = new ArrayList<Comment>();
            post.get().setComments(userBlogPostComments);
        }

        newComment.setId(userBlogPostComments.size());

        userBlogPostComments.add(newComment);
        userRepository.save(user.get());
        return newComment;
    }
}
