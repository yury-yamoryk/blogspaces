package com.yyamoryk.blogspaces.services;

import java.util.List;
import java.util.Optional;

import com.yyamoryk.blogspaces.entities.Blog;
import com.yyamoryk.blogspaces.entities.User;
import com.yyamoryk.blogspaces.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
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
                    blog.get().getPosts().forEach(post -> {
                        post.setComments(null);
                        post.setDescription(null);
                    });
                }
                return blog;
             }
             return Optional.empty();
         }
         return Optional.empty();
    }
}
