package com.ua.ies.proj.app.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ua.ies.proj.app.models.Foodchain;
import com.ua.ies.proj.app.models.Menu;
import com.ua.ies.proj.app.models.OrderStatisticsDTO;
import com.ua.ies.proj.app.models.Restaurant;
import com.ua.ies.proj.app.services.OrderService;
import com.ua.ies.proj.app.services.RestaurantsService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v1/foodchains")
@Tag(name = "Foodchain", description = "Foodchain operations")
public class FoodChainController {
    @Autowired
    private final RestaurantsService restaurantsService;

    @Autowired
    private final OrderService orderService;

    public FoodChainController(RestaurantsService restaurantsService, OrderService orderService) {
        this.restaurantsService = restaurantsService;
        this.orderService = orderService;
    }

    @Operation(summary = "Get all foodchains")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Foodchains found",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = Foodchain.class)
            )
        )
    })
    @GetMapping("/")
    public ResponseEntity<List<Foodchain>> getFoodchains() {
        List<Foodchain> foodchains = restaurantsService.getFoodchains();
        return new ResponseEntity<>(foodchains, HttpStatus.OK);
    }

    @Operation(summary = "Get the restaurants of a foodchain by ID")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Restaurants found",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = Restaurant.class)
            )
        )
    })
    @GetMapping("/{foodchain_id}/restaurants")
    public ResponseEntity<List<Restaurant>> getRestaurantsFromChain(
        @Parameter(description = "ID of the foodchain to retrieve restaurants", example = "1")
        @PathVariable(value = "foodchain_id") Long chainId) {
        List<Restaurant> restaurants = restaurantsService.getRestaurantsFromChain(chainId);
        return new ResponseEntity<>(restaurants, HttpStatus.OK);
    }

    @Operation(summary = "Get a restaurant of a foodchain by ID")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Restaurant found",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = Restaurant.class)
            )
        )
    })
    @GetMapping("/{foodchain_id}/restaurants/{restaurant_id}")
    public ResponseEntity<Restaurant> getRestaurantFromChainById(
        @Parameter(description = "ID of the foodchain to retrieve the restaurant", example = "1")
        @PathVariable(value = "foodchain_id") Long chainId, 
        @Parameter(description = "ID of the restaurant to retrieve", example = "1")
        @PathVariable(value = "restaurant_id") Long restId) {
        Restaurant res = restaurantsService.getRestaurantFromChainById(chainId, restId);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @Operation(summary = "Get the menus of a foodchain by ID")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Menus found",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = Menu.class)
            )
        )
    })
    @GetMapping("/{foodchain_id}/menus")
    public ResponseEntity<List<Menu>> getMenusByChain(
        @Parameter(description = "ID of the foodchain to retrieve menus", example = "1")
        @PathVariable(value = "foodchain_id") Long chainId) {
        List<Menu> menus = restaurantsService.getMenusByChain(chainId);
        return new ResponseEntity<>(menus, HttpStatus.OK);
    }

    @Operation(summary = "Get the order statistics of the foodchains")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Menu found",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = OrderStatisticsDTO.class)
            )
        )
    })
    @GetMapping("/orders/statistics")
    public ResponseEntity<Map<String, OrderStatisticsDTO>> getStatistics() {
        Map<String, OrderStatisticsDTO> stats = orderService.getAllStatistics();
        return new ResponseEntity<>(stats, HttpStatus.OK);
    }

    @Operation(summary = "Get the menu statistics of the foodchains")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Menu found",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = Menu.class)
            )
        )
    })
    @GetMapping("/menus/statistics")
    public ResponseEntity<List<Menu>> getMenuStatistics() {
        List<Menu> stats = orderService.getMenuStatistics();
        return new ResponseEntity<>(stats, HttpStatus.OK);
    }

    @Operation(summary = "Get the order statistics of a foodchain by ID")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Menu found",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = OrderStatisticsDTO.class)
            )
        )
    })
    @GetMapping("/{foodchain_id}/orders/statistics")
    public ResponseEntity<Map<String, OrderStatisticsDTO>> getStatistics(
        @Parameter(description = "ID of the foodchain to retrieve statistics", example = "1")
        @PathVariable(value = "foodchain_id") Long chainId) {
        Map<String, OrderStatisticsDTO> stats = orderService.getStatisticsByChainId(chainId);
        return new ResponseEntity<>(stats, HttpStatus.OK);
    }
}
