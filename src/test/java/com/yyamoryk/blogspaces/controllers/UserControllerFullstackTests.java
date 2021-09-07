package com.yyamoryk.blogspaces.controllers;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;

import static org.assertj.core.api.Assertions.assertThat;

import com.yyamoryk.blogspaces.BlogspacesApplication;

@SpringBootTest(
	webEnvironment = WebEnvironment.RANDOM_PORT,
  classes = BlogspacesApplication.class)
public class UserControllerFullstackTests {

	@LocalServerPort
	private int port;

	@Autowired
	private TestRestTemplate restTemplate;

	@Test
	public void userShouldReturnHelloblogspaces() throws Exception {
		assertThat(this.restTemplate.getForObject("http://localhost:" + port + "/users",
				String.class)).contains("Test User 1");
	}
}
