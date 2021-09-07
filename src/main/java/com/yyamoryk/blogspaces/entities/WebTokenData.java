package com.yyamoryk.blogspaces.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class WebTokenData {
	private final String token;
	private final String username;
	@JsonIgnore
	private String type = "Bearer";
}
