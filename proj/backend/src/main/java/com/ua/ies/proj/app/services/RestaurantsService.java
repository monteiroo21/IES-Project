package com.ua.ies.proj.app.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ua.ies.proj.app.models.Foodchain;
import com.ua.ies.proj.app.models.Menu;
import com.ua.ies.proj.app.models.Restaurant;
import com.ua.ies.proj.app.repos.FoodchainRepository;
import com.ua.ies.proj.app.repos.MenuRepository;
import com.ua.ies.proj.app.repos.RestaurantRepository;

@Service
public class RestaurantsService {
    @Autowired
    private final RestaurantRepository restaurantRepository;

    @Autowired
    private final FoodchainRepository foodchainRepository;

    @Autowired
    private final MenuRepository menuRepository;

    public RestaurantsService(RestaurantRepository restaurantRepository, FoodchainRepository foodchainRepository, MenuRepository menuRepository) {
        this.restaurantRepository = restaurantRepository;
        this.foodchainRepository = foodchainRepository;
        this.menuRepository = menuRepository;
    }

    public List<Foodchain> getFoodchains() {
        return foodchainRepository.findAll();
    }

    public List<Restaurant> getRestaurantsFromChain(Long chainId) {
        return restaurantRepository.findByFoodchainId(chainId);
    }

    public Restaurant getRestaurantFromChainById(Long chainId, Long restId) {
        Optional<Restaurant> optionalRes = restaurantRepository.findById(restId);
        Restaurant res = optionalRes.get();

        if (!res.getFoodchain().getId().equals(chainId)) {
            return null;
        }
        return res;
    }

    public List<Menu> getMenusByChain(Long chainId) {
        return menuRepository.findByFoodchainId(chainId);
    }

    public Restaurant getRestaurantById(Long restId) {
        Optional<Restaurant> optionalRes = restaurantRepository.findById(restId);
        return optionalRes.get();
    }
   
}
