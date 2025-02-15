package com.ua.ies.proj.app.models;

import org.springframework.stereotype.Component;

@Component
public abstract  class Info {
    private String name;
    private Long id;

    public Info() {
    }

    public Info(Long id, String name) {
        this.name = name;
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Long getId() {
        return id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
