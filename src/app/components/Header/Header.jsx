import "./header.css";
import { SlBasket } from "react-icons/sl";
import { FaRegHeart } from "react-icons/fa";
import Link from "next/link";
import { IoMenu } from "react-icons/io5";

const Header = () => {
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
            <li className="home">
              <a href="">Home</a>
            </li>
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
          <Link href={"/components/wishlist"}>
            <FaRegHeart className="fa" />
          </Link>
          <Link href={"/components/basket"}>
            <SlBasket className="ri" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
