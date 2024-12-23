import React, { useState } from "react";
import "./QuantityInput.css";

const QuantityInput = ({
  quantity,
  setQuantity,
  stock,
  cartPage,
  productId,
}) => {
  return (
    <>
      <button
        className="quantity-input-button"
        onClick={() =>
          cartPage
            ? setQuantity("decreament", productId)
            : setQuantity(quantity - 1)
        }
        disabled={quantity <= 1}
      >
        {" "}
        -{" "}
      </button>
      <p className="quantity-input-count">{quantity}</p>
      <button
        className="quantity-input-button"
        onClick={() =>
          cartPage
            ? setQuantity("increament", productId)
            : setQuantity(quantity + 1)
        }
        disabled={quantity >= stock}
      >
        {" "}
        +{" "}
      </button>
    </>
  );
};

export default QuantityInput;
