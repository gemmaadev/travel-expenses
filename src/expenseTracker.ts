type Rating = 1 | 2 | 3;

interface ExpenseReport {
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
  if (dailyExpenses.some((expense) => expense < 0)) {
    throw new Error("Les despeses no poden ser negatives");
  }

  if (dailyExpenses.length === 0) {
    throw new Error("L'array de despeses no pot estar buit");
  }

  const travelDays = dailyExpenses.length;
  const expenseDays = dailyExpenses.filter((expense) => expense > 0).length;

  const sumaTotal = dailyExpenses.reduce((acc, expense) => acc + expense, 0);
  const averageDailyExpense = sumaTotal / dailyExpenses.length;

  const underBudget = averageDailyExpense <= dailyBudget;

  let feedback = "";
  let rating: Rating;

  if (averageDailyExpense <= dailyBudget) {
    feedback = "Excel·lent gestió!";
    rating = 3;
  } else if (averageDailyExpense <= dailyBudget * 1.2) {
    feedback = "Correcte, però ajustat";
    rating = 2;
  } else {
    feedback = "Pot millorar";
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
