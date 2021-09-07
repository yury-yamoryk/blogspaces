package com.yyamoryk.blogspaces.services;

import com.yyamoryk.blogspaces.entities.AuthData;
import com.yyamoryk.blogspaces.entities.MessageData;
import com.yyamoryk.blogspaces.entities.RegistrationData;
import com.yyamoryk.blogspaces.entities.User;
import com.yyamoryk.blogspaces.entities.WebTokenData;
import com.yyamoryk.blogspaces.helpers.WebTokenHelper;
import com.yyamoryk.blogspaces.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    WebTokenHelper webTokenHelper;

    public Iterable<User> getAll() {
        return userRepository.findUsers();
    }

    public User save(User user) {
        userRepository.save(user);
        return user;
    }

    public WebTokenData authenticate(AuthData authData) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(authData.getUsername(), authData.getPassword(), AuthorityUtils.NO_AUTHORITIES));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String webToken = webTokenHelper.generateWebToken(authentication);
		
		var userdetailsUser = (org.springframework.security.core.userdetails.User) authentication.getPrincipal();

		return new WebTokenData(webToken, userdetailsUser.getUsername());
	}

    public boolean hasUser(RegistrationData registrationData) {
        return userRepository.existsByName(registrationData.getUsername());
    }

    public MessageData register(RegistrationData registrationData) {
		User user = new User(registrationData.getUsername(),
            passwordEncoder.encode(registrationData.getPassword()), null /* blogs */);        
        userRepository.save(user);

        return new MessageData("User registered successfully!");
    }
}
