package com.ua.ies.proj.app.services.OrderProcessingService;

import java.util.List;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.config.KafkaListenerEndpointRegistry;
import org.springframework.kafka.listener.ConcurrentMessageListenerContainer;
import org.springframework.kafka.listener.ContainerProperties;
import org.springframework.stereotype.Service;

import com.ua.ies.proj.app.controllers.MessageController;
import com.ua.ies.proj.app.models.OrderKafkaDTO;
import com.ua.ies.proj.app.models.Restaurant;
import com.ua.ies.proj.app.repos.MenuRepository;
import com.ua.ies.proj.app.repos.OrderRepository;
import com.ua.ies.proj.app.repos.RestaurantRepository;

@Service
public class OrderProcessingService {
    
    private final ConcurrentKafkaListenerContainerFactory<String, OrderKafkaDTO> kafkaListenerContainerFactory;

    private final OrderRepository orderRepository;

    private final RestaurantRepository restaurantRepository;

    private final MessageController messageController;

    private final MenuRepository menuRepository;

    public OrderProcessingService(OrderRepository orderRepository, RestaurantRepository restaurantRepository, KafkaListenerEndpointRegistry kafkaListenerEndpointRegistry, ConcurrentKafkaListenerContainerFactory<String, OrderKafkaDTO> kafkaListenerContainerFactory, MessageController messageController, MenuRepository menuRepository) {
        this.orderRepository = orderRepository;
        this.restaurantRepository = restaurantRepository;
        this.kafkaListenerContainerFactory = kafkaListenerContainerFactory;
        this.messageController = messageController;
        this.menuRepository = menuRepository;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void initializeListeners() {
        try {
            List<Restaurant> restaurants = restaurantRepository.findAll();

            for (Restaurant restaurant : restaurants) {
                System.out.println("Creating listener for restaurant: " + restaurant.getName());
                createListenerForRestaurant(restaurant.getTopic(), "group-" + restaurant.getId());
            }
        } catch (Exception e) {
            System.out.println("Error initializing listeners: " + e);
        }
    }

    public void createListenerForRestaurant(String topic, String groupId) {
        ContainerProperties containerProperties = new ContainerProperties(topic);
        containerProperties.setGroupId(groupId);
        containerProperties.setMessageListener(new KafkaTemplateListener(orderRepository, restaurantRepository, messageController, menuRepository));
       
        ConcurrentMessageListenerContainer<String, OrderKafkaDTO> container = new ConcurrentMessageListenerContainer<>(kafkaListenerContainerFactory.getConsumerFactory(), containerProperties);
        container.start();
    }
}
