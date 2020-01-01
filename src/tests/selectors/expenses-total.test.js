import ExpensesTotal from "../../selectors/expenses-total";
import expenses, { oneExpense } from "../fixtures/expenses";

describe("Totaling The Amount On Expenses", () => {
  it("should sum up multiple expenses", () => {
    const totalAmount = ExpensesTotal(expenses);
    expect(totalAmount).toBe(104000);
  });
  it("should sum up a single expense", () => {
    const totalAmount = ExpensesTotal(oneExpense);
    expect(totalAmount).toBe(54500);
  });
  it("should return 0 if no expense", () => {
    const totalAmount = ExpensesTotal([]);
    expect(totalAmount).toBe(0);
  });
});
