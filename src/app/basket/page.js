"use client";
import "./basket.css";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

const Page = () => {
  const [cartItems, setCartItems] = useState([]);
  const [deletedItems, setDeletedItems] = useState([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("basket")) || [];
    const storedDeletedItems =
      JSON.parse(localStorage.getItem("deletedItems")) || [];
    setCartItems(storedCartItems);
    setDeletedItems(storedDeletedItems);
  }, []);

  const removeItem = (id) => {
    const itemToDelete = cartItems.find((item) => item.id === id);
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    setDeletedItems([...deletedItems, itemToDelete]);
    localStorage.setItem("basket", JSON.stringify(updatedItems));
    localStorage.setItem(
      "deletedItems",
      JSON.stringify([...deletedItems, itemToDelete])
    );

   
    window.dispatchEvent(new Event("storage"));
  };

  const updateQuantity = (id, quantity) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity + quantity > 0 ? item.quantity + quantity : 1,
        };
      }
      return item;
    });
    setCartItems(updatedItems);
    localStorage.setItem("basket", JSON.stringify(updatedItems));
  };

  const restoreDeletedItems = () => {
    setCartItems([...cartItems, ...deletedItems]);
    setDeletedItems([]);
    localStorage.setItem(
      "basket",
      JSON.stringify([...cartItems, ...deletedItems])
    );
    localStorage.setItem("deletedItems", JSON.stringify([]));
  };

  const totalPrice = cartItems.reduce((total, item) => {
    const itemPrice = Number(item.price) || 0;
    const itemQuantity = Number(item.quantity) || 1;
    return total + itemPrice * itemQuantity;
  }, 0);

  return (
    <div>
      <section className="basket-section">
        <div className="cart-container">
          <div className="cart-items">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <p>{item.price} AZN</p>
                    <div className="cart-item-controls">
                      <div className="quantity-controls">
                        <button onClick={() => updateQuantity(item.id, -1)}>
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)}>
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="delete-btn"
                      >
                        <RiDeleteBin6Line />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Səbət boşdur</p>
            )}
          </div>

          <div className="cart-summary">
            <h3>Səbətdəki məhsullar</h3>
            <div className="summary-details">
              <p>Məhsulların qiyməti: {totalPrice} AZN</p>
              <p>Endirim: 0 AZN</p>
              <p>
                <strong>Toplam qiymət:</strong> {totalPrice} AZN
              </p>
            </div>
            <button className="checkout-btn">Sifarişi rəsmiləşdir</button>
          </div>
        </div>

       
      </section>
    </div>
  );
};

export default Page;
