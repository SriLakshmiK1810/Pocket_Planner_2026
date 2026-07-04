package com.pocketplanner.controller;

import com.pocketplanner.entity.Budget;
import com.pocketplanner.service.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/budgets")
public class BudgetController {

    @Autowired
    private BudgetService budgetService;

    @PostMapping
public Budget saveBudget(
        @RequestBody Budget budget,
        @RequestParam Long userId
) {
    return budgetService.saveBudget(budget, userId);
}
@GetMapping
public List<Budget> getBudgetHistory(@RequestParam Long userId) {
    return budgetService.getBudgetHistory(userId);
}
@GetMapping("/latest")
public Budget getLatestBudget(@RequestParam Long userId) {
    return budgetService.getLatestBudget(userId);
}
}