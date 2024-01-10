package com.royatali.lakesidehotel.controller;

import com.dailycodework.lakesidehotel.response.JwtResponse;
import com.royatali.lakesidehotel.event.listener.RegistrationCompleteEventListener;
import com.royatali.lakesidehotel.exception.InvalidVerificationTokenException;
import com.royatali.lakesidehotel.exception.UserAlreadyExistsException;
import com.royatali.lakesidehotel.model.User;
import com.royatali.lakesidehotel.password.PasswordResetRequest;
import com.royatali.lakesidehotel.request.LoginRequest;
import com.royatali.lakesidehotel.security.jwt.JwtUtils;
import com.royatali.lakesidehotel.security.user.HotelUserDetails;
import com.royatali.lakesidehotel.service.IUserService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@RequestMapping("/auth")
@RestController
@RequiredArgsConstructor
public class AuthController {
    private final IUserService userService;
    private final AuthenticationManager authenticationManager;
    private final RegistrationCompleteEventListener eventListener;
    private final JwtUtils jwtUtils;
    @PostMapping("/register-user")
    public ResponseEntity<?> registerUser(@RequestBody User user){
        try{
            userService.registerUser(user);
            return ResponseEntity.ok("Registration successful!");
        }catch(UserAlreadyExistsException e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());

        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest request){
        Authentication authentication =
                authenticationManager
                        .authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtTokenForUser(authentication);
        HotelUserDetails userDetails = (HotelUserDetails) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority).toList();
        return ResponseEntity.ok(new JwtResponse(
                userDetails.getId(),
                userDetails.getEmail(),
                userDetails.getFirstName(),
                userDetails.getLastName(),
                jwt,
                roles));
    }

    @GetMapping("/checkToken")
    public ResponseEntity<String> checkToken(@RequestHeader("Authorization") String authorizationHeader){
        String token = authorizationHeader.substring(7);

        if (jwtUtils.isTokenValid(token)) {
            return ResponseEntity.ok("Token is valid");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is invalid");
        }
    }

    @PostMapping("/password-reset-request")
    public ResponseEntity<String> resetPasswordRequest(@RequestBody PasswordResetRequest passwordResetRequest,
                                       final HttpServletRequest servletRequest)
            throws InvalidVerificationTokenException, UnsupportedEncodingException, MessagingException {

        Optional<User> user = userService.findByEmail(passwordResetRequest.getEmail());
        String passwordResetUrl = "";
        if (user.isPresent()) {
            String passwordResetToken = UUID.randomUUID().toString();
            userService.createPasswordResetTokenForUser(user.get(), passwordResetToken);
            passwordResetUrl = passwordResetEmailLink(user.get(), applicationUrl(servletRequest), passwordResetToken);
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
            return ResponseEntity.status(HttpStatus.OK).body("Password reset instructions sent to " + passwordResetRequest.getEmail());
    }


    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody PasswordResetRequest passwordResetRequest,
                                @RequestParam("token") String token){
        String tokenVerificationResult = userService.validatePasswordResetToken(token);
        if (!tokenVerificationResult.equalsIgnoreCase("valid")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid token password reset token");
        }
        Optional<User> theUser = Optional.ofNullable(userService.findUserByPasswordToken(token));
        if (theUser.isPresent()) {
            userService.changePassword(theUser.get(), passwordResetRequest.getNewPassword());
            userService.deleteResetPasswordToken(token);
            return ResponseEntity.status(HttpStatus.OK).body("Password has been reset successfully");
        }
       return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid password reset token");
    }

    private String passwordResetEmailLink(User user, String applicationUrl,
                                          String passwordToken) throws InvalidVerificationTokenException, UnsupportedEncodingException, MessagingException {
        String url = applicationUrl + "/reset-password?token=" + passwordToken;
        eventListener.sendPasswordResetVerificationEmail(user, url);
        log.info("Click the link to reset your password: {}", url);
        return url;
    }

    public String applicationUrl(HttpServletRequest request) {
        return "http://"+request.getServerName()+":"
                +request.getServerPort()+request.getContextPath();
    }

}


