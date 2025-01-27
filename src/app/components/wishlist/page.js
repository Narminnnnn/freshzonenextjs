
"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import "./wishlist.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { SlBasket } from 'react-icons/sl';

const page = () => {
  const [wish, setWish] = useState([]);
  const [basket, setBasket] = useState([]);
    useEffect(() => {
      const result = JSON.parse(localStorage.getItem("wishlist")) || [];
        const basketData = JSON.parse(localStorage.getItem("basket")) || [];
      setWish(result)
      setBasket(basketData)
    }, [])
  const deleteWishItem = (item) => {
    const updatedWishList = wish.filter((wishItem) => wishItem.id !== item.id);
     setWish(updatedWishList);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishList));
  };
  const carBasket = (product) => {
    const addtobasket = basket.some((item) => item.id === product.id);
    if (!addtobasket) {
      const updatebasket = [...basket, product];
      localStorage.setItem("basket", JSON.stringify(updatebasket));
      setBasket(updatebasket);
      alert(`${product.title} baskete əlavə olundu`);
    } else {
      alert(`${product.title} artıq basketdə mövcuddur`);
    }
  };
    return (
      <div>
        <div className="cards">
          {wish.length > 0 ? (
            wish.map((item) => (
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
                  <SlBasket
                    className="basket"
                    onClick={() => carBasket(item)}
                  />
                  <RiDeleteBin6Line
                    className="remove"
                    onClick={() => deleteWishItem(item)}
                  />
                </div>
              </div>
            ))
          ) : (
            <h3>wishlistdə məhsul yoxdur</h3>
          )}
        </div>
      </div>
    );
}

export default page
