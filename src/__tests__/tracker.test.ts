import { describe, test, expect } from "vitest";
import { generateExpenseReport } from "../expenseTracker";

describe("generateExpenseReport", () => {
  test("should generate a correct expense report", () => {
    const result = generateExpenseReport([50, 0, 120, 85], 100);
    expect(result.travelDays).toBe(4);
    expect(result.expenseDays).toBe(3);
    expect(result.dailyBudget).toBe(100);
    expect(result.averageDailyExpense).toBe(63.75);
    expect(result.underBudget).toBe(true);
    expect(result.rating).toBe(3);
    expect(result.feedback).toBe("Excellent!");
  });

  test("should throw an error when expenses contain non-numeric values", () => {
    expect(() => generateExpenseReport([50, NaN, 120, 85], 100)).toThrow(
      "Expenses contain non-numeric values",
    );
  });

  test("should throw an error when expenses are negative", () => {
    expect(() => generateExpenseReport([100, 89, -5, 50], 100)).toThrow(
      "Expenses cannot be negative",
    );
  });

  test("should throw an error when expenses array are empty", () => {
    expect(() => generateExpenseReport([], 100)).toThrow(
      "The expenses array cannot be empty",
    );
  });

  test("should return a 'Correct, but tight' feedback when slightly over budget", () => {
    const result = generateExpenseReport([100, 110, 120, 110], 100);
    expect(result.rating).toBe(2);
    expect(result.feedback).toBe("Correct, but tight");
  });

  test("should return a 'Can improve' feedback when way over budget", () => {
    const result = generateExpenseReport([150, 140, 130, 140], 100);
    expect(result.rating).toBe(1);
    expect(result.feedback).toBe("Can improve");
  });
});
