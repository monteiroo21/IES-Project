package com.ua.ies.proj.app.repos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ua.ies.proj.app.models.Menu;

public interface MenuRepository extends JpaRepository<Menu, Long> {
    List<Menu> findByFoodchainId(Long foodchain_id);
    Optional<Menu> findByName(String name);

    @Query(value = """
        SELECT m.* AS menu
        FROM order_items oi
        JOIN orders o ON oi.order_id = o.id
        JOIN menu m ON oi.menu_id = m.id
        WHERE o.created_at >= NOW() - INTERVAL '5 minutes'
        GROUP BY m.id, m.name, m.price, m.foodchain_id
        ORDER BY COUNT(o.id) DESC LIMIT 6;
        """, nativeQuery = true)
    List<Menu> getMenuStatistics();
}
