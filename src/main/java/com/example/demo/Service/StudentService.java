package com.example.demo.Service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.example.demo.FeignServices.DBservice;
import com.example.demo.Model.StudentEntity;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final DBservice dBservice;

    public Map<String, Object> storeMark(Map<String,Object> studentDetails){
      
           String name = studentDetails.get("name").toString();
           String semester = studentDetails.get("sem").toString();
           Long registerNumber = Long.parseLong(studentDetails.get("registernumber").toString());
           Map<String,Object> student_Mark = (Map<String, Object>) studentDetails.get("student");
           StudentEntity studentEntity = StudentEntity
                   .builder()
                   .sem(semester)
                   .Student_mark_Details(student_Mark)
                   .name(name)
                   .registerNumber(registerNumber)
                   .build();
                
           dBservice.storeStudentsMark(studentEntity);   
       
        return new HashMap<>();
    }
}
