package com.pocketplanner.repository;

import com.pocketplanner.entity.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface BudgetRepository extends JpaRepository<Budget, Long> {
List<Budget> findByUserIdOrderByIdDesc(Long userId);
    Budget findTopByUserIdOrderByIdDesc(Long userId);

List<Budget> findByUserIdOrderByStartDateDesc(Long userId);

Optional<Budget> findFirstByUserIdAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
        Long userId,
        LocalDate startDate,
        LocalDate endDate
);
}