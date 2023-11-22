import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import { UserContext } from './context/user';
import LoginForm from './pages/LoginForm';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import ProductCategory from './pages/ProductCategory';
import Account from './pages/Account';
import NavBar from './components/NavBar';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [items, setItems] = useState([]);
  const [userChecked, setUserChecked] = useState(false);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const response = await fetch('/me');
        if (response.ok) {
          const data = await response.json();
          setCurrentUser(data);
          setLoggedIn(true);
        }
      } catch (error) {
        console.error('Error checking user session:', error);
      } finally {
        setUserChecked(true);
      }
    };

    if (!userChecked) {
      checkUserSession();
    }
  }, [userChecked, setCurrentUser]);

  const [userSelection, setUserSelection] = useState(false);

  if (!userChecked) {
    // Show a loading indicator while checking user session
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <>
            SmartBuy
            <br />
            <button id="toggleButton" onClick={() => setUserSelection(!userSelection)}>
              Menu
            </button>
          </>
        </h1>

        <img src={logo} className="App-logo" alt="logo" />

        {loggedIn ? (
          <>
            <p>Welcome {currentUser.username}</p>

            <Switch>
              <Route path="/" exact />
              {/* Add other routes */}
            </Switch>
          </>
        ) : (
          <>
            <LoginForm setLoggedIn={setLoggedIn} />
          </>
        )}
      </header>

      <div className="container">
        {userSelection ? <NavBar setLoggedIn={setLoggedIn} loggedIn={loggedIn} /> : ''}

        <Switch>
          <Route path="/" exact component={ProductList} />
          <Route path="/product/:id" component={ProductDetails} />
          <Route path="/cart" />
          <Route path="/account" render={() => <Account currentUser={currentUser} />} />
        </Switch>
      </div>
    </div>
  );
}

export default App;


// import logo from './logo.svg';
// import './App.css';
// import { useState, useEffect, useContext } from "react";
// import { Switch, Route } from "react-router-dom";
// import { UserContext } from "./context/user";
// import LoginForm from "./pages/LoginForm";
// import ProductList from './pages/ProductList';
// import ProductDetails from './pages/ProductDetails';
// import ProductCategory from './pages/ProductCategory';
// import Account from './pages/Account';
// import NavBar from './components/NavBar';

// function App() {

//   const [loggedIn, setLoggedIn] = useState(false);
//   const {currentUser, setCurrentUser} = useContext(UserContext);
//   const [items, setItems] = useState([]);

//   console.log(currentUser);

//   useEffect(() => {
//     fetch("/me").then((response) => {
//       if (response.ok) {
//         response.json().then((data) => {

//           if (data === !null) {
//             setCurrentUser(data);
//             setLoggedIn(true);
//           } 

//           console.log(data)
//         });
//       }
//     });
//   }, [setCurrentUser]);


//   const [userSelection, setUserSelection] = useState(false);

//   return (
//     <div className="App" >
//       <header className="App-header">
//         <h1>
//           <>SmartBuy</>
//         <br></br>
//         <button
//         id="toggleButton"
//         onClick={() => setUserSelection(!userSelection)}
//       >
//         Menu
//       </button>
//         </h1>

        
//         <img src={logo} className="App-logo" alt="logo" />

//         <br></br>
        

//         {loggedIn ? (
//           <>
//             <p>Welcome {currentUser.username}</p>
            
//             <Switch>

//               <Route path="/" exact 
//               // component={Home} 
//               />

//               <Route path="/product/:id" 
//               // component={ProductDetail} 
//               />

//               <Route path="/product/:category" 
//               component={ProductCategory} 
//               />
              
//               <Route path="/cart" 
//               // component={Cart} 
//               />
              
//               <Route path="/account" 
//               // component={Account} 
//               />

//             </Switch>
//           </>
//         ) : (
//           <>
//             {/* <p>Please login</p>
//             <button onClick={() => setLoggedIn(true)}>Login</button> */}
//             <LoginForm setLoggedIn={setLoggedIn} />

//           </>
//         )}

//       </header>

//       <div className="container" >

//         {userSelection ? (<NavBar></NavBar>) : ("")}
        
        
//         <Switch>

//           <Route path="/" exact 
//           component={ProductList} 
//           />
          
//           <Route path="/product/:id" 
//           component={ProductDetails} 
//           />

//           <Route path="/cart" 
//           // component={Cart} 
//           />

//           <Route path="/account" render={() => <Account currentUser={currentUser} />} />


//         </Switch>
//       </div>
//     </div>
//   );
// }

// export default App;