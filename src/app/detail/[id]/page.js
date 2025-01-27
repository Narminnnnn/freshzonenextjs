"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./detail.css";

const detail = ({ params }) => {
  const [data, setData] = useState([]);

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
            <img src={data.image} alt="" />
          </div>
          <div className="productInfo">
                      <p className="title">{data.title}</p>
                      <p className="price">{data.price} AZN </p>
                      <p className="raiting">{ data.raiting}</p>
          </div>
          <div className="description">
            <p> {data.description}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default detail;
