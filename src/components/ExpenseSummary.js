import React from "react";
import { connect } from "react-redux";
import numeral from "numeral";
import getVisibleExpense from "../selectors/expenses";
import getExpenseTotal from "../selectors/expenses-total";

export const ExpenseSummary = ({ expenseCount, expenseTotal }) => {
  const title = expenseCount === 1 ? "expense" : "expenses";
  const formattedFigure = `#${numeral(expenseTotal / 100).format("0,0.00")}`;
  return (
    <div>
      <h1>{`Viewing ${expenseCount} ${title} totalling ${formattedFigure}`}</h1>
    </div>
  );
};

const mapStateToProps = state => {
  const visibleExpense = getVisibleExpense(state.expenses, state.filters);
  return {
    expenseCount: visibleExpense.length,
    expenseTotal: getExpenseTotal(visibleExpense)
  };
};

export default connect(mapStateToProps)(ExpenseSummary);

