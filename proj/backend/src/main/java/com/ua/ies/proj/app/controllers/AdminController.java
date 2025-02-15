package com.ua.ies.proj.app.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ua.ies.proj.app.models.ManagerForm;
import com.ua.ies.proj.app.models.UserManager;
import com.ua.ies.proj.app.services.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/api/v1/admin")
@Tag(name = "Admin", description = "Admin operations")
public class AdminController {
    private final UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @Operation(summary = "Get a manager by ID")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Manager found",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = UserManager.class)
            )
        ),
        @ApiResponse(
            responseCode = "403",
            description = "Forbidden",
            content = @Content
        )
    })
    @GetMapping("/managers/{manager_id}")
    public ResponseEntity<UserManager> getManagerById(
        @Parameter(description = "ID of the manager to retrieve", example = "1")
        @PathVariable("manager_id") Long manager_id) {
        UserManager manager = userService.getManagerById(manager_id);
        return new ResponseEntity<>(manager, HttpStatus.OK);
    }
    
    @Operation(summary = "Delete a manager by ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Manager successfully deleted"),
        @ApiResponse(
            responseCode = "403",
            description = "Forbidden",
            content = @Content
        ) 
    })
    @DeleteMapping("/managers/{manager_id}")
    public ResponseEntity<String> deleteManager(
        @Parameter(description = "ID of the manager to delete", example = "1")
        @PathVariable("manager_id") Long manager_id) {
        userService.deleteManager(manager_id);
        return new ResponseEntity<>("Manager deleted sucessfully", HttpStatus.OK);
    }


    @Operation(summary = "Update a manager's information")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Manager successfully updated",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = UserManager.class)
            )
        ),
        @ApiResponse(
            responseCode = "403",
            description = "Forbidden",
            content = @Content
        )
    })
    @PutMapping("/managers/{manager_id}")
    public ResponseEntity<UserManager> updateManager(
        @Parameter(description = "ID of the manager to update", example = "1")
        @PathVariable("manager_id") Long manager_id,
        @io.swagger.v3.oas.annotations.parameters.RequestBody(
            description = "Updated manager object",
            required = true,
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = UserManager.class)
            )
        ) @RequestBody UserManager manager) {
        UserManager managerUpdated = userService.updateManager(manager_id, manager);
        return new ResponseEntity<>(managerUpdated, HttpStatus.OK);
    }

    @Operation(summary = "Approve a manager request form")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Manager approved",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = String.class)
            )
        ),
        @ApiResponse(
            responseCode = "403",
            description = "Forbidden",
            content = @Content
        )
    })
    @PostMapping("/managers")
    public ResponseEntity<String> approveForm(
        @io.swagger.v3.oas.annotations.parameters.RequestBody(
            description = "Manager form to approve",
            required = true,
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = ManagerForm.class)
            )
        )
        @RequestBody ManagerForm form) {
        userService.approveForm(form);
        return ResponseEntity.ok("Manager and restaurant created successfully");
    }

    // GET /api/v1/admin/forms
    //      or
    // GET /api/v1/admin/forms?state={state} (accepted, declined, pending, deleted)
    @Operation(summary = "Get all manager registration requests")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Forms found",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = ManagerForm.class)
            )
        ),
        @ApiResponse(
            responseCode = "403",
            description = "Forbidden",
            content = @Content
        )
    })
    @GetMapping("/forms")
    public ResponseEntity<List<ManagerForm>> getForms(
        @Parameter(description = "Filter forms by state", example = "pending")
        @RequestParam(required = false) String state) {
        List<ManagerForm> forms = userService.getForms(state);
        return new ResponseEntity<>(forms, HttpStatus.OK);
    }

    @Operation(summary = "Get a manager registration request by ID")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Form found",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = ManagerForm.class)
            )
        ),
        @ApiResponse(
            responseCode = "403",
            description = "Forbidden",
            content = @Content
        )
    })
    @GetMapping("/forms/{form_id}")
    public ResponseEntity<ManagerForm> getFormById(
        @Parameter(description = "ID of the form to retrieve", example = "1")
        @PathVariable("form_id") Long form_id) {
        try {
            ManagerForm form = userService.getFormById(form_id);
            return new ResponseEntity<>(form, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Operation(summary = "Change a manager registration request by ID")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Form successfully updated",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = ManagerForm.class)
            )
        ),
        @ApiResponse(
            responseCode = "403",
            description = "Forbidden",
            content = @Content
        )
    })
    @PutMapping("/forms/{form_id}")
    public ResponseEntity<ManagerForm> updateForm(
        @Parameter(description = "ID of the form to update", example = "1")
        @PathVariable("form_id") Long form_id, 
        @io.swagger.v3.oas.annotations.parameters.RequestBody(
            description = "Updated form object",
            required = true,
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = ManagerForm.class)
            )
        )
        @RequestBody ManagerForm form) {
        ManagerForm formUpdated = userService.updateForm(form_id, form);
        return new ResponseEntity<>(formUpdated, HttpStatus.OK);
    }
}
