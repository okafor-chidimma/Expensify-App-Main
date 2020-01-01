export default expensesArr => {
  // i have to pass in 0 on line 5 as the initial value or starting value of accumulator
  const expenseAmount = expensesArr
    .map(expenseArr => expenseArr.amount)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  return expenseAmount;
};
