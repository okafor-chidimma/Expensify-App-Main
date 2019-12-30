import React from 'react';
import { Link } from 'react-router-dom';

const ExpenseListItem = ({ description, amount, createdAt, id }) => (
  <div>

    <Link to={`/edit/${id}`}>
      <h4>{description}</h4>
    </Link>
    <p>Amount Spent: {amount}</p>
    <p>Created At: {createdAt}</p>
  </div>
);

export default ExpenseListItem;