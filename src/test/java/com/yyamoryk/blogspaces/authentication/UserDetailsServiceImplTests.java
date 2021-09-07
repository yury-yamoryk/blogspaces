package com.yyamoryk.blogspaces.authentication;

import static org.mockito.Mockito.when;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.yyamoryk.blogspaces.entities.User;
import com.yyamoryk.blogspaces.repositories.UserRepository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@SpringBootTest
public class UserDetailsServiceImplTests {

	@MockBean
    UserRepository userRepository;

    @Autowired
    UserDetailsServiceImpl userDetailsServiceImpl;

    @Test
	public void loadUserByUsernameShouldGetInfoFromRepository() {
        var testUserName = "testUserName";
        var testPassword = "testPassword";
        when(userRepository.findByName(testUserName)).thenReturn(Optional.of(new User(testUserName, testPassword, null /* blogs */)));

        var actualUser = (org.springframework.security.core.userdetails.User)userDetailsServiceImpl.loadUserByUsername(testUserName);

        assertEquals(testUserName, actualUser.getUsername());
        assertEquals(testPassword, actualUser.getPassword());
	}

    @Test()
    public void loadUserByUsernameShouldThrow() {
        var testUserName = "testUserName";
        when(userRepository.findByName(testUserName)).thenReturn(Optional.empty());
        
        Exception exception = assertThrows(UsernameNotFoundException.class, () -> {
            userDetailsServiceImpl.loadUserByUsername(testUserName);
        });
    
        String expectedMessage = "User Not Found with username: testUserName";
        String actualMessage = exception.getMessage();
    
        assertTrue(actualMessage.contains(expectedMessage));
    }
}
