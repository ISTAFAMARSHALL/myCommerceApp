import React from 'react';

const Account = ({ currentUser }) => {

    console.log(currentUser);

  return (
    <div className="account">
      
      {currentUser.length ? (
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

export default Account;

// import React from 'react';

// const Account = ({ currentUser }) => {
//     console.log(currentUser);
//   return (
//     <div className="account">
//       <h2>Your Account</h2>
//       {currentUser ? (
//         <>
//           <p>
//             <strong>Username:</strong> {currentUser.username}
//           </p>
//           <p>
//             <strong>Email:</strong> {currentUser.email}
//           </p>
//           {/* Add more user information here */}
//         </>
//       ) : (
//         <p>Please log in to view your account information.</p>
//       )}
//     </div>
//   );
// };

// export default Account;