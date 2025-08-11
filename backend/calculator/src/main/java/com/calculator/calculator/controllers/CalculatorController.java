package com.calculator.calculator.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.calculator.calculator.services.CalculatorService;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.http.ResponseEntity;
import java.util.Map;

@RestController
public class CalculatorController {

    @Autowired
    private CalculatorService calculatorService;

    @PostMapping("/calculate")
    public ResponseEntity<Map<String, Object>> calculate(
            @RequestParam("num1") double n1,
            @RequestParam("num2") double n2,
            @RequestParam("operation") String operation) {

        try {
            double result;
            switch (operation) {
                case "add":
                    result = calculatorService.add(n1, n2);
                    break;
                case "sub":
                    result = calculatorService.subtract(n1, n2);
                    break;
                case "mul":
                    result = calculatorService.multiply(n1, n2);
                    break;
                case "div":
                    result = calculatorService.divide(n1, n2);
                    break;
                default:
                    return ResponseEntity.badRequest().body(Map.of("error", "Invalid operation"));
            }
            return ResponseEntity.ok(Map.of("result", result));
        } catch (ArithmeticException ex) {
            return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
        }
    }
}