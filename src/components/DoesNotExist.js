import React from 'react';
import { Link } from 'react-router-dom';

const DoesNotExist = () => (
  <div>
    404page!<Link to="/">Home</Link>
  </div>
);

export default DoesNotExist;