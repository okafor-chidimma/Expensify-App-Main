// Set Text Filter
export const setTextFilter = (text = '') => {
  return {
    type: 'SET_TEXT_FILTER',
    text
  }
};

// Sort by amount filter
export const sortByAmount = () => {
  return {
    type: 'SORT_AMOUNT'
  }
};

// Sort by date filter
export const sortByDate = () => {
  return {
    type: 'SORT_DATE'
  }
};

// Set Start Date
export const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate
});

// set end date
export const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate
});
