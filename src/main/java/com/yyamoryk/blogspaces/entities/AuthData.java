package com.yyamoryk.blogspaces.entities;

import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthData {
	@NotBlank
	private String username;

	@NotBlank
	private String password;
}
