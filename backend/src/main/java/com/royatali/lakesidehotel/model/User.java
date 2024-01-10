package com.royatali.lakesidehotel.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.royatali.lakesidehotel.serializers.BlobSerializer;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.Collection;
import java.util.HashSet;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    @Lob
    @JsonSerialize(using = BlobSerializer.class)
    private Blob profilePicture = getDefaultProfilePicture();
    private String password;
    private boolean isEnabled = false;
    @ManyToMany(fetch= FetchType.EAGER,cascade = {CascadeType.PERSIST,CascadeType.MERGE,CascadeType.DETACH})
    @JoinTable(name = "user_roles",joinColumns = @JoinColumn(name = "user_id",referencedColumnName = "id"),inverseJoinColumns = @JoinColumn(name = "role_id",referencedColumnName = "id"))
    private Collection<Role> roles = new HashSet<>();

    private Blob getDefaultProfilePicture() {
        try {
            InputStream inputStream = getClass().getClassLoader().getResourceAsStream("default_profile_picture.jpeg");
            if (inputStream != null) {
                return new SerialBlob(inputStream.readAllBytes());
            } else {
                return null;
            }
        } catch (IOException | SQLException e) {

            e.printStackTrace();
            return null;
        }

    }
}
