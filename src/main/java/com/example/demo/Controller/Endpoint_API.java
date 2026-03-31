package com.example.demo.Controller;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Model.StudentEntity;
import com.example.demo.Service.StudentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class Endpoint_API {


    private final StudentService studentService;
    @PostMapping("/storeMark")
    public ResponseEntity<Map<String,StudentEntity>> storeStudentsMark(@RequestBody StudentEntity studentEntity){

        return ResponseEntity.ok(studentService.saveStudentsMark(studentEntity));
    }

    @DeleteMapping("/deleteByRegisterNumber")
    public ResponseEntity<Map<String,String>> deleteByRegisterNumber(@RequestParam Long registerNumber){
        studentService.deleteStudentMarkById(registerNumber);
        Map<String,String> response = new HashMap<>();
        response.put("Success","Deleted Successfully!");
        return ResponseEntity.ok(response);
    }
 
    @GetMapping("/getMarkByRegisterNumber")
    public ResponseEntity<Map<String,Object>> getMarkByRegisterNumber(@RequestParam Long registerNumber){
        System.out.println(registerNumber);
        return ResponseEntity.ok(studentService.getStudentMarkByRegisterNumber(registerNumber));
    }

}
