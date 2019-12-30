import moment from 'moment';

// to sort the expense and return data that matches
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {

  return expenses.filter((expense) => {
    const createdAtMoment = moment(expense.createdAt);
    const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment) : true;
    const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment) : true;
    // this includes will always be true as long as the text is an empty string or a string contained in description
    // i.e textMatch will only be false is the text is not empty and cannot be found in description
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
    // console.log(textMatch, 'text match');
    // console.log(endDate, 'end date');
    // console.log(createdAtMoment, 'created at moment');
    // console.log(expense.createdAt, 'value of');
    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1
    } else if (sortBy === 'amount') {
      return a.amount < b.amount ? 1 : -1
    }
  });

}

export default getVisibleExpenses;