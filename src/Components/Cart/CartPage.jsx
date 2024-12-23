import React, { useContext, useEffect, useState } from "react";

import CommonTable from "../Common/CommonTable";
import QuantityInput from "../SingleProduct/QuantityInput";
import UserContext from "../../context/UserContext";
import CartContext from "../../context/CartContext";

import "./CartPage.css";
import checkoutAPI from "../../services/orederServices";
import { toast } from "react-toastify";

const CartPage = () => {
  const [subTotal, setSubTotal] = useState(0);
  const user = useContext(UserContext);
  const { cart, removeFromCart, updateCart, setCart } = useContext(CartContext);

  useEffect(() => {
    let total = 0;
    cart.forEach((item) => (total += item.product.price * item.quantity));

    setSubTotal(total);
  }, [cart]);

  const checkout = async () => {
    try {
      await checkoutAPI();
      toast.success("Order placed successfully!");

      setCart([]);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <section className="align-center cart-page">
      <div className="align-center user-info">
        <img
          src={`http://localhost:5000/profile/${user?.profilePicture}`}
          alt="user profile"
        />
        <div>
          <p className="user-name">Name: {user?.name}</p>
          <p className="user-email">Email: {user?.email}</p>
        </div>
      </div>

      <CommonTable headings={["Item", "Price", "Quantity", "Total", "Remove"]}>
        <tbody>
          {cart.map(({ product, quantity }) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td className="align-center table-quantity-input">
                <QuantityInput
                  quantity={quantity}
                  stock={product.stock}
                  setQuantity={updateCart}
                  cartPage
                  productId={product._id}
                />
              </td>
              <td>${quantity * product.price}</td>
              <td>
                <img
                  src=""
                  alt="remove icon"
                  className="cart-remove-icon"
                  onClick={() => removeFromCart(product._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </CommonTable>

      <table className="cart-bill">
        <tbody>
          <tr>
            <td>Subtotal</td>
            <td>${subTotal}</td>
          </tr>
          <tr>
            <td>Shipping Charge</td>
            <td>$5</td>
          </tr>
          <tr className="cart-bill-final">
            <td>Total</td>
            <td>${subTotal + 5}</td>
          </tr>
        </tbody>
      </table>

      <button className="search-btn checkout-btn" onClick={() => checkout()}>
        Checkout
      </button>
    </section>
  );
};

export default CartPage;
