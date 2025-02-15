package com.ua.ies.proj.app.models;

import java.util.Date;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("ADMIN")
public class UserAdmin extends User {
    public UserAdmin() {
        super();
    }

    public UserAdmin(String fname, String lname, String email, String password, Date birthDate) {
        super(fname, lname, email, password, birthDate);
    }
}
