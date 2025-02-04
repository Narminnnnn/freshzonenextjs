"use client";
import "./header.css";
import { SlBasket } from "react-icons/sl";
import { FaRegHeart } from "react-icons/fa";
import Link from "next/link";
import { IoMenu } from "react-icons/io5";
import { useEffect, useState } from "react";


const Header = () => {
  const [wishlistCount, setWishlistCount] = useState(0);
  const [basketCount, setBasketCount] = useState(0);
 useEffect(() => {
   const updateCounts = () => {
     setWishlistCount(
       JSON.parse(localStorage.getItem("wishlist"))?.length || 0
     );
     setBasketCount(JSON.parse(localStorage.getItem("basket"))?.length || 0);
   };

   updateCounts();

   window.addEventListener("storage", updateCounts);

   return () => {
     window.removeEventListener("storage", updateCounts);
   };
 }, []);

  return (
    <header>
      <div className="headCountainer">
        <Link href={"/"}>
          {" "}
          <div className="logo">
            <img
              src="https://templatemo.com/templates/templatemo_348_fresh_zone/images/templatemo_logo.png"
              alt=""
            />
          </div>{" "}
        </Link>

        <nav>
          <ul>
            <Link href={"/"}>
              <li className="home">Home</li>
            </Link>
            <Link href={"/about"}>
              {" "}
              <li>About</li>
            </Link>
         
          </ul>
        </nav>
        <div className="burger">
          <IoMenu />
        </div>
        <div className="icns">
          <Link href="/wishlist">
            <div className="icon-container">
              <FaRegHeart className="fa" />
              {wishlistCount > 0 && (
                <span className="count-badge">{wishlistCount}</span>
              )}
            </div>
          </Link>

          <Link href="/basket">
            <div className="icon-container">
              <SlBasket className="ri" />
              {basketCount > 0 && (
                <span className="count-badge">{basketCount}</span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
