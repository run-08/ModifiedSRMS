package com.example.demo.Controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.FeignServices.DBservice;
import com.example.demo.Service.StaffAuthenticateService;
import com.example.demo.Service.StaffEntity;
import com.example.demo.Service.StudentService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = 	"*")
@RestController
@RequiredArgsConstructor
public class End_pointController {

	private final StudentService studentService;
	private final DBservice dBservice;
	private final StaffAuthenticateService staffAuthenticateService;
    private final Argon2PasswordEncoder argon2PasswordEncoder;

	@ResponseBody
	@PostMapping("/staffLogin")
	public ResponseEntity<String> staffLogin(@RequestBody StaffEntity staffEntity){
		staffEntity.setPassword(argon2PasswordEncoder.encode(staffEntity.getPassword()));
        staffAuthenticateService.addUser(staffEntity);
		return ResponseEntity.ok("Staff Details stored!");
	}
	@ResponseBody
	@PostMapping("/saveMark")
	public Map<String,String> saveMark(@RequestBody Map<String , Object>  reqobject){
			Map<String,String> response = new HashMap<>();
			response.put("success","demo");
			studentService.storeMark(reqobject);
			return response;
	}
	@ResponseBody
	@DeleteMapping("/deleteStudentMarkByRegisterNumber")
	public ResponseEntity<Map<String, String>> deleteStudentMarkByRegisterNumber(@RequestParam Long registerNumber){
		System.out.println(registerNumber);
		return dBservice.deleteByRegisterNumber(registerNumber);
	}
	@ResponseBody
	@GetMapping("/getStudentMarkById")
	public ResponseEntity<Map<String,Object>> getStudentMarkById(@RequestParam Long registerNumber ){
		System.out.println(registerNumber);
        ResponseEntity<Map<String,Object>> response = dBservice.getMarkByRegisterNumber(registerNumber);
		System.out.println(response.getBody());
		return response;
	}

//	@ResponseBody
//	@GetMapping("/getresult/{Registernumber}")
//	public Map<String , Object> getresult (@PathVariable("Registernumber") Long id){
//		if(repo.findByRegisterNumber(id) == null) {
//			return null;
//		}
//		StudentEntity student = repo.findByRegisterNumber(id);
//	    Map<String , Object> response = student.getStudent_mark_Details();
//	    response.put("name",student.getName());
//	    response.put("registernumber", id);
//	    response.put("sem",student.getSem());
//		return student.getStudent_mark_Details();
//	}
}
