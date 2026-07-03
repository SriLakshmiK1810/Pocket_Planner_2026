package com.pocketplanner.controller;

import com.pocketplanner.entity.Expense;
import com.pocketplanner.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.time.LocalDate;


@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    @PostMapping
    public Expense addExpense(@RequestBody Expense expense) {
        return expenseService.addExpense(expense);
    }

   @GetMapping
public List<Expense> getAllExpenses(@RequestParam Long userId) {
    return expenseService.getAllExpenses(userId);
}

@GetMapping("/category-summary")
public Map<String, Double> getCategorySummary(@RequestParam Long userId) {
    return expenseService.getCategorySummary(userId);
}

@GetMapping("/total")
public Double getTotalExpenses(@RequestParam Long userId) {
    return expenseService.getTotalExpenses(userId);
}

    @PutMapping("/{id}")
    public Expense updateExpense(@PathVariable Long id,
                                 @RequestBody Expense expense) {
        return expenseService.updateExpense(id, expense);
    }

    @DeleteMapping("/{id}")
    public String deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
        return "Expense deleted successfully";
    }
   @PostMapping("/scan")
public ResponseEntity<Map<String, Object>> scanBill(
        @RequestParam("file") MultipartFile file) {

    System.out.println("===== SCAN ENDPOINT HIT =====");

    Map<String, Object> result = expenseService.scanBill(file);

    return ResponseEntity.ok(result);
}


}