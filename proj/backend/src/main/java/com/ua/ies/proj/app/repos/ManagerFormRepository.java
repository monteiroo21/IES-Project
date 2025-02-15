package com.ua.ies.proj.app.repos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ua.ies.proj.app.models.ManagerForm;

public interface ManagerFormRepository extends JpaRepository<ManagerForm, Long> {
    @Override
    Optional<ManagerForm> findById(Long id);

    List<ManagerForm> findByState(String state);

    Optional<ManagerForm> findByEmail(String email);

    Optional<ManagerForm> findByManager(Long manager_id);
}
