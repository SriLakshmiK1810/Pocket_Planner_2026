package com.pocketplanner.service;
import com.pocketplanner.dto.BudgetReportDTO;
import com.pocketplanner.entity.Budget;
import com.pocketplanner.entity.Expense;
import com.pocketplanner.repository.BudgetRepository;
import com.pocketplanner.repository.ExpenseRepository;
import com.pocketplanner.entity.User;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BudgetService {

    @Autowired
    private BudgetRepository budgetRepository;

    // Save every new budget
    public Budget saveBudget(Budget budget, Long userId) {
    User user = new User();
    user.setId(userId);
    budget.setUser(user);
    return budgetRepository.save(budget);
}

public Budget getLatestBudget(Long userId) {
    return budgetRepository.findTopByUserIdOrderByIdDesc(userId);
}
@Autowired
private ExpenseRepository expenseRepository;

public List<BudgetReportDTO> getReports(Long userId) {
    List<Budget> budgets =
            budgetRepository.findByUserIdOrderByStartDateDesc(userId);

    List<BudgetReportDTO> reports = new ArrayList<>();

    for (Budget budget : budgets) {
        double spent = expenseRepository
                .findByUserIdAndDateBetween(
                        userId, budget.getStartDate(), budget.getEndDate()
                )
                .stream()
                .mapToDouble(Expense::getAmount)
                .sum();

        double remaining = budget.getAmount() - spent;
        String status = spent > budget.getAmount() ? "Exceeded" : "Within Budget";
        String message = spent > budget.getAmount()
                ? "❌ You exceeded your budget by ₹" + (spent - budget.getAmount())
                : "✅ You stayed within your budget and saved ₹" + remaining;

        reports.add(new BudgetReportDTO(
                budget.getPeriod() + " (" + budget.getStartDate()
                        + " - " + budget.getEndDate() + ")",
                budget.getAmount(), spent, remaining, status, message
        ));
    }
    return reports;

}
public List<Budget> getBudgetHistory(Long userId) {
    return budgetRepository.findByUserIdOrderByIdDesc(userId);
}

}