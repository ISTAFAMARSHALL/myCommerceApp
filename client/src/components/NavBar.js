import React from 'react';
import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/user';

function Navbar({ setLoggedIn, loggedIn }) {
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
        <NavLink className="button" exact to="/account">
            My Account
        </NavLink>
        <br></br> 
        <br></br>
        <NavLink className="button" exact to="/cart">
            <>Cart</>
        </NavLink>
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

      <NavLink className="button" exact to="/logout">
        <div id='logout'
          onClick={() => {
            setLoggedIn(false);
            handleLogOut();
          }}
        >
          Logout
        </div>
      </NavLink>
    </div>
  );
}

export default Navbar;
