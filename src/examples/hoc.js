import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
  <div>
    <h1>Info</h1>
    <p>The info is: {props.info}</p>
  </div>
);

// how to write a high order component(HOC)-> component that renders other components 
// this is just a regular function that returns a stateless HOC i.e component that wraps other component
const withAdminWarning = (WrappedComponent) => {
  return (props) => (
    <div>
      { props.isAdmin && <p>This is a private Information</p>}
      <WrappedComponent {...props}/>
    </div>
  )
};

const requireAuthentication = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAuthenticated ? <WrappedComponent {...props} />:<p>Please authenticate your account</p>}
      
    </div>
  )
};

// const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);
// ReactDOM.render(<AdminInfo isAdmin={false} info="These are the details" />, document.getElementById('app'))
ReactDOM.render(<AuthInfo isAuthenticated={true} info="These are the details"/>, document.getElementById('app'))