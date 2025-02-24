package com.ua.ies.proj.app.auth;

import org.springframework.stereotype.Component;

@Component
public class LoginRequest {
    private String email;
    private String password;

    public LoginRequest(){}

    public LoginRequest(String email, String password){
        this.email = email;
        this.password = password;
    }

    public String getEmail(){
        return this.email;
    }

    public String getPassword(){
        return this.password;
    }

    public void setEmail(String email){
        this.email = email;
    }

    public void setPassword(String password){
        this.password = password;
    }
}
