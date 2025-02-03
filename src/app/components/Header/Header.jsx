import "./header.css";
import { SlBasket } from "react-icons/sl";
import { FaRegHeart } from "react-icons/fa";
import Link from "next/link";
import { IoMenu } from "react-icons/io5";
import { useCart } from "@/context/CartContext";


const Header = () => {
  const { cartItems } = useCart();
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
            <li>
              <a href="">About</a>
            </li>
            <li>
              <a href="">Galery</a>
            </li>
            <li>
              <a href="">Blog</a>
            </li>
            <li>
              <a href="">Contact</a>
            </li>
          </ul>
        </nav>
        <div className="burger">
          <IoMenu />
        </div>
        <div className="icns">
          <Link href={"/wishlist"}>
            <FaRegHeart className="fa" />
          </Link>
          <Link href={"/basket"}>
            <SlBasket className="ri" />
            {cartItems.length > 0 && (
              <span className="cart-count">{cartItems.length}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
