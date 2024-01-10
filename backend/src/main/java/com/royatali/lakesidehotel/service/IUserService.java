package com.royatali.lakesidehotel.service;

import com.royatali.lakesidehotel.model.User;
import com.royatali.lakesidehotel.request.UpdateUser;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public interface IUserService {
    User registerUser(User user);
    List<User> getAllUsers();
    void deleteUser(String email);
    Optional<User> findByEmail(String email);
    User getUser(String email);
    User updateUserProfilePicture(byte[] photoBytes , String userId) throws SQLException;
    User updateUserProfileDetails(UpdateUser user, String userId);
    public void changePassword(User theUser, String newPassword);
    public String validatePasswordResetToken(String token);
    public User findUserByPasswordToken(String token);
    public void createPasswordResetTokenForUser(User user, String passwordResetToken);
    public void deleteResetPasswordToken(String passwordResetToken);
}
