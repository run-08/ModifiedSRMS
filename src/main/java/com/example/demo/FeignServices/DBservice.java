package com.example.demo.FeignServices;

import java.util.Map;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.Model.StudentEntity;


@FeignClient(name="DatabaseService",url="https://arun-dbservice.onrender.com/")
public interface DBservice {

     @GetMapping("/sayHello")
    public void sayHello();

    @PostMapping("/storeMark")
    public ResponseEntity<Map<String, StudentEntity>> storeStudentsMark(@RequestBody StudentEntity studentEntity);

    @DeleteMapping("/deleteByRegisterNumber")
    public ResponseEntity<Map<String, String>> deleteByRegisterNumber(@RequestParam Long registerNumber);

    @GetMapping("/getMarkByRegisterNumber")
    public ResponseEntity<Map<String,Object>> getMarkByRegisterNumber(@RequestParam Long registerNumber);
}
