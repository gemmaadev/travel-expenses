export type Rating = 1 | 2 | 3;

export interface ExpenseReport {
  travelDays: number;
  expenseDays: number;
  dailyBudget: number;
  averageDailyExpense: number;
  underBudget: boolean;
  rating: Rating;
  feedback: string;
}

export const generateExpenseReport = (
  dailyExpenses: number[],
  dailyBudget: number,
): ExpenseReport => {
  if (dailyExpenses.some(isNaN)) {
    throw new Error("Expenses contain non-numeric values");
  }
  if (dailyExpenses.some((expense) => expense < 0)) {
    throw new Error("Expenses cannot be negative");
  }

  if (dailyExpenses.length === 0) {
    throw new Error("The expenses array cannot be empty");
  }

  const travelDays = dailyExpenses.length;
  const expenseDays = dailyExpenses.filter((expense) => expense > 0).length;

  const sumaTotal = dailyExpenses.reduce((acc, expense) => acc + expense, 0);
  const averageDailyExpense = sumaTotal / dailyExpenses.length;

  const underBudget = averageDailyExpense <= dailyBudget;

  let feedback = "";
  let rating: Rating;

  if (averageDailyExpense <= dailyBudget) {
    feedback = "Excellent!";
    rating = 3;
  } else if (averageDailyExpense <= dailyBudget * 1.2) {
    feedback = "Correct, but tight";
    rating = 2;
  } else {
    feedback = "Can improve";
    rating = 1;
  }

  return {
    travelDays,
    expenseDays,
    dailyBudget,
    averageDailyExpense,
    underBudget,
    rating,
    feedback,
  };
};

// console.log(generateExpenseReport([50, 0, 120, 85], 100));
// console.log(generateExpenseReport([100, 110, 115], 100));
// console.log(generateExpenseReport([150, 200, 180], 100));
