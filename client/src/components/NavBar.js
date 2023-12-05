import React from 'react';
import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/user';

function Navbar({ setLoggedIn, loggedIn , cartItems}) {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [userSelection, setUserSelection] = useState('');

  function handleLogOut() {
    fetch('/logout', { method: 'DELETE' });
    setCurrentUser(null);
    setLoggedIn(false);
  }

  const handleUserSelection = (selection) => {
    setUserSelection(selection);
  };

  const calculateTotalQuantity = () => {
    const total = cartItems.reduce((total, item) => total + item.quantity, 0);
    return parseInt(total);
  };

  return (
    <div id="navbar" className={navbarVisible ? '' : 'hidden'}>

    {/* <div className="selection">{userSelection}</div>
      <button
        id="toggleButton"
        onClick={() => setNavbarVisible(!navbarVisible)}
      >
        Toggle Navbar
      </button> */}


        {/* NavLink elements for Best Buy logo and Home page */}
       <div id='navtop'>
        <NavLink className="button" exact to="/">
            Home
        </NavLink>
        <br></br>
        <br></br>
        {loggedIn ? (
        <>
        <NavLink className="button" exact to="/account">
            My Account
        </NavLink>
        <br></br> 
        <br></br>
        </>
      ) : (
        <>
        <NavLink className="button" exact to="/account">
            Sign Up
        </NavLink>
        <br></br> 
        <br></br>
        </>
      )}

        {loggedIn ?         
        
        <NavLink className="button" exact to="/cart">
            <>View { cartItems.length === 0 ? "My Cart" : `${calculateTotalQuantity()} item${cartItems.length !== 0 || cartItems.length !== 1 ?  "s in Cart" : ""}`}
            
            </>
        </NavLink> : <></>  }

        </div>
        {/* NavLink elements for Best Buy categories */}
      <NavLink className="button" to="/categories/laptops">
        <>Laptops & Computers</>
      </NavLink>

      <NavLink className="button" to="/categories/tvs">
        <>TVs & Projectors</>
      </NavLink>

      <NavLink className="button" exact to="/categories/games">
        <>Video Games, VR & Collectibles</>
      </NavLink>

      <NavLink className="button" exact to="/categories/appliances">
        <>Major Appliances</>
      </NavLink>

      {/* Add more NavLink elements for other categories */}
      
      <NavLink className="button" exact to="/categories/apple">
        <>Apple</>
      </NavLink>

      <NavLink className="button" exact to="/categories/cell">
        <>Cell Phones & Accessories</>
      </NavLink>

      <NavLink className="button" exact to="/categories/headphones">
        <>Headphones</>
      </NavLink>

      <NavLink className="button" exact to="/categories/pc">
        <>PC Gaming</>
      </NavLink>

      <NavLink className="button" exact to="/categories/tablets">
        <>Tablets & E-Readers</>
      </NavLink>

      <NavLink className="button" exact to="/categories/soundbars">
        <>Sound Bars, Bluetooth Speakers & Home Audio</>
      </NavLink>

      <NavLink className="button" exact to="/categories/cameras">
        <>Cameras, Camcorders & Drones</>
      </NavLink>

      <NavLink className="button" exact to="/categories/wearable">
        <>Wearable Technology</>
      </NavLink>

      <NavLink className="button" exact to="/categories/home">
        <>Small Appliances, Floor Care & Home Air Quality</>
      </NavLink>

      <NavLink className="button" exact to="/categories/smart">
        <>Smart Home, Security & Wi-Fi</>
      </NavLink>

      <NavLink className="button" exact to="/categories/printers">
        <>Printers & Computer Accessories</>
      </NavLink>

      <NavLink className="button" exact to="/categories/transportation">
        <>Electric Transportation</>
      </NavLink>

      <NavLink className="button" exact to="/categories/collectibles">
        <>Collectibles & Toys</>
      </NavLink>

      {loggedIn === true ? (
        <>
                <NavLink className="button" exact to="">
        <div id='logout'
          onClick={() => {
            handleLogOut();
          }}
        >
          Logout
        </div>
      </NavLink>
        </>
      ) : (
        <>

        </>
      )}

    </div>
  );
}

export default Navbar;
