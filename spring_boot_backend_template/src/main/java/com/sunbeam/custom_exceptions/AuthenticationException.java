package com.sunbeam.custom_exceptions;

public class AuthenticationException extends RuntimeException{
	public AuthenticationException(String mesg) {
		super(mesg);
	}
}
