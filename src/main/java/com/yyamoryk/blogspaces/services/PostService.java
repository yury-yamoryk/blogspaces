package com.yyamoryk.blogspaces.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.yyamoryk.blogspaces.entities.Blog;
import com.yyamoryk.blogspaces.entities.Post;
import com.yyamoryk.blogspaces.entities.Theme;
import com.yyamoryk.blogspaces.entities.User;
import com.yyamoryk.blogspaces.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jmx.access.InvocationFailureException;
import org.springframework.stereotype.Service;

import lombok.Data;
import lombok.NoArgsConstructor;

@Service
public class PostService {

    @Data
    @NoArgsConstructor
    public class GetPostOutput {
        Optional<Post> optionalPost;
        Optional<Theme> optionalTheme;
    }

    @Autowired
    UserRepository userRepository;

    public GetPostOutput getPost(String userName, String blogId, String postId) {
        GetPostOutput output = new GetPostOutput();
        output.setOptionalPost(Optional.empty());
        output.setOptionalTheme(Optional.empty());

        Optional<User> user = userRepository.findByName(userName);
        if (user.isPresent()) {
            List<Blog> userBlogs = user.get().getBlogs();
            if (userBlogs != null) {
                var blog = userBlogs.stream().filter(b -> b.getId().equals(blogId)).findFirst();
                if (blog.isPresent()) {
                    output.setOptionalTheme(Optional.of(blog.get().getTheme()));
                    var posts = blog.get().getPosts();
                    if (posts != null) {
                        var post = posts.stream().filter(p -> p.getId().equals(postId)).findFirst();
                        if (post.isPresent()) {
                            output.setOptionalPost(Optional.of(post.get()));
                        }
                    }
                }
            }
        }
        return output;
    }

    public Post createPost(String userName, String blogId, Post newPost)
        throws InvocationFailureException, IllegalArgumentException {
        Optional<User> user = userRepository.findByName(userName);
        if (!user.isPresent()) {
            throw new IllegalArgumentException("User Name");
        }

        List<Blog> userBlogs = user.get().getBlogs();
        if (userBlogs == null) {
            throw new InvocationFailureException("User Blogs");
        }
        Optional<Blog> blog = userBlogs.stream().filter(b -> b.getId().equals(blogId)).findFirst();
        if (!blog.isPresent()) {
            throw new IllegalArgumentException("User Blog");
        }
        List<Post> userBlogPosts = blog.get().getPosts();
        if (userBlogPosts == null) {
            userBlogPosts = new ArrayList<Post>();
            blog.get().setPosts(userBlogPosts);
        } else {
            var existingPost = userBlogPosts.stream().filter(p -> p.getId().equals(newPost.getId())).findFirst();
            if (existingPost.isPresent()) {
                throw new InvocationFailureException(newPost.getId());
            }
        }
        userBlogPosts.add(newPost);
        userRepository.save(user.get());
        return newPost;
    }

    public void deletePost(String userName, String blogId, String postId) {
        Optional<User> user = userRepository.findByName(userName);
        if (!user.isPresent()) {
            return;
        }

        List<Blog> userBlogs = user.get().getBlogs();
        if (userBlogs == null) {
            return;
        }

        Optional<Blog> blog = userBlogs.stream().filter(b -> b.getId().equals(blogId)).findFirst();
        if (!blog.isPresent()) {
            return;
        }

        List<Post> userBlogPosts = blog.get().getPosts();
        if (userBlogPosts == null) {
            return;
        }

        var filteredPosts = userBlogPosts.stream().filter(p -> !p.getId().equals(postId)).collect(Collectors.toList());
        blog.get().setPosts(filteredPosts);
        userRepository.save(user.get());
    }
}
