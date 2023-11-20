import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useContext } from "react";
import { UserContext } from "./context/user";

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const {currentUser, setCurrentUser} = useContext(UserContext);

  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((user) => {
          setCurrentUser(user);
          setLoggedIn(true);
        });
      }
    });
  }, [setCurrentUser]);

  return (
    <div className="App" >
      <header className="App-header">
        <h1>SmartBuy</h1>
        <img src={logo} className="App-logo" alt="logo" />

      </header>
      <div className="container" >
        {loggedIn ? (
          <>
            <p>Welcome {currentUser.username}</p>
            <button onClick={() => setLoggedIn(false)}>Logout</button>
          </>
        ) : (
          <>
            <p>Please login</p>
            <button onClick={() => setLoggedIn(true)}>Login</button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
