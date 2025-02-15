package com.ua.ies.proj.app.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ua.ies.proj.app.models.Foodchain;
import com.ua.ies.proj.app.models.ManagerForm;
import com.ua.ies.proj.app.models.Restaurant;
import com.ua.ies.proj.app.models.User;
import com.ua.ies.proj.app.models.UserInfo;
import com.ua.ies.proj.app.models.UserManager;
import com.ua.ies.proj.app.repos.ManagerFormRepository;
import com.ua.ies.proj.app.repos.RestaurantRepository;
import com.ua.ies.proj.app.repos.UserRepository;
import com.ua.ies.proj.app.services.OrderProcessingService.OrderProcessingService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class UserService {
    @Autowired
    private final OrderProcessingService orderProcessingService;

    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final ManagerFormRepository managerFormRepository;
    @Autowired
    private final RestaurantRepository restaurantRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, ManagerFormRepository managerFormRepository, RestaurantRepository restaurantRepository, OrderProcessingService orderProcessingService) {
        this.userRepository = userRepository;
        this.managerFormRepository = managerFormRepository;
        this.restaurantRepository = restaurantRepository;
        this.orderProcessingService = orderProcessingService;
    }

    public UserManager getManagerById(Long manager_id) {
        Optional<UserManager> optional_manager = userRepository.findManagerById(manager_id);
        return optional_manager.get();
    }

    public void deleteManager(Long manager_id) {
        Optional<Restaurant> restaurant = restaurantRepository.findByManagerId(manager_id);
        if (restaurant.isPresent()) {
            restaurant.get().setManager(null);
        }
        userRepository.deleteById(manager_id);
    }

    public UserManager updateManager(Long manager_id, UserManager manager) {
        manager.setId(manager_id);
        UserManager existingManager = userRepository.findManagerById(manager_id).get();
        existingManager.setFname(manager.getFname());
        existingManager.setLname(manager.getLname());
        existingManager.setEmail(manager.getEmail());
        existingManager.setPassword(manager.getPassword());
        existingManager.setBirthDate(manager.getBirthDate());
        UserManager updatedManager = userRepository.save(existingManager);
        
        ManagerForm form = managerFormRepository.findByManager(manager_id).get();
        if (form == null){
            throw new EntityNotFoundException("Form not found with manager_id: " + manager_id);
        }
        form.setFname(manager.getFname());
        form.setLname(manager.getLname());
        form.setEmail(manager.getEmail());
        form.setBirthDate(manager.getBirthDate());
        managerFormRepository.save(form);
        return updatedManager;
    }

    public ManagerForm updateForm(Long form_id, ManagerForm form){
        ManagerForm existingForm = managerFormRepository.findById(form_id).get();
        existingForm.setFname(form.getFname());
        existingForm.setLname(form.getLname());
        existingForm.setEmail(form.getEmail());
        existingForm.setPassword(form.getPassword());
        existingForm.setBirthDate(form.getBirthDate());
        existingForm.setRestaurantName(form.getRestaurantName());
        existingForm.setRestaurantAddress(form.getRestaurantAddress());
        existingForm.setLatitude(form.getLatitude());
        existingForm.setLongitude(form.getLongitude());
        existingForm.setFoodchain(form.getFoodchain());
        existingForm.setState(form.getState());
        ManagerForm updatedForm = managerFormRepository.save(existingForm);
        return updatedForm;
    }


    public ManagerForm addForm(ManagerForm form) {
        form.setState("pending");
        return managerFormRepository.save(form);
    }

    public List<ManagerForm> getForms(String state) {
        if (state != null) {
            return managerFormRepository.findByState(state);
        }
        return managerFormRepository.findAll();
    }

    public ManagerForm getFormById(Long form_id) {
        Optional<ManagerForm> form = managerFormRepository.findById(form_id);
        if (form.isPresent()) {
            return form.get();
        } else {
            throw new EntityNotFoundException("Form not found with id: " + form_id);
        }
    }

    public void approveForm(ManagerForm form) {

        UserManager manager = new UserManager();
        manager.setFname(form.getFname());
        manager.setLname(form.getLname());
        manager.setEmail(form.getEmail());
        manager.setPassword(passwordEncoder.encode(form.getPassword()));
        manager.setBirthDate(form.getBirthDate());
        userRepository.save(manager);

        Restaurant restaurant = restaurantRepository.findByTopic(form.getRestaurantEndpoint());
        if (restaurant != null) {
            restaurant.setManager(manager);
        }else{
            restaurant = new Restaurant();
            restaurant.setName(form.getRestaurantName());
            restaurant.setAddress(form.getRestaurantAddress());
            restaurant.setLatitude(form.getLatitude());
            restaurant.setLongitude(form.getLongitude());
            restaurant.setFoodchain(form.getFoodchain());
            restaurant.setManager(manager);
            restaurant.setTopic(form.getRestaurantEndpoint());
        }
        restaurantRepository.save(restaurant);
        orderProcessingService.createListenerForRestaurant(restaurant.getTopic(), "group-" + restaurant.getId());
        Long manager_id = manager.getId();
        form.setManager(manager_id);
        form.setState("accepted");
        managerFormRepository.save(form);
    }

    public User getUserByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        return user.get();
    } 

    public UserInfo getUserInfo(Authentication auth){
        String role = auth.getAuthorities().iterator().next().getAuthority();

        if (!role.equals("ADMIN") && !role.equals("MANAGER")){
            return new UserInfo();
        }

        String email = auth.getName();
        UserInfo userInfo = new UserInfo();
        
        Optional<User> user_opt = userRepository.findByEmail(email);
        if (!user_opt.isPresent()){
            throw new EntityNotFoundException("Invalid email or password");
        }
        User user = user_opt.get();
        userInfo.setFname(user.getFname());
        userInfo.setLname(user.getLname());
        userInfo.setRole(role);

        if (role.equals("MANAGER")){
            Optional<Restaurant> restaurant = restaurantRepository.findByManagerId(user.getId());
         
            if (!restaurant.isPresent()){
                return userInfo;
            }

            userInfo.setRestaurant_id(restaurant.get().getId());
            Foodchain foodchain = restaurant.get().getFoodchain();
            userInfo.setFoodchain_id(foodchain.getId());
        }
        return userInfo;
    }
}
