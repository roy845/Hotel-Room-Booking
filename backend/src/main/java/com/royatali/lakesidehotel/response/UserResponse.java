package com.royatali.lakesidehotel.response;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;

@Data
@NoArgsConstructor
public class UserResponse {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String profilePicture;

    public UserResponse(Long id, String firstName, String lastName, String email, byte[] photoByte) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.profilePicture = photoByte!=null ? Base64.encodeBase64String(photoByte) : null;

    }
}
