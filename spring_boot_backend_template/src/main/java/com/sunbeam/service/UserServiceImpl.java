package com.sunbeam.service;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.sunbeam.custom_exceptions.ApiException;
import com.sunbeam.custom_exceptions.AuthenticationException;
import com.sunbeam.custom_exceptions.ResourceNotFoundException;
import com.sunbeam.dao.UserDao;
import com.sunbeam.dto.AddressDTO;
import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.AuthRequest;
import com.sunbeam.dto.UserRequestDTO;
import com.sunbeam.dto.UserRespDTO;
import com.sunbeam.entities.Address;
import com.sunbeam.entities.User;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class UserServiceImpl implements UserService{
	
	private final UserDao userDao;
	private ModelMapper mapper;

	@Override
	public UserRespDTO authenticate(AuthRequest dto) {
		User entity = userDao.findByEmailAndPassword(dto.getEmail(), dto.getPassword())
				.orElseThrow(() -> new AuthenticationException("invalid login!!!!"));
		return mapper.map(entity, UserRespDTO.class);
	}

	@Override
	public UserRespDTO signUp(UserRequestDTO dto) {
		//check if dup email
		if(userDao.existsByEmail(dto.getEmail()))
			throw new ApiException("Duplicate Email detected - User exists already!!!");
		
		User entity = mapper.map(dto, User.class);
		return mapper.map(userDao.save(entity), UserRespDTO.class);
	}

	@Override
	public ApiResponse assignAddress(Long userId, AddressDTO dto) {
		
		User userEntity=userDao.findById(userId).orElseThrow(
				() -> new ResourceNotFoundException("Invalid user id - can;t link user address!!!!!"));
		//userEntity : persistent
		//2. map adr dto -> adr entity
		Address adrEntity=mapper.map(dto, Address.class);
		//3 establish uni dir asso between entities : User 1--->1 Address
		userEntity.setMyAddress(adrEntity);//modifying state of persistent entity
		return new ApiResponse("address linked to user ....");
	}

}
