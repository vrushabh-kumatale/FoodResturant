package com.sunbeam.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.dto.AddressDTO;
import com.sunbeam.dto.AuthRequest;
import com.sunbeam.dto.UserRequestDTO;
import com.sunbeam.service.UserService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

	private final UserService userService;
	
	@PostMapping("/signin")
	public ResponseEntity<?> userSignIn(@RequestBody AuthRequest dto) {
		return ResponseEntity.ok(userService.authenticate(dto));
		
	}
	
	@PostMapping("/signup")
	public ResponseEntity<?> userSignUp(@RequestBody @Valid UserRequestDTO dto)
	{
		System.out.println("in User signup: "+dto);
		
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(userService.signUp(dto));
		
	}
	
	@PostMapping("/{userId}/address")
	public ResponseEntity<?> assignUserAddress(
			@PathVariable Long userId,@RequestBody AddressDTO dto) {
		System.out.println("assign adr ");
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(userService.assignAddress(userId,dto));
	}
}
