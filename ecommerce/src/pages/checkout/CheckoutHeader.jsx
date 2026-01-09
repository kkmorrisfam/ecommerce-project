import { Link } from 'react-router';
import logo from '../../assets/images/logo.png';
import mobile_logo from '../../assets/images/mobile-logo.png';
import checkout_lock_icon from '../../assets/images/icons/checkout-lock-icon.png';

import './CheckoutHeader.css';

export function CheckoutHeader() {
  return (
    <div className="checkout-header">
      <div className="header-content">
        <div className="checkout-header-left-section">
          <Link to="/">
            <img className="logo" src={logo} />
            <img className="mobile-logo" src={mobile_logo} />
          </Link>
        </div>

        <div className="checkout-header-middle-section">
          Checkout (
          <Link className="return-to-home-link" to="/">
            3 items
          </Link>
          )
        </div>

        <div className="checkout-header-right-section">
          <img src={checkout_lock_icon} />
        </div>
      </div>
    </div>
  );
}
