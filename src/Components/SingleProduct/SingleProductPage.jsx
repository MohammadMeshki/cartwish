import "./SingleProductPage.css";

import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import useData from "../../hooks/useData";

import QuantityInput from "./QuantityInput";
import Loader from "../Common/Loader";
import CartContext from "../../context/CartContext";
import UserContext from "../../context/UserContext";

const SingleProductPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const { id } = useParams();
  console.log(id);
  const {
    data: product,
    error,
    isLoading,
  } = useData(`/products/${id}`, null, ["product"]);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);
  const user = useContext(UserContext);

  return (
    <section className="align-center single-product">
      {product && (
        <>
          <div className="align-center">
            <div className="single-product-thumbnails">
              {error && <em className="form-error">{error}</em>}
              {isLoading && <Loader />}
              {product.images.map((image, index) => (
                <img
                  src={`http://localhost:5000/products/${image}`}
                  alt={product.title}
                  key={index}
                  className={selectedImage === index ? "selected-img" : ""}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>

            <img
              src={`http://localhost:5000/products/${product.images[selectedImage]}`}
              alt={product.title}
              className="single-product-display"
            />
          </div>

          <div className="single-product-details">
            <h1 className="single-product-title">{product.title}</h1>
            <p className="single-product-description">{product.description}</p>
            <p className="single-product-price">${product.price.toFixed(2)}</p>

            {user && (
              <>
                <h2 className="quantity-title">Quantity:</h2>
                <div className="align-center quantity-input">
                  <QuantityInput
                    quantity={quantity}
                    setQuantity={setQuantity}
                    stock={product.stock}
                  />
                </div>

                <button
                  className="search-button add-cart"
                  onClick={() => addToCart(product, quantity)}
                >
                  Add to Cart
                </button>
              </>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default SingleProductPage;
