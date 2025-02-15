package com.ua.ies.proj.app.models;

import java.util.Date;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("MANAGER")
public class UserManager extends User {
    public UserManager() {
        super();
    }

    public UserManager(String fname, String lname, String email, String password, Date birthDate) {
        super(fname, lname, email, password, birthDate);
    }
    
}
