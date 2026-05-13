type BudgetStatus =
  | "Sota pressupost ✈️"
  | "Dins pressupost ✅"
  | "Sobre pressupost ⚠️";

export const calculateBudgetStatus = (
  totalExpenses: number,
  budget: number,
): BudgetStatus => {
  if (budget <= 0) {
    throw new Error("El pressupost ha de ser superior a 0");
  }

  if (totalExpenses < 0) {
    throw new Error("Les despeses no poden ser negatives");
  }

  const percentage = (totalExpenses / budget) * 100;

  if (percentage < 80) {
    return `Sota pressupost ✈️`;
  }

  if (percentage <= 100) {
    return `Dins pressupost ✅`;
  }

  return `Sobre pressupost ⚠️`;
};

// console.log(calculateBudgetStatus(850, 1000));
// console.log(calculateBudgetStatus(500, 1000));
// console.log(calculateBudgetStatus(1200, 1000));
// console.log(calculateBudgetStatus(100, 0));
