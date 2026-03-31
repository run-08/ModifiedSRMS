package com.example.demo.Service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.example.demo.Exception.RegisterNumberNotFoundedException;
import com.example.demo.Model.StudentEntity;
import com.example.demo.Repo.StudentsMarkRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentsMarkRepo studentsMarkRepo;
    public Map<String, StudentEntity> saveStudentsMark(StudentEntity student){
        Map<String,StudentEntity> response = new HashMap<>();
        StudentEntity studentEntity = studentsMarkRepo.save(student);
        response.put("Success",studentEntity);
        return  response;
    }

    public boolean deleteStudentMarkById (Long registerNumber){
        if(!isRegisterNumberExists(registerNumber)) throw new RegisterNumberNotFoundedException(registerNumber);
        System.out.println("Deleting...");
        studentsMarkRepo.deleteByRegisterNumber(registerNumber);
        return true;
    }

    public boolean isRegisterNumberExists(Long registerNumber){
           boolean flag = studentsMarkRepo.findByRegisterNumber(registerNumber).isPresent();
        System.out.println(flag);
           return flag;
    }

    public Map<String,Object> getStudentMarkByRegisterNumber(long RegisterNumber){
        StudentEntity studentEntity  = studentsMarkRepo.findByRegisterNumber(RegisterNumber).get();
        Map<String,Object> response = new HashMap<>();
        response.put("name",studentEntity.getName());
        response.put("sem",studentEntity.getSem());
        response.put("registernumber",studentEntity.getRegisterNumber());
        response.put("student",studentEntity.getStudent_mark_Details());
        return response;
    }
}
