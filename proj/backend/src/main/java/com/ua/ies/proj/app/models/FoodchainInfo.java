package com.ua.ies.proj.app.models;

import org.springframework.stereotype.Component;

@Component
public class FoodchainInfo extends Info {

    public FoodchainInfo() {
    }

    public FoodchainInfo(Long id, String name) {
        super(id, name);
    }
}
