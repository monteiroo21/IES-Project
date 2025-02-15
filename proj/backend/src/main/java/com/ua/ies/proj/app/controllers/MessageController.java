package com.ua.ies.proj.app.controllers;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.ua.ies.proj.app.models.OrderSocketDTO;

@Controller
public class MessageController {
    private final SimpMessagingTemplate simpMessagingTemplate;

    public MessageController(SimpMessagingTemplate simpMessagingTemplate) {
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    public void sendOrder(OrderSocketDTO order){
        simpMessagingTemplate.convertAndSend("/topic/orders", order);
    }
}
