import { describe, test, expect } from "vitest";
import { calculateBudgetStatus } from "../budgetCalculator";

describe("calculateBudgetStatus", () => {
  test("should return 'Under budget ✈️' when expenses are less than 80% of budget", () => {
    const result = calculateBudgetStatus(700, 1000);
    expect(result).toBe("Under budget ✈️");
  });

  test("should return 'Within budget ✅' when expenses are between 80% and 100% of budget", () => {
    const result = calculateBudgetStatus(850, 1000);
    expect(result).toBe("Within budget ✅");
  });

  test("should return 'Over budget ⚠️' when expenses exceed budget", () => {
    const result = calculateBudgetStatus(1200, 1000);
    expect(result).toBe("Over budget ⚠️");
  });

  test("should throw an error when budget is negative", () => {
    expect(() => calculateBudgetStatus(800, -30)).toThrow(
      "Budget must be greater than 0", 
    );
  });

    test("should throw an error when expenses are negative", () => {
    expect(() => calculateBudgetStatus(-850, 1000)).toThrow(
      "Expenses cannot be negative",
    );
  });
});
