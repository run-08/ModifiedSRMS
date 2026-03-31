package com.example.demo.Configuration;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandling {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String,String>> handleAllErrors(Exception ex){
       Map<String,String> map  = new HashMap<>();
       map.put("occurred at:", LocalDateTime.now().toString());
       map.put("status-: ","500");
       map.put("error: ", ex.getMessage());
       return ResponseEntity.internalServerError().body(map);
    }
}
