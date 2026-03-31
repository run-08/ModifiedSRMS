
package com.example.demo.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Service.StaffEntity;

@Repository
public interface StaffRepo extends MongoRepository<StaffEntity,String>{

    
} 