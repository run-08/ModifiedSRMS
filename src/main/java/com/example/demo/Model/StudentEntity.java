package com.example.demo.Model;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection="StudentEntity")
public class StudentEntity {
    @Field(name="Sem")
    private String sem;
    @Field(name = "name")
    private String name;
    @Field(name="Registernumber")
    private Long registerNumber;
    private Map<String , Object> Student_mark_Details;
    @Override
    public String toString() {
        return "StudentEntity [sem=" + sem + ", name=" + name + ", registerNumber=" + registerNumber + ", Student_Details="
                + Student_mark_Details + "]";
    }
}
