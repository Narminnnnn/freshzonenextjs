"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import "./basket.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";

const Page = () => {
  const [basket, setBasket] = useState([]);
  const [wish, setWish] = useState([]);

  useEffect(() => {
        const basketData = JSON.parse(localStorage.getItem("basket")) || [];
    const wishData = JSON.parse(localStorage.getItem("wishlist")) || [];
    setBasket(basketData);
    setWish(wishData);
  }, []);

  const deleteBasketItem = (item) => {
    const updatedBasket = basket.filter(
      (basketItem) => basketItem.id !== item.id
    );
    setBasket(updatedBasket);
    localStorage.setItem("basket", JSON.stringify(updatedBasket));
  };

  const cartwish = (product) => {
    const addtowish = wish.some((item) => item.id === product.id);
    if (!addtowish) {
      const updatedWish = [...wish, product];
      localStorage.setItem("wishlist", JSON.stringify(updatedWish));
      setWish(updatedWish);
      alert(`${product.title} wishliste əlavə olundu`);
    } else {
      alert(`${product.title} artıq wishlistdə mövcuddur`);
    }
  };

  return (
    <section className="basketSection">
      <div className="cards">
        {basket.length > 0 ? (
          basket.map((item) => (
            <div className="card" key={item.id}>
              <div className="image">
                <img src={item.image} alt="item image" />
              </div>
              <div className="content">
                <span>
                  <Link href={`/detail/${item.id}`}>
                    <h3>{item.category}</h3>
                  </Link>
                </span>
                <p>Price: {item.price}$</p>
              </div>
              <div className="icons">
                <FaRegHeart className="heart" onClick={() => cartwish(item)} />
                <RiDeleteBin6Line
                  className="remove"
                  onClick={() => deleteBasketItem(item)}
                />
              </div>
            </div>
          ))
        ) : (
          <h3>Basketdə məhsul yoxdur</h3>
        )}
      </div>
    </section>
  );
};

export default Page;
