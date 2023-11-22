import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/user';
import SignUpForm from '../components/SignUpForm';

const Account = ({ setLoggedIn, loggedIn }) => {

  const { currentUser, setCurrentUser } = useContext(UserContext);
    
    const user = currentUser.length === 0 ? "no user" : "user";

  return (
    <div className="account">
      
      { user === "user" ? (
        <>
            <h2>Your Account Info</h2>
            <p>
            <strong>Username:</strong> {currentUser.username || 'N/A'}
            </p>
            <p>
            <strong>Email:</strong> {currentUser.email || 'N/A'}
             </p>
          {/* Add more user information here */}
        </>
      ) : (
        <>
        {/* <p>Please log in to view your account information.</p> */}
        <SignUpForm setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
        </>
      )}
    </div>
  );
};

export default Account