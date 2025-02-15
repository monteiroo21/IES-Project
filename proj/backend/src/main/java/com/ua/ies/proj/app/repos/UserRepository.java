package com.ua.ies.proj.app.repos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ua.ies.proj.app.models.User;
import com.ua.ies.proj.app.models.UserManager;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<UserManager> findManagerById(Long id);
    Optional<User> findByEmail(String email);
}
