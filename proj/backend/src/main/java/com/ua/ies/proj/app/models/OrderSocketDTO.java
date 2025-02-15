package com.ua.ies.proj.app.models;

public class OrderSocketDTO {
    private Long id;

    private Long orderId;

    private Long restaurantId;

    private String status;

    private String createdAt;

    public OrderSocketDTO() {
    }

    public OrderSocketDTO(Long orderId, Long restaurantId, String status, String createdAt) {
        this.orderId = orderId;
        this.restaurantId = restaurantId;
        this.status = status;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public Long getOrderId() {
        return orderId;
    }

    public Long getRestaurantId() {
        return restaurantId;
    }

    public String getStatus() {
        return status;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public void setRestaurantId(Long restaurantId) {
        this.restaurantId = restaurantId;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

}
