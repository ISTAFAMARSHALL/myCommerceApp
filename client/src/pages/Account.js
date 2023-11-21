import React from 'react';

const Account = ({ currentUser }) => {

    
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
        <p>Please log in to view your account information.</p>
      )}
    </div>
  );
};

export default Account