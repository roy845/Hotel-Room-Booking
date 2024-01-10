package com.royatali.lakesidehotel.controller;
import com.royatali.lakesidehotel.model.User;
import com.royatali.lakesidehotel.request.UpdateUser;
import com.royatali.lakesidehotel.response.UserResponse;
import com.royatali.lakesidehotel.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final IUserService userService;

    @GetMapping("/all")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<User>> getUsers(){
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping("/{email}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getUserByEmail(@PathVariable("email") String email){
        try{
            User theUser = userService.getUser(email);
            return ResponseEntity.ok(theUser);
        }catch (UsernameNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching user");
        }
    }

    @PutMapping("/updateUserProfilePicture/{userId}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<UserResponse> updateUserProfilePicture(@RequestParam("profilePicture") MultipartFile photo, @PathVariable("userId") String userId) throws SQLException, IOException {

        byte[] photoBytes = photo.getBytes();
        User user  = userService.updateUserProfilePicture(photoBytes,userId);

        return ResponseEntity.ok(new UserResponse(user.getId(),user.getFirstName(), user.getLastName(),user.getEmail(),user.getProfilePicture().getBytes(1,(int)user.getProfilePicture().length())));

    }


    @PutMapping("/updateUserProfileDetails/{userId}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<UserResponse> updateUserProfileDetails(@RequestBody UpdateUser user, @PathVariable("userId") String userId) throws SQLException {

        User updatedUser = userService.updateUserProfileDetails(user,userId);
        return ResponseEntity.ok(new UserResponse(updatedUser.getId(),updatedUser.getFirstName(), updatedUser.getLastName(),updatedUser.getEmail(),updatedUser.getProfilePicture().getBytes(1,(int)updatedUser.getProfilePicture().length())));

    }

    @DeleteMapping("/delete/{email}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER') and #email == principal.username")
    public ResponseEntity<String> deleteUser(@PathVariable("email") String email){
        try{
            userService.deleteUser(email);
            return ResponseEntity.ok("User deleted successfully");
        }catch(UsernameNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting user");
        }
    }
}
