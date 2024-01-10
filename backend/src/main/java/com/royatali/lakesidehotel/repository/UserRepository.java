package com.royatali.lakesidehotel.repository;

import com.royatali.lakesidehotel.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    boolean existsByEmail(String email);
    void deleteByEmail(String email);
    Optional<User> findByEmail(String email);
}
