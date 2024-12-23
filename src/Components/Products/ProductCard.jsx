import "./ProductCard.css";
import basket from "../../assets/basket.png";
import { NavLink } from "react-router-dom";
import whiteStar from "../../assets/white-star.png";
import { useContext } from "react";
import CartContext from "../../context/CartContext";
import UserContext from "../../context/UserContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const user = useContext(UserContext);

  return (
    <article className="product-card">
      <div className="product-img">
        <NavLink to={`/product/${product?._id}`}>
          <img
            src={`http://localhost:5000/products/${product?.images[0]}`}
            alt="product image"
          />
        </NavLink>
      </div>

      <div className="product-details">
        <h3 className="product-price">${product?.price}</h3>
        <p className="product-title">{product?.title}</p>

        <footer className="align-center product-info-footer">
          <div className="align-center">
            <p className="align-center product-rating">
              <img src={whiteStar} alt="star" /> {product?.reviews.rate}
            </p>
            <p className="product-review-count">{product?.reviews.counts}</p>
          </div>

          {product?.stock > 0 && user && (
            <button
              className="add-to-cart"
              onClick={() => addToCart(product, 1)}
            >
              <img src={basket} alt="basket button" />
            </button>
          )}
        </footer>
      </div>
    </article>
  );
};

export default ProductCard;
