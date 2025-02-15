package com.ua.ies.proj.app.auth;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import jakarta.annotation.PostConstruct;

@Component
public class JwtTokenProvider {

    @Value("${JWT_KEY}")
    private String JWT_KEY;

    private SecretKey SECRET_KEY;

    private final long validityInMilliseconds = 86400000; // 24h

    @PostConstruct
    public void init() {
        SECRET_KEY = Keys.hmacShaKeyFor(JWT_KEY.getBytes());
    }

    public String createToken(String email, String user_type) {
        Claims claims = Jwts.claims().setSubject(email);
        claims.put("user_type", user_type);

        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMilliseconds);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            parseToken(token); 
            return true;
        } catch (SignatureException ex) {
            System.err.println("Invalid JWT signature: " + ex.getMessage());
        } catch (Exception ex) {
            System.err.println("JWT validation error: " + ex.getMessage());
        }
        return false;
    }

    public String getEmail(String token) {
        Claims claims = parseToken(token).getBody();
        return claims.getSubject();
    }

    public String getUserType(String token) {
        return parseToken(token).getBody().get("user_type", String.class);
    }

    private Jws<Claims> parseToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY) 
                .build()
                .parseClaimsJws(token);
    }
}

