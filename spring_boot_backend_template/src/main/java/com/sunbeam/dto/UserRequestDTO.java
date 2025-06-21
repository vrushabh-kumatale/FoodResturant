package com.sunbeam.dto;

import java.time.LocalDate;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.Range;

import com.sunbeam.entities.UserRole;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequestDTO {
	@NotBlank(message = "first name is required")
	@Length(min = 5, max = 20, message = "invalid length of firstname")
	private String firstName;
	@NotBlank(message = "last name is required")
	private String lastName;
	@NotBlank
	@Email(message = "invalid email format")
	private String email;
	@Pattern
	(regexp = "((?=.*\\d)(?=.*[a-z])(?=.*[#@$*]).{5,20})", 
	message = "Invalid password format")
	private String password;
	@NotNull
	@Past(message = "invalid date")
	private LocalDate dob;
	@NotNull
	private UserRole userRole;
	@Range(min = 1000,max=5000)
	private double subscriptionAmount;
}
