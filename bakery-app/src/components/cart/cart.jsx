import React from "react";
import "./cart.css";

const cart = (props) => {
  // This function takes the cart props as input and converts it into an array of objects containing item ids and quantities
  const checkout = (props) => {
    // initialize an empty array to hold the modified cart data
    let data = [];
    // loop through each item in the cart
    props.cart.forEach((item) => {
      // push an object containing the item id and quantity to the data array
      data.push({ id: item.id, quantity: item.quantity });
    });
    // log the modified cart data as response
    console.log({ cart: data });
  };
  return (
    <div className="cart-modal">
      {props?.cart.length > 0 ? (
        <div className="cart-item-container">
          <div className="header">Your Cart</div>
          {props.cart.map((item) => (
            <div key={item.name} className="d-flex item">
              <div className="name">
                <div className="text-bold">Item</div>
                <div>{item.name}</div>
              </div>
              <div className="quantity">
                <div className="text-bold">Quantity</div>
                <div> {item.quantity}</div>
              </div>
              <div className="price">
                <div className="text-bold">Price</div>
                <div>₹{item.price * item.quantity}</div>
              </div>
            </div>
          ))}
          <div
            className="checkout-container"
            onClick={() => {
              checkout(props);
              props.parentFunction();
            }}
          >
            <div className="checkout">Check Out</div>
          </div>
        </div>
      ) : (
        <div className="empty-state">No Item in Cart</div>
      )}
    </div>
  );
};

export default cart;
