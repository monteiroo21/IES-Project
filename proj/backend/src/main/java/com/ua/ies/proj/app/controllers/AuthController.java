package com.ua.ies.proj.app.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ua.ies.proj.app.auth.JwtTokenProvider;
import com.ua.ies.proj.app.auth.LoginRequest;
import com.ua.ies.proj.app.models.ManagerForm;
import com.ua.ies.proj.app.models.UserInfo;
import com.ua.ies.proj.app.services.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v1/auth")
@Tag(name = "Auth", description = "Authentication operations")
public class AuthController {
    @Autowired
    private final UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    public AuthController(UserService userService) {
        this.userService = userService;

    }

    @Operation(summary = "Send a form to register as a manager")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Form sent",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = ManagerForm.class)
            )
        )
    })   
    @PostMapping("/form")
    public ResponseEntity<ManagerForm> addForm(@RequestBody ManagerForm form) {
        ManagerForm formAdd = userService.addForm(form);
        return new ResponseEntity<>(formAdd, HttpStatus.OK);
    }

    @Operation(summary = "Login", description = "Authenticates a user and returns a JWT token")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Login successful",
            content = @Content
        ),
        @ApiResponse(
            responseCode = "401",
            description = "Invalid email or password",
            content = @Content
        )
    })
    @PostMapping("/login")
    public ResponseEntity<String> authenticateUser(@RequestBody LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();
         try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password));
            
            String role = authentication.getAuthorities().iterator().next().getAuthority();
            String token = jwtTokenProvider.createToken(email, role);
            
            ResponseCookie cookie = ResponseCookie.from("jwt", token)
                    .httpOnly(true)
                    .secure(false)
                    .path("/")
                    .maxAge(24 * 60 * 60)
                    .sameSite("Strict")
                    .build();

            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, cookie.toString())
                    .body("Login successful");
        } catch (AuthenticationException e) {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }
    
    @Operation(summary = "Logout", description = "Clears the JWT cookie")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Logged out successfully",
            content = @Content
        )
    })
    @PostMapping("/logout")
    public ResponseEntity<String> logoutUser() {
        ResponseCookie cookie = ResponseCookie.from("jwt", "")
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(0)
                .sameSite("Strict")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body("Logged out successfully");
    }

    @Operation(summary = "Get user info", description = "Returns information about the authenticated/not authenticated user")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "User info found",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = UserInfo.class)
            )
        )
    })
    @GetMapping("/me")
    public ResponseEntity<UserInfo> getUserInfo(){
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserInfo userInfo = userService.getUserInfo(authentication);
            return new ResponseEntity<>(userInfo, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
}