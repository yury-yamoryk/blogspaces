package com.yyamoryk.blogspaces.controllers;

import com.yyamoryk.blogspaces.entities.User;
import com.yyamoryk.blogspaces.services.UserService;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    private final UserService userService;

	public UserController(UserService service) {
		this.userService = service;
	}

    @RequestMapping(method=RequestMethod.GET, value="/users")
    public Iterable<User> getUsers() {
        return userService.getAll();
    }

    @RequestMapping(method=RequestMethod.POST, value="/user")
    public User postUser(@RequestBody User user) {
        return userService.save(user);
    }
}

