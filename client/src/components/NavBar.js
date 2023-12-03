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

  console.log('navbar', currentUser); 

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
            <>View { cartItems.length === 0 ? "My " : `${calculateTotalQuantity()} item`}{cartItems.length >= 2 ? "s" : ""} in Cart</>
        </NavLink> : <></>  }

        </div>
        {/* NavLink elements for Best Buy categories */}
      <NavLink className="button" to="/product/laptops">
        <>Laptops & Computers</>
      </NavLink>

      <NavLink className="button" to="/product/tvs">
        <>TVs & Projectors</>
      </NavLink>

      <NavLink className="button" exact to="/product/games">
        <>Video Games, VR & Collectibles</>
      </NavLink>

      <NavLink className="button" exact to="/product/appliances">
        <>Major Appliances</>
      </NavLink>

      {/* Add more NavLink elements for other categories */}
      
      <NavLink className="button" exact to="/product/apple">
        <>Apple</>
      </NavLink>

      <NavLink className="button" exact to="/product/cell">
        <>Cell Phones & Accessories</>
      </NavLink>

      <NavLink className="button" exact to="/product/headphones">
        <>Headphones</>
      </NavLink>

      <NavLink className="button" exact to="/product/pc">
        <>PC Gaming</>
      </NavLink>

      <NavLink className="button" exact to="/product/tablets">
        <>Tablets & E-Readers</>
      </NavLink>

      <NavLink className="button" exact to="/product/soundbars">
        <>Sound Bars, Bluetooth Speakers & Home Audio</>
      </NavLink>

      <NavLink className="button" exact to="/product/cameras">
        <>Cameras, Camcorders & Drones</>
      </NavLink>

      <NavLink className="button" exact to="/product/wearable">
        <>Wearable Technology</>
      </NavLink>

      <NavLink className="button" exact to="/product/home">
        <>Small Appliances, Floor Care & Home Air Quality</>
      </NavLink>

      <NavLink className="button" exact to="/product/smart">
        <>Smart Home, Security & Wi-Fi</>
      </NavLink>

      <NavLink className="button" exact to="/product/printers">
        <>Printers & Computer Accessories</>
      </NavLink>

      <NavLink className="button" exact to="/product/transportation">
        <>Electric Transportation</>
      </NavLink>

      <NavLink className="button" exact to="/product/collectibles">
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
