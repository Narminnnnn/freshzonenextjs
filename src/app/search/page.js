"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./search.css"

const Search = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
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

  return (
    <div className="search-container">
      <div className="sorting-options">
        <button onClick={() => setSortCriteria("az-za")}>A-dan Z-ə</button>
        <button onClick={() => setSortCriteria("za-az")}>Z-dən A-ya</button>
        <button onClick={() => setSortCriteria("price-asc")}>
          Qiymət (Ucuzdan Bahaya)
        </button>
        <button onClick={() => setSortCriteria("price-desc")}>
          Qiymət (Bahadan Ucuzaya)
        </button>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Axtarış"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="product-list">
        {filteredProducts.length === 0 ? (
        <p className="no-products">Belə bir məhsul yoxdur!</p>
      ) : ( filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} />
            <h4>{product.title}</h4>
            <h2>{product.price} AZN</h2>
            <span className="badge new">YENİLİK</span>
            <span className="badge stock">MÖVCUDLUĞU DƏQİQLƏŞDİRİN</span>
          </div>
        )))}
      </div>
    </div>
  );
};

export default Search;
