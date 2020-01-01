import React from "react";
import { shallow } from "enzyme";
import ExpenseListItem from "../../components/ExpenseListItem";
import expenses from "../fixtures/expenses";

const [expense] = expenses;
describe("Rendering <ExpenseListItem/>", () => {
  it("Render the <ExpenseListItem/> with expense as props", () => {
    const wrapper = shallow(<ExpenseListItem {...expense} />);
    expect(wrapper).toMatchSnapshot();
  });
});
