package com.yyamoryk.blogspaces.services;

import java.util.List;
import java.util.Optional;

import com.yyamoryk.blogspaces.entities.Blog;
import com.yyamoryk.blogspaces.entities.Post;
import com.yyamoryk.blogspaces.entities.Theme;
import com.yyamoryk.blogspaces.entities.User;
import com.yyamoryk.blogspaces.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
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
}
