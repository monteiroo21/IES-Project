package com.ua.ies.proj.app.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;

@Entity(name = "foodchain")
public class Foodchain {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique=true, nullable=false)
    private String name;

    private String image_url;

    @NotBlank
    private String food_type;

    public Foodchain() {
    }

    public Foodchain(String name, String food_type, String image_url) {
        this.name = name;
        this.food_type = food_type;
        this.image_url = image_url;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getFood_type() {
        return food_type;
    }

    public String getImage_url() {
        return image_url;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setFood_type(String food_type) {
        this.food_type = food_type;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }
}
