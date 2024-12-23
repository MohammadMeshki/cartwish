import React from "react";
import "./FeaturedProducts.css";
import ProductCard from "../Products/ProductCard";
import useData from "../../hooks/useData";
import ProductCardSkeleton from "../Products/ProductCardSkeleton";

const FeaturedProducts = () => {
  const {
    data: response,
    error,
    isLoading,
  } = useData(
    "/products/featured",
    null,
    ["products", "featured"],
    10 * 60 * 60 * 1000
  );
  const skeletons = [1, 2, 3];
  return (
    <section className="featured-products">
      <h2>Featured Products</h2>
      <div className="align-center featured-products-list">
        {error && <em className="form-error">{error}</em>}
        {response &&
          response.data.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        {isLoading &&
          skeletons.map((skeleton) => <ProductCardSkeleton key={skeleton} />)}
      </div>
    </section>
  );
};

export default FeaturedProducts;
