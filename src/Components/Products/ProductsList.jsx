import { useEffect, useState } from "react";
import "./ProductsList.css";

import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { useSearchParams, useSubmit } from "react-router-dom";
import useProductList from "../../hooks/useProductList";
// import Pagination from "../Common/Pagination";

const ProductsList = () => {
  const [search, setSearch] = useSearchParams();
  const category = search.get("category");
  const searchQuery = search.get("search");
  const [sortBy, setSortBy] = useState("");
  const [sortedProducts, setSortedProducts] = useState([]);

  const { data, error, isLoading, fetchNextPage } = useProductList({
    search: searchQuery,
    category,
  });

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  const handlePageChange = () => {
    const currentParams = Object.fromEntries([...search]);
    setSearch({ ...currentParams, page: parseInt(currentParams.page) + 1 });
  };

  useEffect(() => {
    const handleInfiniteScrolling = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 1 && !isLoading && data) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleInfiniteScrolling);

    return () => window.removeEventListener("scroll", handleInfiniteScrolling);
  }, [data, isLoading]);

  useEffect(() => {
    if (data && data.pages) {
      const products = data.pages.flatMap((page) => page.data.products);

      if (sortBy === "price desc") {
        setSortedProducts(products.sort((a, b) => b.price - a.price));
      } else if (sortBy === "price asc") {
        setSortedProducts(products.sort((a, b) => a.price - b.price));
      } else if (sortBy === "rate desc") {
        setSortedProducts(
          products.sort((a, b) => b.reviews.rate - a.reviews.rate)
        );
      } else if (sortBy === "rate asc") {
        setSortedProducts(
          products.sort((a, b) => a.reviews.rate - b.reviews.rate)
        );
      } else {
        setSortedProducts(products);
      }
    }
  }, [sortBy, data]);

  return (
    <section className="products-list">
      <header className="align-center products-list-header">
        <h2>Products</h2>
        <select
          name="sort"
          id=""
          className="products-sorting"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Relevance</option>
          <option value="price desc">Price HIGH to LOW</option>
          <option value="price asc">Price LOW to HIGH</option>
          <option value="rate desc">Rate HIGH to LOW</option>
          <option value="rate asc">Rate LOW to HIGH</option>
        </select>
      </header>

      <div className="products-list">
        {error && <em className="form-error">{error}</em>}
        {sortedProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
        {isLoading &&
          skeletons.map((skeleton) => <ProductCardSkeleton key={skeleton} />)}
      </div>
      {/* <Pagination
        totalPosts={data?.totalProducts}
        postsPerPage={8}
        onClick={handlePageChange}
        currentPage={page}
      /> */}
    </section>
  );
};

export default ProductsList;
