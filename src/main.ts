import { generateExpenseReport } from "./expenseTracker";
import type { ExpenseReport } from "./expenseTracker";
import { calculateBudgetStatus } from "./budgetCalculator";
import type { BudgetStatus } from "./budgetCalculator";

// ---- BUDGET CALCULATOR ----
const budgetForm = document.getElementById("budget-form") as HTMLFormElement;
const totalExpensesInput = document.getElementById(
  "total-expenses",
) as HTMLInputElement;
const budgetInput = document.getElementById("budget") as HTMLInputElement;
const budgetResult = document.getElementById("budget-result") as HTMLDivElement;

budgetForm.addEventListener("submit", (e) => {
  e.preventDefault();

  try {
    const totalExpenses = Number(totalExpensesInput.value);
    const budget = Number(budgetInput.value);

    if (isNaN(totalExpenses) || isNaN(budget)) {
      throw new Error("Values must be numbers");
    }

    const status: BudgetStatus = calculateBudgetStatus(totalExpenses, budget);
    budgetResult.innerHTML = `<p>${status}</p>`;
    budgetResult.className = "result success";
  } catch (error) {
    if (error instanceof Error) {
      budgetResult.innerHTML = `<p>Error: ${error.message}</p>`;
      budgetResult.className = "result error";
    }
  }
});

// ---- EXPENSE TRACKER ----
const expenseForm = document.getElementById("expense-form") as HTMLFormElement;
const dailyExpensesInput = document.getElementById(
  "daily-expenses",
) as HTMLInputElement;
const dailyBudgetInput = document.getElementById(
  "daily-budget",
) as HTMLInputElement;
const expenseResult = document.getElementById(
  "expense-result",
) as HTMLDivElement;

expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();

  try {
    const dailyExpenses = dailyExpensesInput.value.split(",").map(Number);

    if (dailyExpenses.some(isNaN)) {
      throw new Error("Daily expenses contain non-numeric values");
    }

    const dailyBudget = Number(dailyBudgetInput.value);

    if (isNaN(dailyBudget)) {
      throw new Error("Daily budget must be a number");
    }

    const report: ExpenseReport = generateExpenseReport(
      dailyExpenses,
      dailyBudget,
    );

    expenseResult.innerHTML = `
      <p>Travel days: ${report.travelDays}</p>
      <p>Days with expenses: ${report.expenseDays}</p>
      <p>Daily budget: ${report.dailyBudget}€</p>
      <p>Average daily expense: ${report.averageDailyExpense.toFixed(2)}€</p>
      <p>Under budget: ${report.underBudget ? "Yes" : "No"}</p>
      <p>Rating: ${"⭐".repeat(report.rating)}</p>
      <p>Feedback: ${report.feedback}</p>
    `;
    expenseResult.className = "result success";
  } catch (error) {
    if (error instanceof Error) {
      expenseResult.innerHTML = `<p>Error: ${error.message}</p>`;
      expenseResult.className = "result error";
    }
  }
});
