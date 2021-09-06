package com.yyamoryk.blogspaces.helpers;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

@Component
public class WebTokenHelper {
	private static final Logger logger = LoggerFactory.getLogger(WebTokenHelper.class);

	@Value("${com.yyamoryk.jwtSecret}")
	private String jwtSecret;

	@Value("${com.yyamoryk.jwtExpirationMs}")
	private int jwtExpirationMs;

    /**
    * Makes an encrypted token built with the user's name.
    *
    * @param  authentication  the Spring container of the user's name
    * @return the encrypted token
    */
	public String generateWebToken(Authentication authentication) {
		var userdetailsUser = (org.springframework.security.core.userdetails.User) authentication.getPrincipal();

		return Jwts.builder()
            .setSubject(userdetailsUser.getUsername())
            .setIssuedAt(new Date())
            .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
            .signWith(SignatureAlgorithm.HS512, jwtSecret)
            .compact();
	}

    /**
    * Gets the user's name from the encrypted token.
    *
    * @param  webToken  the encrypted token
    * @return the user's name
    */
	public String getUserNameFromWebToken(String webToken) {
		return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(webToken).getBody().getSubject();
	}

    /**
    * Tries parsing the encrypted token.
    *
    * @param  webToken  the encrypted token
    * @return whether parsing was successful
    */
	public boolean validateWebToken(String webToken) {
		try {
			Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(webToken);
			return true;
		} catch (SignatureException e) {
			logger.error("Invalid JWT signature: {}", e.getMessage());
		} catch (MalformedJwtException e) {
			logger.error("Invalid JWT token: {}", e.getMessage());
		} catch (ExpiredJwtException e) {
			logger.error("Expired JWT token: {}", e.getMessage());
		} catch (UnsupportedJwtException e) {
			logger.error("Unsupported JWT token: {}", e.getMessage());
		} catch (IllegalArgumentException e) {
			logger.error("Empty JWT token: {}", e.getMessage());
		}

		return false;
	}
}
