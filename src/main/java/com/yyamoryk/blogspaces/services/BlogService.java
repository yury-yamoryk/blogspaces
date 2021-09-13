package com.yyamoryk.blogspaces.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.yyamoryk.blogspaces.entities.Blog;
import com.yyamoryk.blogspaces.entities.User;
import com.yyamoryk.blogspaces.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jmx.access.InvocationFailureException;
import org.springframework.stereotype.Service;

@Service
public class BlogService {

    @Autowired
    UserRepository userRepository;

    public Optional<Blog> getBlog(String userName, String blogId) {
         Optional<User> user = userRepository.findByName(userName);
         if (user.isPresent()) {
             List<Blog> userBlogs = user.get().getBlogs();
             if (userBlogs != null) {
                var blog = userBlogs.stream().filter(b -> b.getId().equals(blogId)).findFirst();
                if (blog.isPresent()) {
                    if (blog.get().getPosts() != null) {
                        blog.get().getPosts().forEach(post -> {
                            post.setComments(null);
                            post.setDescription(null);
                        });
                    }
                }
                return blog;
             }
             return Optional.empty();
         }
         return Optional.empty();
    }

    public Blog createBlog(String userName, Blog newBlog)
        throws InvocationFailureException, IllegalArgumentException {
        Optional<User> user = userRepository.findByName(userName);
        if (!user.isPresent()) {
            throw new IllegalArgumentException("User Name");
        }

        List<Blog> userBlogs = user.get().getBlogs();
        if (userBlogs == null) {
            userBlogs = new ArrayList<Blog>();
            user.get().setBlogs(userBlogs);
        } else {
            var existingBlog = userBlogs.stream().filter(b -> b.getId().equals(newBlog.getId())).findFirst();
            if (existingBlog.isPresent()) {
                throw new InvocationFailureException(newBlog.getId());
            }
        }
        userBlogs.add(newBlog);
        userRepository.save(user.get());
        return newBlog;
    }

    public void deleteBlog(String userName, String blogId) {
        Optional<User> user = userRepository.findByName(userName);
        if (!user.isPresent()) {
            return;
        }

        List<Blog> userBlogs = user.get().getBlogs();
        if (userBlogs == null) {
            return;
        }

        var filteredBlogs = userBlogs.stream().filter(b -> !b.getId().equals(blogId)).collect(Collectors.toList());
        user.get().setBlogs(filteredBlogs);
        userRepository.save(user.get());
    }
}
