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
import Footer from './components/Footer';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [userChecked, setUserChecked] = useState(false);

  const fetchCartItems = async (data) => {
    
    try {
      const response = await fetch(`/carts/${data.id}`); // Adjust the endpoint based on your API

      if (!response.ok) {
        throw new Error('Error fetching cart items');
      }

      const resData = await response.json();
      setCartItems(resData.cart_items);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const checkUserSession = async () => {
    try {
      const response = await fetch('/me');
      if (response.ok) {
        const data = await response.json();
        setCurrentUser(data);
        setLoggedIn(true);
        fetchCartItems(data);
      }
    } catch (error) {
      console.error('Error checking user session:', error);
    } finally {
      
      setUserChecked(true);
      // Call the async function to fetch cart items when the component mounts
      
    }
  };

  useEffect(() => {

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
        {userSelection ? <NavBar setLoggedIn={setLoggedIn} loggedIn={loggedIn} cartItems={cartItems} /> : ''}

        <Switch>
          <Route exact path="/" render={() => <ProductList setCartItems={setCartItems} cartItems={cartItems} loggedIn={loggedIn} />} />
          <Route path="/product/:id" render={() => <ProductDetails setCartItems={setCartItems} cartItems={cartItems} loggedIn={loggedIn} />} />
          <Route path="/cart" render={() => <Cart setCartItems={setCartItems} cartItems={cartItems} />} />
          <Route path="/account" render={() => <Account setLoggedIn={setLoggedIn} loggedIn={loggedIn} />} />
          <Route path="/order/:id" render={() => <OrderScreen setLoggedIn={setLoggedIn} loggedIn={loggedIn} />} />
        </Switch>
      </div>

      <Footer></Footer>
    </div>
  );
}

export default App