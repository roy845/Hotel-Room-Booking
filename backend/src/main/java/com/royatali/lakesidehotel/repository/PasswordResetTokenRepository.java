package com.royatali.lakesidehotel.repository;

import com.royatali.lakesidehotel.password.PasswordResetToken;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    PasswordResetToken findByToken(String passwordResetToken);
    @Transactional
    void deleteByToken(String passwordResetToken);
}