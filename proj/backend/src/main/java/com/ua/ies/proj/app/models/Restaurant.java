package com.ua.ies.proj.app.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity(name = "restaurant")
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    @NotBlank
    private String address;

    @NotNull
    private double latitude;

    @NotNull
    private double longitude;

    @ManyToOne
    @JoinColumn(name = "foodchain_id")
    private Foodchain foodchain;

    @OneToOne
    @JoinColumn(name = "manager_id")
    private UserManager manager;

    private String topic;

    public Restaurant() {
    }

    public Restaurant(String name, String address, double latitude, double longitude, Foodchain foodchain, UserManager manager, String topic) {
        this.name = name;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
        this.foodchain = foodchain;
        this.manager = manager;
        this.topic = topic;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getAddress() {
        return address;
    }

    public double getLatitude() {
        return latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public Foodchain getFoodchain() {
        return foodchain;
    }

    public UserManager getManager() {
        return manager;
    }

    public String getTopic() {
        return topic;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public void setFoodchain(Foodchain foodchain) {
        this.foodchain = foodchain;
    }

    public void setManager(UserManager manager) {
        this.manager = manager;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }
}
