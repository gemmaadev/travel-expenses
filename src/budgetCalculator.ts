//Definim el tipus unió per als missatges (Union Type)
type BudgetStatus =
  | "Sota pressupost ✈️"
  | "Dins pressupost ✅"
  | "Sobre pressupost ⚠️";

export const calculateBudgetStatus = (
  totalExpenses: number,
  budget: number,
): BudgetStatus => { //Firmem la funció amb un tipus de retorn
  const percentage = (totalExpenses / budget) * 100;

  if (percentage < 80) {
    return `Sota pressupost ✈️`;
  }

  if (percentage >= 80 && percentage <= 100) {
    return `Dins pressupost ✅`;
  }

  return `Sobre pressupost ⚠️`;
};

console.log(calculateBudgetStatus(850, 1000));
