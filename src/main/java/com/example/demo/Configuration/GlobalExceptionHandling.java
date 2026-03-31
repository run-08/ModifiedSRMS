package com.example.demo.Configuration;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.example.demo.Exception.RegisterNumberNotFoundedException;

@ControllerAdvice
public class GlobalExceptionHandling {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String,String>> hadnleAllErrors(Exception ex){
        System.out.println("Hello!");
        Map<String,String> map = new HashMap<>();
        map.put("Occurred at: ", LocalDateTime.now().toString());
        map.put("Error: ",ex.getMessage());
        map.put("status: ",String.valueOf(500));
        return ResponseEntity.internalServerError().body(map);
    }
    @ExceptionHandler(RegisterNumberNotFoundedException.class)
    public ResponseEntity<Map<String,String>> handleRegisterNumberNotFounded(RegisterNumberNotFoundedException ex){
        Map<String,String> map = new HashMap<>();
        map.put("Occurred at: ", LocalDateTime.now().toString());
        map.put("Error: ",ex.getMessage());
        map.put("status: ",String.valueOf(500));
        return ResponseEntity.internalServerError().body(map);
    }

}
