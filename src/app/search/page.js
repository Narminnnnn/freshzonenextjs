"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./search.css";
import Link from "next/link";
import { SlBasket } from "react-icons/sl";
import { FaRegHeart } from "react-icons/fa";

const Search = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [wish, setWish] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("basket")) || []
  );


  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts(); 
  }, []);

 
  useEffect(() => {
    let sortedProducts = [...products];

   
    if (sortCriteria === "az-za") {
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortCriteria === "za-az") {
      sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortCriteria === "price-asc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortCriteria === "price-desc") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    
    const filtered = sortedProducts.filter((product) =>
      product.title.toLowerCase().includes(searchText.toLowerCase())
    );

    setFilteredProducts(filtered);
  }, [searchText, sortCriteria, products]);


  const toggleFilter = () => {
    setIsFilterActive((prev) => !prev);
  };

 const addToBasket = (product) => {
   const currentBasket = JSON.parse(localStorage.getItem("basket")) || [];
   const isInBasket = currentBasket.some((item) => item.id === product.id);

   if (!isInBasket) {
     const updatedBasket = [...currentBasket, product];
     localStorage.setItem("basket", JSON.stringify(updatedBasket));
     setCartItems(updatedBasket);
     alert(`${product.title} basketə əlavə olundu`);
   } else {
     alert(`${product.title} artıq basketdə mövcuddur`);
   }
 };

 const addToWishlist = (product) => {
   const currentWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
   const isInWishlist = currentWishlist.some((item) => item.id === product.id);

   if (!isInWishlist) {
     const updatedWishlist = [...currentWishlist, product];
     localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
     setWish(updatedWishlist); 
     alert(`${product.title} wishlistə əlavə olundu`);
   } else {
     alert(`${product.title} artıq wishlistdə mövcuddur`);
   }
 };



  return (
    <div className="search-container">
      <div
        className={`sorting-options ${isFilterActive ? "active" : ""}`}
        onClick={toggleFilter}
      >
        <h4>Filtrlə</h4>
        <div className="options">
          <button onClick={() => setSortCriteria("az-za")}>A-dan Z-ə</button>
          <button onClick={() => setSortCriteria("za-az")}>Z-dən A-ya</button>
          <button onClick={() => setSortCriteria("price-asc")}>
            Qiymət (Ucuzdan Bahaya)
          </button>
          <button onClick={() => setSortCriteria("price-desc")}>
            Qiymət (Bahadan Ucuzaya)
          </button>
        </div>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Axtarış"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="cardss">
        {filteredProducts.map((item) => (
          <div className="cards" key={item.id}>
            <div className="images">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="contents">
              <span>
                <Link href={`/detail/${item.id}`}>
                  <h3>{item.category}</h3>
                </Link>
              </span>
              <p>Price: {item.price}$</p>
            </div>
            <div className="iconss">
              <SlBasket
                className="baskets"
                onClick={() => addToBasket(item)} // Basket-ə əlavə et
              />
              <FaRegHeart
                className="hearts"
                onClick={() => addToWishlist(item)} // Wishlist-ə əlavə et
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
