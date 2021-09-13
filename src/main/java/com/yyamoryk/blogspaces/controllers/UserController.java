package com.yyamoryk.blogspaces.controllers;

import javax.validation.Valid;

import com.yyamoryk.blogspaces.entities.AuthData;
import com.yyamoryk.blogspaces.entities.MessageData;
import com.yyamoryk.blogspaces.entities.RegistrationData;
import com.yyamoryk.blogspaces.entities.User;
import com.yyamoryk.blogspaces.services.UserService;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class UserController {

    private final UserService userService;

	public UserController(UserService service) {
		this.userService = service;
	}

    @RequestMapping(method=RequestMethod.GET, value="/api/spaces/users")
    public Iterable<User> getUsers() {
        return userService.getAll();
    }

    @RequestMapping(method=RequestMethod.POST, value="/api/spaces/user")
    public User postUser(@RequestBody User user) {
        return userService.save(user);
    }

	@RequestMapping(method=RequestMethod.POST, value="/api/spaces/authenticate")
	public ResponseEntity<?> authenticate(@Valid @RequestBody AuthData authData) {
		try {
        	return ResponseEntity.ok(userService.authenticate(authData));
		} catch (Exception e) {
			return ResponseEntity
					.ok()
					.body(new MessageData("Error: Username or password is wrong."));
		}
	}

	@RequestMapping(method=RequestMethod.POST, value="/api/spaces/register")
	public ResponseEntity<?> register(@Valid @RequestBody RegistrationData registrationData) {
		if (userService.hasUser(registrationData)) {
			return ResponseEntity
					.ok()
					.body(new MessageData("Error: Username is already taken!"));
		}

		return ResponseEntity.ok(userService.register(registrationData));
	}
}
