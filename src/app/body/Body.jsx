"use client";

import "./body.css";
import axios from "axios";
import Link from "next/link";
import { SlBasket } from "react-icons/sl";
import { FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { IoSearchCircle } from "react-icons/io5";

const Body = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wish, setWish] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const words = ["Coat", "TV", "Card", "Ring", "Earering", "T-shirt"];
  const [placeholder, setPlaceholder] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);


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

  useEffect(() => {
    const getApi = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://fakestoreapi.com/products");
        setData(res.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

 
    const storedBasket = JSON.parse(localStorage.getItem("basket")) || [];
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setCartItems(storedBasket);
    setWish(storedWishlist);

    getApi();
  }, []);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const updatePlaceholder = () => {
      if (!isDeleting) {
        if (charIndex < currentWord.length) {
          setPlaceholder((prev) => prev + currentWord[charIndex]);
          setCharIndex((prev) => prev + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 1000);
        }
      } else {
        if (charIndex > 0) {
          setPlaceholder((prev) => prev.slice(0, -1));
          setCharIndex((prev) => prev - 1);
        } else {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    };

    const typingSpeed = isDeleting ? 50 : 100;
    const timer = setTimeout(updatePlaceholder, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, wordIndex]);

  if (loading)
    return (
      <h3 className="loading">
        <img
          src="https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!bw700"
          alt=""
        />
      </h3>
    );
  if (error) return <h3>Xəta baş verdi: {error}</h3>;

  return (
    <>
      <main>
        <section className="first">
          <div className="firstSecContainer">
            <div className="contextImg">
              <img
                src="https://png.pngtree.com/png-vector/20240708/ourmid/pngtree-fresh-vegetables-with-wicker-basket-png-image_13008114.png"
                alt=""
              />
            </div>
            <div className="about">
              <h1>Lorem, ipsum dolor.</h1>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt
                voluptatibus iure veniam distinctio labore! Nihil, asperiores
                aliquid facere, laboriosam ipsa rem cupiditate iure aspernatur
                eligendi vero consequuntur architecto voluptatum!
              </p>
            </div>
          </div>
        </section>
        <section className="second">
          <h1>Food Gallery</h1>
          <div className="btn-inp ">
            <input className="ip" type="text" placeholder={placeholder} />
            <Link href={"/search"}>
              <IoSearchCircle className="serchIcn" />
            </Link>
          </div>
          <div className="secondSecContainer">
            <div className="cardsb">
              {data.map((item) => (
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
                    <FaRegHeart
                      className="heart"
                      onClick={() => cartwish(item)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Body;
