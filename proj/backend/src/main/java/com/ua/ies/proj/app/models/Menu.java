package com.ua.ies.proj.app.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;

@Entity(name = "menu")
public class Menu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    @NotNull
    private double price;

    private String image_url;

    @ManyToOne
    @JoinColumn(name = "foodchain_id")
    private Foodchain foodchain;

    public Menu() {
    }

    public Menu(String name, double price, Foodchain foodchain, String image_url) {
        this.name = name;
        this.price = price;
        this.foodchain = foodchain;
        this.image_url = image_url;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    public Foodchain getFoodchain() {
        return foodchain;
    }

    public String getImage_url() {
        return image_url;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public void setFoodchain(Foodchain foodchain) {
        this.foodchain = foodchain;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }
}
