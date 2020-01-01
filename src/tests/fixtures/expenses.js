import moment from "moment";
const expenses = [
  {
    id: "1",
    description: "January rent",
    note: "Last rent before moving",
    amount: 54500,
    createdAt: moment(0).valueOf()
  },
  {
    id: "2",
    description: "Cable Money",
    note: "Gotv cable money",
    amount: 4500,
    createdAt: moment(0)
      .subtract(4, "days")
      .valueOf()
  },
  {
    id: "3",
    description: "Data Money",
    note: "Subscription for the month",
    amount: 45000,
    createdAt: moment(0)
      .add(4, "days")
      .valueOf()
  }
];

export const oneExpense = [
  {
    id: "1",
    description: "January rent",
    note: "Last rent before moving",
    amount: 54500,
    createdAt: moment(0).valueOf()
  }
];
export default expenses;
