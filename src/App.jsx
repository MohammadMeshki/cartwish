import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";

import Routing from "./Components/Routing/Routing";
import Navbar from "./Components/Navbar/Navbar";
import { getJwt, getUser } from "./services/userServices";
import setAuthToken from "./utils/setAuthToken";
import {
  addToCartAPI,
  decreaseProductAPI,
  getCartAPI,
  increaseProductAPI,
  removeFromCartAPI,
} from "./services/cartServices";
import UserContext from "./context/UserContext";
import CartContext from "./context/CartContext";

import "./App.css";
import "react-toastify/ReactToastify.css";
import { set } from "react-hook-form";

setAuthToken(getJwt());

const App = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    try {
      const jwtUser = getUser();
      if (Date.now() >= jwtUser.exp * 1000) {
        localStorage.removeItem("token");
        location.reload();
      } else {
        setUser(jwtUser);
      }
    } catch (error) {}
  }, []);

  const addToCart = async (product, quantity) => {
    let updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === product._id
    );
    if (productIndex === -1) {
      updatedCart.push({ product: product, quantity: quantity });
    } else {
      updatedCart[productIndex].quantity += quantity;
    }

    setCart(updatedCart);

    try {
      await addToCartAPI(product._id, quantity);
      toast.success("Product Added successfully");
    } catch (error) {
      toast.error("Failed to add product");
      console.log(error.response);
      setCart(cart);
    }
  };

  const removeFromCart = async (id) => {
    const oldProducts = [...cart];
    const newProducts = oldProducts.filter((item) => item.product._id !== id);

    setCart(newProducts);

    try {
      await removeFromCartAPI(id);
    } catch (error) {
      toast.error("Something went wrong!");
      setCart(oldProducts);
    }
  };

  const updateCart = (type, id) => {
    const oldCart = [...cart];
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === id
    );

    if (type === "increament") {
      updatedCart[productIndex].quantity += 1;
      setCart(updatedCart);

      increaseProductAPI(id).catch((error) => {
        toast.error("Something went wrong!");
        setCart(oldCart);
      });
    } else if (type === "decreament") {
      updatedCart[productIndex].quantity -= 1;
      setCart(updatedCart);

      decreaseProductAPI(id).catch((error) => {
        toast.error("Something went wrong!");
        setCart(oldCart);
      });
    }
  };

  const getCart = async () => {
    try {
      const response = await getCartAPI();
      setCart(response.data);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    if (user) {
      getCart();
    }
  }, [user]);

  return (
    <UserContext.Provider value={user}>
      <CartContext.Provider
        value={{ addToCart, cart, removeFromCart, updateCart, setCart }}
      >
        <section className="app">
          <Navbar />
          <main>
            <ToastContainer position="bottom-right" />
            <Routing />
          </main>
        </section>
      </CartContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
