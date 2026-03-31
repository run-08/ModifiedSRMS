package com.example.demo.Model;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StudentEntity {

	private String sem;

	private String name;

     private Long registerNumber;
	private Map<String , Object> Student_mark_Details;
	@Override
	public String toString() {
		return "StudentEntity [sem=" + sem + ", name=" + name + ", registerNumber=" + registerNumber + ", Student_Details="
				+ Student_mark_Details + "]";
	}
}
