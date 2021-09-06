package com.yyamoryk.blogspaces.authentication;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.yyamoryk.blogspaces.helpers.WebTokenHelper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 * Authenticates the user request and sets the application security context.
 */
public class TokenToSecurityContextFilter extends OncePerRequestFilter {
  @Autowired
  private WebTokenHelper webTokenHelper;

  @Autowired
  private UserDetailsServiceImpl userDetailsService;

  private static final Logger logger = LoggerFactory.getLogger(TokenToSecurityContextFilter.class);

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
    try {
      String webToken = parseWebToken(request);
      if (webToken != null && webTokenHelper.validateWebToken(webToken)) {
        String username = webTokenHelper.getUserNameFromWebToken(webToken);

        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        var authentication = new UsernamePasswordAuthenticationToken(
            userDetails, null /* credentials */, userDetails.getAuthorities());
        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        SecurityContextHolder.getContext().setAuthentication(authentication);
      }
    } catch (Exception e) {
      logger.error("Can't authenticate the user: {}", e);
    }

    filterChain.doFilter(request, response);
  }

  /**
    * Gets an encrypted token from the HTTP Authorization header.
    *
    * @param  request  the HTTP header container
    * @return the encrypted token
    */
  private String parseWebToken(HttpServletRequest request) {
    String authorizationHeader = request.getHeader("Authorization");

    if (StringUtils.hasText(authorizationHeader) && authorizationHeader.startsWith("Bearer ")) {
      return authorizationHeader.substring(7, authorizationHeader.length());
    }

    return null;
  }
}
