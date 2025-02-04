"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { SlBasket } from "react-icons/sl";
import { FaRegHeart } from "react-icons/fa";
import "./detail.css";

const Detail = ({ params }) => {
  const [data, setData] = useState({});
  const [wish, setWish] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  // LocalStorage-dan məlumatları oxuyuruq
  useEffect(() => {
    const wishlistData = JSON.parse(localStorage.getItem("wishlist")) || [];
    const basketData = JSON.parse(localStorage.getItem("basket")) || [];
    setWish(wishlistData);
    setCartItems(basketData);
  }, []);

  // Basketə əlavə etmək (wishlist-dən silmir)
  const carBasket = (product) => {
    const isInBasket = cartItems.some((item) => item.id === product.id);
    if (!isInBasket) {
      const updatedBasket = [...cartItems, product];
      localStorage.setItem("basket", JSON.stringify(updatedBasket));
      setCartItems(updatedBasket);

      window.dispatchEvent(new Event("storage"));

      alert(`${product.title} basketə əlavə olundu`);
    } else {
      alert(`${product.title} artıq basketdə mövcuddur`);
    }
  };

  // Wishlist-ə əlavə etmək (basket-dən silmir)
  const cartwish = (product) => {
    const isInWishlist = wish.some((item) => item.id === product.id);
    if (!isInWishlist) {
      const updatedWishlist = [...wish, product];
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setWish(updatedWishlist);

      window.dispatchEvent(new Event("storage"));

      alert(`${product.title} wishlistə əlavə olundu`);
    } else {
      alert(`${product.title} artıq wishlistdə mövcuddur`);
    }
  };

  // API-dən məlumatları götürmək
  const getApi = async () => {
    try {
      const res = await axios.get(
        `https://fakestoreapi.com/products/${params.id}`
      );
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  return (
    <>
      {data && (
        <div className="detailContainer">
          <div className="productImage">
            <img src={data.image} alt={data.title} />
          </div>
          <div className="productInfo">
            <p className="title">{data.title}</p>
            <p className="price">{data.price} AZN</p>
            <p className="rating">Rating: {data.rating?.rate}</p>
            <p>{data.description}</p>
          </div>
          <div className="iconsd">
            <SlBasket className="basketd" onClick={() => carBasket(data)} />
            <FaRegHeart className="heartd" onClick={() => cartwish(data)} />
          </div>
        </div>
      )}
    </>
  );
};

export default Detail;
