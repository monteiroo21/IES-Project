package com.ua.ies.proj.app.models;

import org.springframework.stereotype.Component;

@Component
public class MenuInfo extends Info {
    private double price;

    public MenuInfo() {
    }

    public MenuInfo(Long id, String name, double price) {
        super(id, name);
        this.price = price;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

}
