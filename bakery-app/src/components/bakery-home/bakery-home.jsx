import React, { useState } from "react";
import "./bakery-home.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Cart from "../cart/cart";

const BakeryApp = () => {
  const [products] = useState([
    {
      name: "Product",
      tag: "Indulge in every slice of happiness with our delectable cakes.",
      img: require("../../assets/cupcake.svg").default,
    },
    {
      name: "Cake Class",
      tag: "Experience the art of cake-making with our exquisite cake classics.",
      img: require("../../assets/class.svg").default,
    },
    {
      name: "Receipes",
      tag: "Create sweet memories with our irresistible cake recipes.",
      img: require("../../assets/receipe.svg").default,
    },
  ]);
  const [items, setItems] = useState([
    {
      id: "1",
      name: "Croissant",
      price: 250,
      quantity: 0,

      img: require("../../assets/croissant.svg").default,
    },
    {
      id: "2",
      name: "Baguette",
      price: 150,
      quantity: 0,

      img: require("../../assets/baguette.svg").default,
    },
    {
      id: "3",
      name: "Chocolate Pastry",
      price: 120,
      quantity: 0,

      img: require("../../assets/chocolate-pastry.svg").default,
    },
    {
      id: "4",
      name: "Macaron",
      price: 300,
      quantity: 0,

      img: require("../../assets/macaron.svg").default,
    },
    {
      id: "5",
      name: "Puddings",
      price: 170,
      quantity: 0,

      img: require("../../assets/puddings.svg").default,
    },
    {
      id: "6",
      name: "Waffles",
      price: 1.5,

      quantity: 0,
      img: require("../../assets/waffles.svg").default,
    },
    {
      id: "7",
      name: "Ice Cream",
      price: 2,
      quantity: 0,

      img: require("../../assets/ice-cream.svg").default,
    },
    {
      id: "8",
      name: "Cakes",
      price: 1,

      quantity: 0,
      img: require("../../assets/cakes.svg").default,
    },
  ]);

  const [cart, setCart] = useState([]);

  // This function adds an item to the cart and updates the state of items and cart
  const addToCart = (item) => {
    // create a new copy of items array
    const newItems = [...items];
    // get the index of the item in the newItems array
    const index = newItems.findIndex((i) => i.name === item.name);
    // increment the quantity of the item in the newItems array
    newItems[index].quantity++;
    // update the items state with the newItems array
    setItems(newItems);

    // create a new copy of cart array
    const newCart = [...cart];
    // get the index of the item in the newCart array
    const cartIndex = newCart.findIndex((i) => i.name === item.name);
    // check if the item is already in the cart
    if (cartIndex !== -1) {
      // if yes, increment the quantity of the item in the newCart array
      newCart[cartIndex].quantity++;
    } else {
      // if no, add a new object with the item details and quantity 1 to the newCart array
      newCart.push({ ...item, quantity: 1 });
    }
    // update the cart state with the newCart array
    setCart(newCart);
  };

  // This function removes an item from the cart and updates the state of items and cart
  const removeFromCart = (item) => {
    // create a new copy of items array
    const newItems = [...items];
    // get the index of the item in the newItems array
    const index = newItems.findIndex((i) => i.name === item.name);
    // decrement the quantity of the item in the newItems array
    newItems[index].quantity--;
    // update the items state with the newItems array
    setItems(newItems);

    // create a new copy of cart array
    const newCart = [...cart];
    // get the index of the item in the newCart array
    const cartIndex = newCart.findIndex((i) => i.name === item.name);
    // check if the item is in the cart and its quantity is more than 1
    if (cartIndex !== -1 && newCart[cartIndex].quantity > 1) {
      // if yes, decrement the quantity of the item in the newCart array
      newCart[cartIndex].quantity--;
    } else {
      // if no or its quantity is 1, remove the item from the newCart array
      newCart.splice(cartIndex, 1);
    }
    // update the cart state with the newCart array
    setCart(newCart);
  };

  // This state variable controls the visibility of the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // This function toggles the value of isModalOpen to open or close the modal
  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // This function resets the quantity of all items to 0 and opens the modal
  const handleState = () => {
    // reset the quantity of all items in the items array
    items.forEach((item) => {
      if (item.quantity) {
        item.quantity = 0;
      }
    });
    // update the items state with the modified items array
    setItems(items);
    // open the modal
    handleOpenModal();
  };

  return (
    <div className="home-container">
      <div className="cart" onClick={handleOpenModal}>
        <i className="fa fa-shopping-cart fa-lg" aria-hidden="true"></i>
        Cart
      </div>

      <div className="product-container">
        {products.map((product) => (
          <div key={product.name} className="product-category">
            <img src={product.img} alt="" />
            <div className="product-category-details">
              <div className="name">{product.name}</div>
              <div className="tag">{product.tag}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="heading">NEW PRODUCTS</div>
      <div className="item-container">
        {items.map((item) => (
          <div key={item.name} className="item">
            <img src={item.img} alt="" className="item-img" />
            <h2>{item.name}</h2>
            <p>₹{item.price.toFixed(2)}</p>
            {item?.quantity ? (
              <div className="d-flex  item-button-custom">
                <i
                  className="fa fa-minus fa-icon"
                  onClick={() => removeFromCart(item)}
                ></i>
                <p>{item.quantity}</p>
                <i
                  className="fa fa-plus fa-icon"
                  onClick={() => addToCart(item)}
                  aria-hidden="true"
                ></i>
              </div>
            ) : (
              <div onClick={() => addToCart(item)} className="item-button">
                Add to Cart
              </div>
            )}
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div>
          <div
            className="modal-backdrop"
            onClick={() => handleOpenModal()}
          ></div>
          <Cart
            cart={cart}
            className="cart-modal"
            parentFunction={handleState}
          />
        </div>
      )}
    </div>
  );
};

export default BakeryApp;
