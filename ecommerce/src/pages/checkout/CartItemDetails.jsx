import { useState } from "react";
import { formatMoney } from "../../utils/money";
import axios from 'axios';

export function CartItemDetails({cartItem, loadCart}) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  const updateCartItem = async () => {
    // if (isUpdating === false) {
    //   setIsUpdating(true);
    // } else {
    //   setIsUpdating(false);
    // }    
    (isUpdating === false) ? setIsUpdating(true) : setIsUpdating(false);    
    
    // console.log("cartItem quantity", cartItem.quantity);
    // console.log("state quantity", parseInt(quantity));
    updateDatabaseQuantity();
     
  }

  const updateDatabaseQuantity = async () => {
    // console.log("cartItem quantity", cartItem.quantity);
    // console.log("state quantity", parseInt(quantity));
    if ((isUpdating === true) && (cartItem.quantity != parseInt(quantity))) {
      // console.log("inside if statement")
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        quantity: parseInt(quantity)
      });
      setIsUpdating(false);
      loadCart();
    }
  }

  const updateInputQuantity = (event)=> {
    setQuantity(event.target.value);
  }

  const updateKeyDown = (event) => {
    if (event.key === 'Enter') {
      updateDatabaseQuantity();
    } else if (event.key === 'Escape') {
      setQuantity(cartItem.quantity);
      setIsUpdating(false);
    }
  }

  return (
    <>
      <img className="product-image" src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:{" "}
            {isUpdating ? 
              <input type="text" 
              className="quantity-input" 
              value={quantity} 
              onChange={updateInputQuantity}
              onKeyDown={updateKeyDown}
              />
              : <span className="quantity-label">{cartItem.quantity}</span>
            }
            
          </span>
            
          <span className="update-quantity-link link-primary"
            onClick={updateCartItem}          
          >Update</span>
          <span className="delete-quantity-link link-primary"
            onClick={deleteCartItem}
          >Delete</span>
        </div>
      </div>
    </>
  );
}
