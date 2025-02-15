package com.ua.ies.proj.app.models;
import org.springframework.stereotype.Component;

@Component
public class UserInfo{
    private String role;
    private Long restaurant_id;
    private Long foodchain_id;
    private String fname;
    private String lname;

    public UserInfo() {
    }

    public UserInfo(String role, Long restaurant_id, Long foodchain_id, String fname, String lname) {
        this.role = role;
        this.restaurant_id = restaurant_id;
        this.foodchain_id = foodchain_id;
        this.fname = fname;
        this.lname = lname;
    }

    public String getRole() {
        return role;
    }

    public Long getRestaurant_id() {
        return restaurant_id;
    }

    public Long getFoodchain_id() {
        return foodchain_id;
    }

    public String getFname() {
        return fname;
    }

    public String getLname() {
        return lname;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setRestaurant_id(Long restaurant_id) {
        this.restaurant_id = restaurant_id;
    }

    public void setFoodchain_id(Long foodchain_id) {
        this.foodchain_id = foodchain_id;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }
}
