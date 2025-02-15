package com.ua.ies.proj.app.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ua.ies.proj.app.models.Order;
import com.ua.ies.proj.app.models.OrderStatisticsDTO;
import com.ua.ies.proj.app.models.Restaurant;
import com.ua.ies.proj.app.models.User;
import com.ua.ies.proj.app.services.OrderService;
import com.ua.ies.proj.app.services.RestaurantsService;
import com.ua.ies.proj.app.services.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Restaurant", description = "Restaurant operations")
@RestController
@RequestMapping("/api/v1/restaurants")
public class RestaurantController {
    @Autowired
    private final OrderService orderService;

    @Autowired
    private final UserService userService;

    @Autowired
    private final RestaurantsService restaurantService;

    public RestaurantController(OrderService orderService, UserService userService, RestaurantsService restaurantService) {
        this.orderService = orderService;
        this.userService = userService;
        this.restaurantService = restaurantService;
    }

    // GET /api/v1/restaurants/{restaurant_id}/orders
    //      or
    // GET /api/v1/restaurants/{restaurant_id}/orders?status={status}
    // status = "to-do" or "in-progress" or "done"

    @Operation(summary = "Get orders of a restaurant")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200", 
            description = "Orders found",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = Order.class) 
            )
        )
    })
    @GetMapping("/{restaurant_id}/orders")
    public ResponseEntity<List<Order>> getRestaurantOrders(
        @Parameter(description = "ID of the restaurant to retrieve orders", example = "1")
        @PathVariable("restaurant_id") Long restaurant_id ,
        @Parameter(description = "Status of the orders to retrieve", example = "to-do")
        @RequestParam(required=false) String status) {
        List<Order> orders = orderService.getRestaurantOrders(restaurant_id, status);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @Operation(summary = "Get statistics of a restaurant", description = "If the user is the manager of the requested restaurant, it returns the statistics of all the menus. Otherwise, it returns the statistics of the top 3 menus.")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200", 
            description = "Statistics found",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = OrderStatisticsDTO.class) 
            )
        )
    })
    @GetMapping("/{restaurant_id}/orders/statistics")
    public ResponseEntity<Map<String, OrderStatisticsDTO>> getStatistics(@PathVariable(value = "restaurant_id") Long restaurantId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Map<String, OrderStatisticsDTO> stats;

        if (isManager(restaurantId, auth)) {
            stats = orderService.getStatisticsByRestaurantId(restaurantId, -1);
        } else {
            stats = orderService.getStatisticsByRestaurantId(restaurantId, 3);
        }
        return new ResponseEntity<>(stats, HttpStatus.OK);
    }

    private boolean isManager(Long restaurantId, Authentication auth) {
        String email = auth.getName();
        String role = auth.getAuthorities().iterator().next().getAuthority();

        try {
            User user = userService.getUserByEmail(email);
            Restaurant restaurant = restaurantService.getRestaurantById(restaurantId);
            return role.equals("MANAGER") && restaurant.getManager().getId().equals(user.getId());
        } catch (Exception e) {
            return false;
        }
    }
 
}