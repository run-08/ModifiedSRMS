package com.example.demo.Exception;

public class RegisterNumberNotFoundedException extends RuntimeException {

    public RegisterNumberNotFoundedException(Long RegisterNumber){
        super(RegisterNumber+" not founded in DB, store first and delete!");
    }
}
