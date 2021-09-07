package com.yyamoryk.blogspaces.services;

import static org.mockito.Mockito.when;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import com.yyamoryk.blogspaces.entities.AuthData;
import com.yyamoryk.blogspaces.entities.RegistrationData;
import com.yyamoryk.blogspaces.entities.User;
import com.yyamoryk.blogspaces.entities.WebTokenData;
import com.yyamoryk.blogspaces.helpers.WebTokenHelper;
import com.yyamoryk.blogspaces.repositories.UserRepository;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootTest
public class UserServiceTests {

	@MockBean
    UserRepository userRepository;

    @MockBean
    AuthenticationManager authenticationManager;

    @MockBean
    PasswordEncoder passwordEncoder;

    @MockBean
    WebTokenHelper webTokenHelper;

    @MockBean
    Authentication authentication;

    @Autowired
    UserService userService;

    @Test
    public void authenticateShouldReturnExpectedWebTokenData() {
        String testPassword = "testPassword";
        String testUserName = "testUserName";
        AuthData testAuthData = new AuthData(testUserName, testPassword);
        when(authenticationManager.authenticate(any())).thenReturn(new TestingAuthenticationToken(new org.springframework.security.core.userdetails.User(testUserName, testPassword, AuthorityUtils.NO_AUTHORITIES), testPassword));
        when(webTokenHelper.generateWebToken(any())).thenReturn(testPassword);

        WebTokenData webTokenData = userService.authenticate(testAuthData);

        Assertions.assertEquals(testPassword, webTokenData.getToken()); 
        Assertions.assertEquals(testUserName, webTokenData.getUsername()); 
	}

    @Test
    public void registerShouldSaveUserFromRegistrationData() {
        String testPassword = "testPassword";
        String testUserName = "testUserName";
        var testRegistrationData = new RegistrationData("testUserName", "testPassword");
        when(passwordEncoder.encode(testPassword)).thenReturn(testPassword);
        var userCaptor = ArgumentCaptor.forClass(User.class);
        
        userService.register(testRegistrationData);     

        verify(userRepository, times(1)).save(userCaptor.capture());
        User actualUser = userCaptor.getValue();
        Assertions.assertEquals(testUserName, actualUser.getName()); 
    }

    @Test
    public void hasUserShouldMatchUserRepositoryResponse() {
        var testUserName = "testUserName";
        var testRegistrationData = new RegistrationData(testUserName, "testUserPassword");
        when(userRepository.existsByName(testUserName)).thenReturn(false);

        boolean actualHasUser = userService.hasUser(testRegistrationData);

        Assertions.assertEquals(false, actualHasUser); 
        verify(userRepository, times(1)).existsByName(testUserName);
    }
}
