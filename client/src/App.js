import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { UserContext } from "./context/user";
import LoginForm from "./pages/LoginForm";
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const {currentUser, setCurrentUser} = useContext(UserContext);
  const [items, setItems] = useState([]);

  // useEffect(() => {
  //   fetch("/me").then((response) => {
  //     if (response.ok) {
  //       response.json().then((user) => {
  //         setCurrentUser(user);
  //         setLoggedIn(true);
  //         console.log(user)
  //       });
  //     }
  //   });
  // }, [setCurrentUser]);

  return (
    <div className="App" >
      <header className="App-header">
        <h1>SmartBuy</h1>
        <img src={logo} className="App-logo" alt="logo" />

        {loggedIn ? (
          <>
            <p>Welcome {currentUser.username}</p>
            
            <Switch>

              <Route path="/" exact 
              // component={Home} 
              />

              <Route path="/product/:id" 
              // component={ProductDetail} 
              />
              
              <Route path="/cart" 
              // component={Cart} 
              />
              
              <Route path="/account" 
              // component={Account} 
              />

            </Switch>
          </>
        ) : (
          <>
            {/* <p>Please login</p>
            <button onClick={() => setLoggedIn(true)}>Login</button> */}
            <LoginForm setLoggedIn={setLoggedIn} />

          </>
        )}

      </header>

      <div className="container" >
        
        <Switch>

          <Route path="/" exact 
          // component={ProductList} 
          >
            <ProductList setItems={setItems}/>
          </Route>
          
          <Route path="/product/:id" 
          component={ProductDetails} 
          />

          <Route path="/cart" 
          // component={Cart} 
          />
          <Route path="/account" 
          // component={Account} 
          />

        </Switch>
      </div>
    </div>
  );
}

export default App;