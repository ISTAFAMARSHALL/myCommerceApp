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
import Cart from './components/Cart';
import OrderScreen from './components/OrderScreen';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
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

  // console.log('Cart items', cartItems);

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
        {userSelection ? <NavBar setLoggedIn={setLoggedIn} loggedIn={loggedIn} items={cartItems} /> : ''}

        <Switch>
          <Route exact path="/" render={() => <ProductList setCartItems={setCartItems} cartItems={cartItems} />} />
          <Route path="/product/:id" render={() => <ProductDetails setCartItems={setCartItems} cartItems={cartItems} />} />
          <Route path="/cart" render={() => <Cart setCartItems={setCartItems} cartItems={cartItems} />} />
          <Route path="/account" render={() => <Account setLoggedIn={setLoggedIn} loggedIn={loggedIn} />} />
          <Route path="/order/:id" render={() => <OrderScreen setLoggedIn={setLoggedIn} loggedIn={loggedIn} />} />
        </Switch>
      </div>
    </div>
  );
}

export default App