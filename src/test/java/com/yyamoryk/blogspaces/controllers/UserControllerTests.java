package com.yyamoryk.blogspaces.controllers;

import static org.hamcrest.Matchers.containsString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Iterator;
import java.util.Arrays;

import com.yyamoryk.blogspaces.entities.User;
import com.yyamoryk.blogspaces.services.UserService;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(UserController.class)
public class UserControllerTests {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private UserService service;

	@Test
	public void getAllShouldReturnHelloblogspaces() throws Exception {
        final Iterable<User> helloBlogSpacesUsers = new Iterable<>() { 
            private User[] users = new User[] {new User("id", "Hello blog spaces")};    
    
            public Iterator<User> iterator() {
                return Arrays.stream(users).iterator();
            }
        };
		when(service.getAll()).thenReturn(helloBlogSpacesUsers);
		this.mockMvc.perform(get("/users")).andDo(print()).andExpect(status().isOk())
				.andExpect(content().string(containsString("Hello blog spaces")));
	}
}
