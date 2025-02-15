package com.ua.ies.proj.app.models;

import java.util.ArrayList;
import java.util.List;

public class OrderKafkaDTO {
    private Long id;

    private Long orderId;

    private Restaurant restaurant;

    private double price;

    private String status;

    private String createdAt;

    private List<List<String>> menus = new ArrayList<>();
       
    public OrderKafkaDTO() {
    }

    public OrderKafkaDTO(Restaurant restaurant, double price, String status, List<List<String>> menus, Long orderId, String createdAt) {
        this.restaurant = restaurant;
        this.price = price;
        this.status = status;
        this.menus = menus;
        this.orderId = orderId;
        this.createdAt = createdAt;
    }

    public long getId() {
        return id;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public double getPrice() {
        return price;
    }

    public String getStatus() {
        return status;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public List<List<String>> getMenus() {
        return menus;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public void setMenus(List<List<String>> menus) {
        this.menus = menus;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    @Override
    public String toString() {
        return "Order [createdAt=" + createdAt + ", id=" + id + ", menus=" + menus + ", orderId=" + orderId + ", price="
                + price + ", restaurant=" + restaurant + ", status=" + status + "]";
    }
}

