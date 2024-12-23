import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import NavbarLink from "./NavbarLink";
import UserContext from "../../context/UserContext";

import "./Navbar.css";
import CartContext from "../../context/CartContext";
import { getSuggestionsAPI } from "../../services/productService";
import { literal } from "zod";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(-1);
  const navigate = useNavigate();

  const user = useContext(UserContext);
  const { cart } = useContext(CartContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate(`/products?search=${search.trim()}`);
    }
    setSuggestions([]);
  };

  const handleKeyDown = (e) => {
    if (selectedItem < suggestions.length) {
      if (e.key === "ArrowDown") {
        setSelectedItem((current) =>
          current === suggestions.length - 1 ? (current = 0) : current + 1
        );
      } else if (e.key === "ArrowUp") {
        setSelectedItem((current) =>
          current === 0 ? (current = suggestions.length - 1) : current - 1
        );
      } else if (e.key === "Enter" && selectedItem > -1) {
        const suggestion = suggestions[selectedItem];
        navigate(`/products?search=${suggestion.title}`);
        setSearch("");
        setSuggestions([]);
      }
    } else {
      setSelectedItem(-1);
    }
  };

  useEffect(() => {
    const delayedSuggestions = setTimeout(() => {
      async function fetchData() {
        if (search.trim() !== "") {
          try {
            const resopnse = await getSuggestionsAPI(search);
            setSuggestions(resopnse.data);
          } catch (error) {
            console.log(error);
          }
        } else {
          setSuggestions([]);
        }
      }

      fetchData();
    }, 300);

    return () => clearTimeout(delayedSuggestions);
  }, [search]);

  return (
    <nav className="align-center navbar">
      <section className="align-center">
        <h1 className="navbar-heading">CartWish</h1>
        <form className="align-center navbar-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="navbar-search"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {suggestions.length > 0 && (
            <ul className="search-result">
              {suggestions.map((suggestion, index) => (
                <li
                  className={
                    selectedItem === index
                      ? "search-suggestion-link active"
                      : "search-suggestion-link"
                  }
                  key={suggestion._id}
                >
                  <Link
                    to={`/products?search=${suggestion.title}`}
                    onClick={() => {
                      setSearch("");
                      setSuggestions([]);
                    }}
                  >
                    {suggestion.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <button type="submit" className="search-btn">
            Search
          </button>
        </form>
      </section>
      <section className="align-center navbar-links">
        <NavbarLink title="Home" link="/" />
        <NavbarLink title="Products" link="/products" />
        {!user && (
          <>
            <NavbarLink title="Login" link="/login" />
            <NavbarLink title="Sing Up" link="/signup" />
          </>
        )}
        {user && (
          <>
            <NavbarLink title="My Oreders" link="/myorders" />
            <NavbarLink title="Logout" link="/logout" />
            <NavLink to="/cart" className="align-center navbar-link">
              Cart <p className="align-center cart-counts">{cart.length}</p>
            </NavLink>
          </>
        )}
      </section>
    </nav>
  );
};

export default Navbar;
