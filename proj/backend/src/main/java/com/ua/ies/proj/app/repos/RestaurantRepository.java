package com.ua.ies.proj.app.repos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ua.ies.proj.app.models.Restaurant;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    List<Restaurant> findByFoodchainId(Long foodchain_id);
    Restaurant findByTopic(String topic);
    Optional<Restaurant> findByName(String name);
    Optional<Restaurant> findByManagerId(Long manager_id);
}
