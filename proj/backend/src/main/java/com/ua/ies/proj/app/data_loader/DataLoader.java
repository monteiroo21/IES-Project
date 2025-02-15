package com.ua.ies.proj.app.data_loader;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.ua.ies.proj.app.models.Foodchain;
import com.ua.ies.proj.app.models.ManagerForm;
import com.ua.ies.proj.app.models.Restaurant;
import com.ua.ies.proj.app.models.UserAdmin;
import com.ua.ies.proj.app.models.UserManager;
import com.ua.ies.proj.app.repos.FoodchainRepository;
import com.ua.ies.proj.app.repos.ManagerFormRepository;
import com.ua.ies.proj.app.repos.RestaurantRepository;
import com.ua.ies.proj.app.repos.UserRepository;

@Component
public class DataLoader implements CommandLineRunner {
    private final UserRepository userRepository;

    private final RestaurantRepository restaurantRepository;

    private final FoodchainRepository foodchainRepository;

    private final ManagerFormRepository managerFormRepository;


    public DataLoader(UserRepository userRepository, RestaurantRepository restaurantRepository,
            FoodchainRepository foodchainRepository, ManagerFormRepository managerFormRepository) {
        this.userRepository = userRepository;
        this.restaurantRepository = restaurantRepository;
        this.foodchainRepository = foodchainRepository;
        this.managerFormRepository = managerFormRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        Foodchain mcDonalds = new Foodchain("McDonald's", "Burgers",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRjLWhWpx9PfbzysffLbMA_DK_8jawJAVHbw&s");
        Foodchain burgerKing = new Foodchain("Burger King", "Burgers",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-mwH8D7nmaq8OOj_A5qI4qh4LnXhuJtN5vQ&s");
        Foodchain kfc = new Foodchain("KFC", "Fried Chicken", "https://kfcmenu.net/menu/8-pc-chicken-only.png");
        Foodchain pizzaHut = new Foodchain("Pizza Hut", "Pizza",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1vu-wXOPKyXEU51U_QKbHMCfwugN3ExAI_A&s");
        Foodchain tacoBell = new Foodchain("Taco Bell", "Mexican Food",
                "https://cdn.freebiesupply.com/images/thumbs/2x/taco-bell-logo.png");
        Foodchain dominos = new Foodchain("Domino's Pizza", "Pizza",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5s9iRJd6qbAblgaIm2z0Nh0bTPnNYUJEkVg&s");
        Foodchain telepizza = new Foodchain("Telepizza", "Pizza",
                "https://play-lh.googleusercontent.com/FCjnJiBLP8BK_rbybv2mbmdlA5cLyJQu9KoXgPb0g3d0T3Z_crLfKJokzmCt5MvlxLa5");

        if (!foodchainRepository.findByName("McDonald's").isPresent()) {
            foodchainRepository.save(mcDonalds);
        }

        if (!foodchainRepository.findByName("Burger King").isPresent()) {
            foodchainRepository.save(burgerKing);
        }

        if (!foodchainRepository.findByName("KFC").isPresent()) {
            foodchainRepository.save(kfc);
        }

        if (!foodchainRepository.findByName("Pizza Hut").isPresent()) {
            foodchainRepository.save(pizzaHut);
        }

        if (!foodchainRepository.findByName("Taco Bell").isPresent()) {
            foodchainRepository.save(tacoBell);
        }

        if (!foodchainRepository.findByName("Domino's Pizza").isPresent()) {
            foodchainRepository.save(dominos);
        }

        if (!foodchainRepository.findByName("Telepizza").isPresent()) {
            foodchainRepository.save(telepizza);
        }
        
        UserAdmin alice = new UserAdmin("Alice", "Green", "alice@gmail.com",
                "$2b$12$vPaBgZDcvj1fbOB7tX3MH.5.IYVjgRo8IMaO0XH8MG8qTVvdBGCEq", null);
        UserManager userBob = new UserManager("Bob", "Brown", "bob@gmail.com",
                "$2b$12$vPaBgZDcvj1fbOB7tX3MH.5.IYVjgRo8IMaO0XH8MG8qTVvdBGCEq", null);
        UserManager userCharlie = new UserManager("Charlie", "Smith", "charlie@gmail.com",
                "$2b$12$vPaBgZDcvj1fbOB7tX3MH.5.IYVjgRo8IMaO0XH8MG8qTVvdBGCEq", null);
        UserManager userDiana = new UserManager("Diana", "Jones", "diana@gmail.com",
                "$2b$12$vPaBgZDcvj1fbOB7tX3MH.5.IYVjgRo8IMaO0XH8MG8qTVvdBGCEq", null);
        UserManager userEve = new UserManager("Eve", "Williams", "eve@gmail.com",
                "$2b$12$vPaBgZDcvj1fbOB7tX3MH.5.IYVjgRo8IMaO0XH8MG8qTVvdBGCEq", null);
        UserManager userJohn = new UserManager("John", "Brady", "john@gmail.com",
                "$2b$12$vPaBgZDcvj1fbOB7tX3MH.5.IYVjgRo8IMaO0XH8MG8qTVvdBGCEq", null);

        if (!userRepository.findByEmail("alice@gmail.com").isPresent()) {
            userRepository.save(alice);
        }
        
        if (!userRepository.findByEmail("bob@gmail.com").isPresent() && !managerFormRepository.findByEmail("bob@gmail.com").isPresent()) {
            userRepository.save(userBob);
        }

        if (!userRepository.findByEmail("charlie@gmail.com").isPresent() && !managerFormRepository.findByEmail("charlie@gmail.com").isPresent()) {
            userRepository.save(userCharlie);
        }

        if (!userRepository.findByEmail("diana@gmail.com").isPresent() && !managerFormRepository.findByEmail("diana@gmail.com").isPresent()) {
            userRepository.save(userDiana);
        }

        if (!userRepository.findByEmail("eve@gmail.com").isPresent() && !managerFormRepository.findByEmail("eve@gmail.com").isPresent()) {
            userRepository.save(userEve);
        }

        if (!userRepository.findByEmail("john@gmail.com").isPresent() && !managerFormRepository.findByEmail("john@gmail.com").isPresent()) {
            userRepository.save(userJohn);
        }

        ManagerForm bob = new ManagerForm(mcDonalds, "Bob", "Brown", "bob@gmail.com", "McDonald's Pingo Doce",
                "Rua Feira Hipermercados, 3800-000 Aveiro", 40.638333, -8.653679, "McDonald1", "123456789", null,
                "accepted");
        ManagerForm charlie = new ManagerForm(mcDonalds, "Charlie", "Smith", "charlie@gmail.com",
                "McDonald''s Universidade", "Rua das Pombas, 3810-150 Aveiro", 40.643154, -8.650535, "McDonald2",
                "123456789", null, "accepted");
        ManagerForm diana = new ManagerForm(burgerKing, "Diana", "Jones", "diana@gmail.com", "Burger King Forum",
                "Forum Aveiro, 3800-000 Aveiro", 40.205641, -8.419551, "Burger3", "123456789", null, "accepted");
        ManagerForm eve = new ManagerForm(burgerKing, "Eve", "Williams", "eve@gmail.com", "Burger King Glicínias",
                "Av. Dr. Lourenço Peixinho, 3800-000 Aveiro", 40.6519812362783, -8.620476728835527, "Burger4",
                "123456789", null, "accepted");
        ManagerForm john = new ManagerForm(kfc, "John", "Brady", "john@gmail.com", "KFC Centro",
                "Rua de Coimbra, 3000-000 Coimbra", 40.63260134516651, -8.649728523856686, "KFC5", "123456789", null,
                "accepted");

        if (!managerFormRepository.findByEmail("bob@gmail.com").isPresent()) {
            bob.setManager(userBob.getId());
            managerFormRepository.save(bob);
        }

        if (!managerFormRepository.findByEmail("charlie@gmail.com").isPresent()) {
            charlie.setManager(userCharlie.getId());
            managerFormRepository.save(charlie);
        }

        if (!managerFormRepository.findByEmail("diana@gmail.com").isPresent()) {
            diana.setManager(userDiana.getId());
            managerFormRepository.save(diana);
        }

        if (!managerFormRepository.findByEmail("eve@gmail.com").isPresent()) {
            eve.setManager(userEve.getId());
            managerFormRepository.save(eve);
        }

        if (!managerFormRepository.findByEmail("john@gmail.com").isPresent()) {
            john.setManager(userJohn.getId());
            managerFormRepository.save(john);
        }

        Restaurant restaurant1 = new Restaurant("McDonald's Pingo Doce", "Rua Feira Hipermercados, 3800-000 Aveiro",
                40.6519812362783, -8.620476728835527, mcDonalds, userBob, "McDonald1");
        Restaurant restaurant2 = new Restaurant("McDonald's Universidade", "Rua das Pombas, 3810-150 Aveiro",
                40.63260134516651, -8.649728523856686, mcDonalds, userCharlie, "McDonald2");
        Restaurant restaurant3 = new Restaurant("Burger King Forum", "Forum Aveiro, 3800-000 Aveiro", 40.638333,
                -8.653679, burgerKing, userDiana, "Burger3");
        Restaurant restaurant4 = new Restaurant("Burger King Glicínias", "Av. Dr. Lourenço Peixinho, 3800-000 Aveiro",
                40.643154, -8.650535, burgerKing, userEve, "Burger4");
        Restaurant restaurant5 = new Restaurant("KFC Centro", "Rua de Coimbra, 3000-000 Coimbra", 40.205641, -8.419551,
                kfc, userJohn, "KFC5");

        if (!restaurantRepository.findByName("McDonald's Pingo Doce").isPresent()) {
            restaurantRepository.save(restaurant1);
        }

        if (!restaurantRepository.findByName("McDonald's Universidade").isPresent()) {
            restaurantRepository.save(restaurant2);
        }

        if (!restaurantRepository.findByName("Burger King Forum").isPresent()) {
            restaurantRepository.save(restaurant3);
        }

        if (!restaurantRepository.findByName("Burger King Glicínias").isPresent()) {
            restaurantRepository.save(restaurant4);
        }

        if (!restaurantRepository.findByName("KFC Centro").isPresent()) {
            restaurantRepository.save(restaurant5);
        }

    }
}
