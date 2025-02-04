"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { RiDeleteBin6Line } from "react-icons/ri";
import { SlBasket } from "react-icons/sl";
import "./wishlist.css";

const Page = () => {
  const [wish, setWish] = useState([]);
  const [basket, setBasket] = useState([]);

  // localStorage-dan məlumatları oxuyuruq
  useEffect(() => {
    const wishlistData = JSON.parse(localStorage.getItem("wishlist")) || [];
    const basketData = JSON.parse(localStorage.getItem("basket")) || [];
    setWish(wishlistData);
    setBasket(basketData);
  }, []);

  // Məhsulu basketə əlavə etmək (wishlist-dən silmir)
  const carBasket = (product) => {
    const isInBasket = basket.some((item) => item.id === product.id);
    if (!isInBasket) {
      const updatedBasket = [...basket, product];
      setBasket(updatedBasket);
      localStorage.setItem("basket", JSON.stringify(updatedBasket));

      // Header və digər komponentlərdə yenilənmə üçün event trigger edirik
      window.dispatchEvent(new Event("storage"));

      alert(`${product.title} basketə əlavə olundu`);
    } else {
      alert(`${product.title} artıq basketdə mövcuddur`);
    }
  };

  // Wishlist-dən silmək
  const deleteWishItem = (item) => {
    const updatedWishList = wish.filter((wishItem) => wishItem.id !== item.id);
    setWish(updatedWishList);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishList));

    // Yenilənmə üçün event trigger
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div>
      <div className="cards-w">
        {wish.length > 0 ? (
          wish.map((item) => (
            <div className="card-w" key={item.id}>
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
              <div className="icons-w">
                <SlBasket className="basket" onClick={() => carBasket(item)} />
                <RiDeleteBin6Line
                  className="remove"
                  onClick={() => deleteWishItem(item)}
                />
              </div>
            </div>
          ))
        ) : (
          <h3>wishlist-də məhsul yoxdur</h3>
        )}
      </div>
    </div>
  );
};

export default Page;
