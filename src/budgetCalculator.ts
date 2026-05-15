export type BudgetStatus =
  | "Under budget ✈️"
  | "Within budget ✅"
  | "Over budget ⚠️";

export const calculateBudgetStatus = (
  totalExpenses: number,
  budget: number,
): BudgetStatus => {
  if (budget <= 0) {
    throw new Error("Budget must be greater than 0");
  }

  if (totalExpenses < 0) {
    throw new Error("Expenses cannot be negative");
  }

  const percentage = (totalExpenses / budget) * 100;

  if (percentage < 80) {
    return "Under budget ✈️";
  }

  if (percentage <= 100) {
    return "Within budget ✅";
  }

  return "Over budget ⚠️";
};

// console.log(calculateBudgetStatus(850, 1000));
// console.log(calculateBudgetStatus(500, 1000));
// console.log(calculateBudgetStatus(1200, 1000));
// console.log(calculateBudgetStatus(100, 0));
