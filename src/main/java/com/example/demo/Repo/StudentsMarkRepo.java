package com.example.demo.Repo;

import com.example.demo.Model.StudentEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentsMarkRepo extends MongoRepository<StudentEntity,Long> {

    Optional<StudentEntity> findByRegisterNumber(Long registerNumber);

    void deleteByRegisterNumber(Long registerNumber);
}
