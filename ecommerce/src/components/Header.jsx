import { NavLink, useNavigate } from 'react-router';
import logo_white from '../assets/images/logo-white.png';
import mobile_logo_white from '../assets/images/mobile-logo-white.png';
import search_icon from '../assets/images/icons/search-icon.png';
import cart_icon from '../assets/images/icons/cart-icon.png';

import './Header.css';
import { useState } from 'react';


export function Header({cart}) {
  const [searchString, setSearchString] = useState("");

  const navigate = useNavigate();

  let totalQuantity = 0;

  cart.forEach((cartItem)=>{
    totalQuantity += cartItem.quantity;
  });

  const searchThis = (event) => {
    setSearchString(event.target.value);
    // console.log("search", event.target.value);
    // setTimeout(setSearchString(event.target.value), 6000)  
    // console.log(searchString);

  }

  const handleSearchClick = () => {
    console.log("Search string", searchString);
    //navigate to the home page with search in url, 
    // so homepage can use it
    navigate(`/?search=${searchString}`)

  }

  const handleKeySearch = (event) => {
    if (event.key === 'Enter') {
      handleSearchClick();

    } else if (event.key === 'Escape') {
      setSearchString("");
    }
    
    
  }

  return (
    <div className="header">
      <div className="left-section">
        <NavLink to="/" className="header-link">
          <img className="logo" src={logo_white} />
          <img className="mobile-logo" src={mobile_logo_white} />
        </NavLink>
      </div>

      <div className="middle-section">
        <input 
          className="search-bar" 
          type="text" 
          placeholder="Search" 
          onClick={handleSearchClick}
          onChange={searchThis}
          onKeyDown={handleKeySearch}
          />

        <button className="search-button">
          <img className="search-icon" src={search_icon} 
            onClick={handleSearchClick}
            />
        </button>
      </div>

      <div className="right-section">
        <NavLink className="orders-link header-link" to="/orders">
          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src={cart_icon} />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </NavLink>
      </div>
    </div>
  );
}
