package com.yyamoryk.blogspaces.controllers;

import static org.hamcrest.Matchers.containsString;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Iterator;
import java.util.Optional;
import java.util.Arrays;

import com.yyamoryk.blogspaces.authentication.AuthenticationConfig;
import com.yyamoryk.blogspaces.authentication.UnauthorizedRequestHandler;
import com.yyamoryk.blogspaces.entities.AuthData;
import com.yyamoryk.blogspaces.entities.MessageData;
import com.yyamoryk.blogspaces.entities.RegistrationData;
import com.yyamoryk.blogspaces.entities.User;
import com.yyamoryk.blogspaces.entities.WebTokenData;
import com.yyamoryk.blogspaces.helpers.WebTokenHelper;
import com.yyamoryk.blogspaces.repositories.UserRepository;
import com.yyamoryk.blogspaces.services.UserService;
import com.yyamoryk.blogspaces.authentication.UserDetailsServiceImpl;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpStatus;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(UserController.class)
@Import({AuthenticationConfig.class, UserDetailsServiceImpl.class, UnauthorizedRequestHandler.class,
	WebTokenHelper.class })
public class UserControllerTests {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private UserService userService;

	@MockBean
	private UserRepository repository;

	@Autowired
	UserController userController;

	@Test
	public void getAllShouldReturnHelloblogspaces() throws Exception {
        final Iterable<User> helloBlogSpacesUsers = new Iterable<>() { 
            private User[] users = new User[] {new User("TestUser", "TestPassword", null)};    
    
            public Iterator<User> iterator() {
                return Arrays.stream(users).iterator();
            }
        };
		when(userService.getAll()).thenReturn(helloBlogSpacesUsers);
		when(repository.findByName(any())).thenReturn(Optional.of(new User("TestUser", "TestPassword", null)));
		this.mockMvc.perform(get("/api/spaces/users")).andDo(print()).andExpect(status().isOk())
				.andExpect(content().string(containsString("TestUser")))
				.andExpect(content().string(containsString("TestPassword")));
	}

	@Test
	public void authenticateShouldContainUserServiceResponse() {
		var testAuthData = new AuthData();
		var expectedTestWebTokenData = new WebTokenData("testToken", "testUserName");
		when(userService.authenticate(testAuthData)).thenReturn(expectedTestWebTokenData);

		var actualResponseEntity = userController.authenticate(testAuthData);

		assertEquals(HttpStatus.OK, actualResponseEntity.getStatusCode());
		assertEquals(expectedTestWebTokenData, actualResponseEntity.getBody());
	}

	@Test
	public void registerShouldContainUserServiceResponse() {
		var testRegistrationData = new RegistrationData();
		var expectedMessageData = new MessageData("testMessage");
		when(userService.register(testRegistrationData)).thenReturn(expectedMessageData);

		var actualResponseEntity = userController.register(testRegistrationData);

		assertEquals(HttpStatus.OK, actualResponseEntity.getStatusCode());
		assertEquals(expectedMessageData, actualResponseEntity.getBody());
	}
}
