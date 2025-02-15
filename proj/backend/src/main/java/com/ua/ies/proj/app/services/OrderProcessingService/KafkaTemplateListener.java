package com.ua.ies.proj.app.services.OrderProcessingService;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.listener.MessageListener;
import org.springframework.stereotype.Component;

import com.ua.ies.proj.app.controllers.MessageController;
import com.ua.ies.proj.app.models.Menu;
import com.ua.ies.proj.app.models.Order;
import com.ua.ies.proj.app.models.OrderKafkaDTO;
import com.ua.ies.proj.app.models.OrderSocketDTO;
import com.ua.ies.proj.app.models.Restaurant;
import com.ua.ies.proj.app.repos.MenuRepository;
import com.ua.ies.proj.app.repos.OrderRepository;
import com.ua.ies.proj.app.repos.RestaurantRepository;

@Component
public class KafkaTemplateListener implements MessageListener<String, OrderKafkaDTO> {
    @Autowired
    private final OrderRepository orderRepository;

    @Autowired
    private final RestaurantRepository restaurantRepository;

    @Autowired
    private final MenuRepository menuRepository;

    @Autowired
    private final MessageController messageController;

    public KafkaTemplateListener(OrderRepository orderRepository, RestaurantRepository restaurantRepository, MessageController messageController, MenuRepository menuRepository) {
        this.orderRepository = orderRepository;
        this.restaurantRepository = restaurantRepository;
        this.messageController = messageController;
        this.menuRepository = menuRepository;
    }

    @Override
    public void onMessage(ConsumerRecord<String, OrderKafkaDTO> record) {
        String topic = record.topic();

        Restaurant restaurant = restaurantRepository.findByTopic(topic);

        OrderKafkaDTO order = record.value();
        System.out.println("Received order: " + order);
        
        Order newOrder = new Order();
        newOrder.setOrderId(order.getOrderId());
        newOrder.setRestaurant(restaurant);
        newOrder.setCreatedAt(Instant.parse(order.getCreatedAt() + "Z"));
        newOrder.setStatus(order.getStatus());
        newOrder.setPrice(order.getPrice());
        
        List<Menu> menus = new ArrayList<>();
        for (List<String> menu : order.getMenus()) {
            String menuName = menu.get(0);
            double price = Double.parseDouble(menu.get(1));
            String menuImage = menu.get(2);
            Optional<Menu> existingMenu = menuRepository.findByName(menuName);
            if (existingMenu.isPresent()) {
                menus.add(existingMenu.get());
            }
            else {
                Menu newMenu = new Menu();
                newMenu.setName(menuName);
                newMenu.setFoodchain(restaurant.getFoodchain());
                newMenu.setImage_url(menuImage);
                newMenu.setPrice(price);
                Menu savedMenu = menuRepository.save(newMenu);
                menus.add(savedMenu);
            }
        }
        newOrder.setMenus(menus);

        Optional<Order> existingOrder = orderRepository.findByOrderIdAndRestaurant(order.getOrderId(),restaurant);
        Order savedOrder;
        if (existingOrder.isPresent()) {
            Order existing = existingOrder.get();
            existing.setStatus(order.getStatus());
            existing.setPrice(order.getPrice());
            existing.setCreatedAt(Instant.parse(order.getCreatedAt() + "Z"));
            System.out.println("Order status updated: " + existing.getStatus());
            savedOrder = orderRepository.save(existing);
        } else {
            System.out.println("New order received: " + order.getOrderId());
            savedOrder = orderRepository.save(newOrder);
        }

        OrderSocketDTO orderSocketDTO = new OrderSocketDTO();
        orderSocketDTO.setId(savedOrder.getId());
        orderSocketDTO.setOrderId(savedOrder.getOrderId());
        orderSocketDTO.setRestaurantId(savedOrder.getRestaurant().getId());
        orderSocketDTO.setStatus(savedOrder.getStatus());
        orderSocketDTO.setCreatedAt(savedOrder.getCreatedAt().toString());

        messageController.sendOrder(orderSocketDTO);
    }
}
