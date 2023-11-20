import React from 'react';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/user';

function Navbar({ setLoggedIn, staffButton, studentButton }) {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  function handleLogOut() {
    fetch('/logout', { method: 'DELETE' });
    setCurrentUser(null);
    setLoggedIn(false);
  }

  return (
    <div id="navbar">

        {/* NavLink elements for Best Buy logo and Home page */}
      <NavLink className="button" exact to="/">
        <button>Home</button>
      </NavLink>

      <NavLink className="button" exact to="/account">
        <button>My Account</button>
      </NavLink>

        <NavLink className="button" exact to="/cart">
        <button>Cart</button>
        </NavLink>

        {/* NavLink elements for Best Buy categories */}
      <NavLink className="button" exact to="/laptops-computers">
        <button>Laptops & Computers</button>
      </NavLink>

      <NavLink className="button" exact to="/tvs-projectors">
        <button>TVs & Projectors</button>
      </NavLink>

      <NavLink className="button" exact to="/video-games-collectibles">
        <button>Video Games, VR & Collectibles</button>
      </NavLink>

      <NavLink className="button" exact to="/major-appliances">
        <button>Major Appliances</button>
      </NavLink>

      {/* Add more NavLink elements for other categories */}
      
      <NavLink className="button" exact to="/apple">
        <button>Apple</button>
      </NavLink>

      <NavLink className="button" exact to="/cell-phones-accessories">
        <button>Cell Phones & Accessories</button>
      </NavLink>

      <NavLink className="button" exact to="/headphones">
        <button>Headphones</button>
      </NavLink>

      <NavLink className="button" exact to="/pc-gaming">
        <button>PC Gaming</button>
      </NavLink>

      <NavLink className="button" exact to="/tablets-e-readers">
        <button>Tablets & E-Readers</button>
      </NavLink>

      <NavLink className="button" exact to="/sound-bars-audio">
        <button>Sound Bars, Bluetooth Speakers & Home Audio</button>
      </NavLink>

      <NavLink className="button" exact to="/cameras-drones">
        <button>Cameras, Camcorders & Drones</button>
      </NavLink>

      <NavLink className="button" exact to="/wearable-technology">
        <button>Wearable Technology</button>
      </NavLink>

      <NavLink className="button" exact to="/small-appliances">
        <button>Small Appliances, Floor Care & Home Air Quality</button>
      </NavLink>

      <NavLink className="button" exact to="/smart-home-security">
        <button>Smart Home, Security & Wi-Fi</button>
      </NavLink>

      <NavLink className="button" exact to="/printers-accessories">
        <button>Printers & Computer Accessories</button>
      </NavLink>

      <NavLink className="button" exact to="/electric-transportation">
        <button>Electric Transportation</button>
      </NavLink>

      <NavLink className="button" exact to="/collectibles-toys">
        <button>Collectibles & Toys</button>
      </NavLink>

      <NavLink className="button" exact to="/exclusive-member-deals">
        <button>Exclusive Member Deals</button>
      </NavLink>

      <NavLink className="button" exact to="/logout">
        <button
          onClick={() => {
            setLoggedIn(false);
            handleLogOut();
          }}
        >
          Logout
        </button>
      </NavLink>
    </div>
  );
}

export default Navbar;
