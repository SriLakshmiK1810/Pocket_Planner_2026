package com.pocketplanner.service;

import com.pocketplanner.entity.Expense;
import com.pocketplanner.repository.ExpenseRepository;
import com.pocketplanner.repository.UserRepository;
import com.pocketplanner.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class ExpenseService {
    @Autowired
private OCRService ocrService;

    @Autowired
    private ExpenseRepository expenseRepository;

    
    @Autowired
private UserRepository userRepository;

public Expense addExpense(Expense expense, Long userId) {
    User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

    expense.setUser(user);
    return expenseRepository.save(expense);
}

    public List<Expense> getAllExpenses(Long userId) {
    return expenseRepository.findByUserId(userId);
}

    public Expense updateExpense(Long id, Expense updatedExpense) {

        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        expense.setTitle(updatedExpense.getTitle());
expense.setAmount(updatedExpense.getAmount());
expense.setCategory(updatedExpense.getCategory());
expense.setPaymentMode(updatedExpense.getPaymentMode());
expense.setExpenseType(updatedExpense.getExpenseType());
expense.setDate(updatedExpense.getDate());
        return expenseRepository.save(expense);
    }

    public void deleteExpense(Long id) {
        expenseRepository.deleteById(id);
    }

    public Map<String, Double> getCategorySummary(Long userId) {
    Map<String, Double> summary = new HashMap<>();

    for (Expense expense : expenseRepository.findByUserId(userId)) {
        summary.put(
            expense.getCategory(),
            summary.getOrDefault(expense.getCategory(), 0.0)
                + expense.getAmount()
        );
    }
    return summary;
}
public Double getTotalExpenses(Long userId) {
    return expenseRepository.getTotalExpensesByUserId(userId);
}


    public Map<String, Object> scanBill(MultipartFile file) {

        Map<String, Object> result = new HashMap<>();

        try {

            String text = ocrService.extractText(file);

            String merchant = "Unknown";
            String category = "Others";

            // Merchant
            String[] lines = text.split("\\r?\\n");

            for (String line : lines) {
                line = line.trim();
                if (!line.isEmpty() && line.length() > 3) {
                    merchant = line;
                    break;
                }
            }

            double amount = extractAmount(text);

            // Category
            String lower = text.toLowerCase();

            if (lower.contains("biryani")
                    || lower.contains("restaurant")
                    || lower.contains("coke")
                    || lower.contains("sprite")
                    || lower.contains("kebab")) {

                category = "Food";

            } else if (lower.contains("medical")
                    || lower.contains("tablet")
                    || lower.contains("pharmacy")) {

                category = "Medical";
            }

            result.put("title", merchant);
            result.put("merchantName", merchant);
            result.put("amount", amount);
            result.put("category", category);
            result.put("date", LocalDate.now().toString());
            result.put("ocrText", text);

        } catch (Exception e) {
            e.printStackTrace();
            result.put("title", "OCR Failed");
        }

        return result;
    }

    // 👇 THIS METHOD GOES HERE (outside scanBill)

    private double extractAmount(String text) {

    String[] lines = text.split("\\r?\\n");

    boolean billSection = false;
    double amount = 0;

    for (String line : lines) {

        line = line.trim();

        if (line.toLowerCase().contains("bill total")
                || line.toLowerCase().contains("bill total value")
                || line.toLowerCase().contains("bill amount")
                || line.toLowerCase().contains("net total")
                || line.toLowerCase().contains("grand total")) {

            billSection = true;
            continue;
        }

        if (billSection) {

            Matcher matcher =
                    Pattern.compile("\\d+\\.\\d{2}").matcher(line);

            while (matcher.find()) {

                double value = Double.parseDouble(matcher.group());

                if (value > amount) {
                    amount = value;
                }
            }
        }
    }

    return amount;
}

}