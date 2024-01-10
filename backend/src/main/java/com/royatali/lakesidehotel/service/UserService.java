package com.royatali.lakesidehotel.service;

import com.royatali.lakesidehotel.exception.ResourceNotFoundException;
import com.royatali.lakesidehotel.exception.UserAlreadyExistsException;
import com.royatali.lakesidehotel.model.User;
import com.royatali.lakesidehotel.repository.RoleRepository;
import com.royatali.lakesidehotel.repository.UserRepository;
import com.royatali.lakesidehotel.request.UpdateUser;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import com.royatali.lakesidehotel.model.Role;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import javax.sql.rowset.serial.SerialBlob;
import java.sql.SQLException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService{
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    private final PasswordResetTokenService passwordResetTokenService;
    @Override
    public User registerUser(User user) {
        if(userRepository.existsByEmail(user.getEmail())){
            throw new UserAlreadyExistsException(user.getEmail() + " already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Role userRole = roleRepository.findByName("ROLE_USER").get();
        user.setRoles(Collections.singletonList(userRole));
        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Transactional
    @Override
    public void deleteUser(String email) {

        User user = getUser(email);
        if(user!=null){
            userRepository.deleteByEmail(email);
        }

    }
    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User getUser(String email) {
        return userRepository.findByEmail(email).orElseThrow(()->new UsernameNotFoundException("User not found"));
    }

    @Override
    public User updateUserProfilePicture(byte[] photoBytes, String userId) throws SQLException {
        User user = userRepository.findByEmail(userId).orElseThrow(()->new ResourceNotFoundException("User not found"));

        if(photoBytes.length>0){
            user.setProfilePicture(new SerialBlob(photoBytes));
        }

        userRepository.save(user);
        return userRepository.findByEmail(userId).orElseThrow(()->new ResourceNotFoundException("User not found"));
    }

    @Override
    public User updateUserProfileDetails(UpdateUser user, String userId) {
        User userFromDB = userRepository.findByEmail(userId).orElseThrow(()->new ResourceNotFoundException("User not found"));
        if(user.getFirstName()!=null){
            userFromDB.setFirstName(user.getFirstName());
        }
        if(user.getLastName()!=null){
            userFromDB.setLastName(user.getLastName());
        }
        if(user.getEmail()!=null){
            userFromDB.setEmail(user.getEmail());
        }
        if(user.getPassword()!=""){
            userFromDB.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        userRepository.save(userFromDB);
        return userRepository.findByEmail(userId).orElseThrow(()->new ResourceNotFoundException("User not found"));
    }
    public void changePassword(User theUser, String newPassword) {
        theUser.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(theUser);
    }
    @Override
    public String validatePasswordResetToken(String token) {
        return passwordResetTokenService.validatePasswordResetToken(token);
    }
    @Override
    public User findUserByPasswordToken(String token) {
        return passwordResetTokenService.findUserByPasswordToken(token).get();
    }
    @Override
    public void createPasswordResetTokenForUser(User user, String passwordResetToken) {
        passwordResetTokenService.createPasswordResetTokenForUser(user, passwordResetToken);
    }
    @Override
    public void deleteResetPasswordToken(String passwordResetToken){
        passwordResetTokenService.deleteByToken(passwordResetToken);
    }
}
