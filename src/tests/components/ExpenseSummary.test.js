import React from "react";
import { shallow } from "enzyme";
import ExpensesTotal from "../../selectors/expenses-total";
import { ExpenseSummary } from "../../components/ExpenseSummary";
import expenses from "../fixtures/expenses";

let wrapper, expenseCount, expenseTotal;
describe("Rendering <ExpenseSummary/>", () => {
  beforeEach(() => {
    expenseCount = expenses.length;
    expenseTotal = ExpensesTotal(expenses);
    wrapper = shallow(
      <ExpenseSummary expenseCount={expenseCount} expenseTotal={expenseTotal} />
    );
  });
  it("should render with single expense", () => {
    wrapper.setProps({
      expenseCount: [expenses[0]].length,
      expenseTotal: ExpensesTotal([expenses[0]])
    });
    expect(wrapper).toMatchSnapshot();
  });
  it("should render with multiple expenses", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
