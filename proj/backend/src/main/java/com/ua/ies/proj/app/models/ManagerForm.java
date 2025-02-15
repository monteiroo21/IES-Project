package com.ua.ies.proj.app.models;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity(name = "forms")
public class ManagerForm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "foodchain_id")
    private Foodchain foodchain;

    @NotBlank
	private String fname;

	@NotBlank
	private String lname;

	@Column(unique = true, nullable = false)
	private String email;

	private Date birthDate;

	@NotBlank
	private String restaurantName;

	@NotBlank
	private String restaurantAddress;

	@NotNull
	private double latitude;

	@NotNull
	private double longitude;

	@NotBlank
	private String restaurantEndpoint;

	@NotBlank
	private String password;

	private String state;

	private Long manager;

	public ManagerForm() {
	}

	public ManagerForm(Foodchain foodchain, String fname, String lname, String email, String restaurantName, String restaurantAddress, double latitude, double longitude, String restaurantEndpoint, String password, Date birthDate, String state) {
		this.foodchain = foodchain;
		this.fname = fname;
		this.lname = lname;
		this.email = email;
		this.restaurantName = restaurantName;
		this.restaurantAddress = restaurantAddress;
		this.latitude = latitude;
		this.longitude = longitude;
		this.restaurantEndpoint = restaurantEndpoint;
		this.password = password;
		this.birthDate = birthDate;
		this.state = state;
	}

	public Long getId() {
		return id;
	}

	public Foodchain getFoodchain() {
		return foodchain;
	}

	public String getFname() {
		return fname;
	}

	public String getLname() {
		return lname;
	}

	public String getEmail() {
		return email;
	}

	public String getRestaurantName() {
		return restaurantName;
	}

	public String getRestaurantAddress() {
		return restaurantAddress;
	}

	public double getLatitude() {
		return latitude;
	}

	public double getLongitude() {
		return longitude;
	}

	public String getRestaurantEndpoint() {
		return restaurantEndpoint;
	}

	public String getPassword() {
		return password;
	}

	public Date getBirthDate() {
		return birthDate;
	}

	public String getState() {
		return state;
	}

	public Long getManager() {
		return manager;
	}

	public void setFoodchain(Foodchain foodchain) {
		this.foodchain = foodchain;
	}

	public void setFname(String fname) {
		this.fname = fname;
	}

	public void setLname(String lname) {
		this.lname = lname;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setRestaurantName(String restaurantName) {
		this.restaurantName = restaurantName;
	}

	public void setRestaurantAddress(String restaurantAddress) {
		this.restaurantAddress = restaurantAddress;
	}

	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}

	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}

	public void setRestaurantEndpoint(String restaurantEndpoint) {
		this.restaurantEndpoint = restaurantEndpoint;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}

	public void setState(String state) {
		this.state = state;
	}

	public void setManager(Long manager) {
		this.manager = manager;
	}
}
