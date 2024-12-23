import "./ProductsSidebar.css";

import NavbarLink from "../Navbar/NavbarLink";
import useData from "../../hooks/useData";

const ProductsSidebar = () => {
  const { data: categories, error } = useData(
    "/category",
    null,
    ["categories"],
    1000 * 60 * 60 * 24
  );
  console.log(categories);
  return (
    <aside className="products-sidebar">
      <h2>category</h2>

      <div className="category-links">
        {error && <em className="form-error">{error.message}</em>}
        {categories &&
          categories.data.map((category) => (
            <NavbarLink
              title={category.name}
              link={`/products?category=${category.name}`}
              emoji={`http://localhost:5000/category/${category.image}`}
              key={category._id}
              sidebar
            />
          ))}
      </div>
    </aside>
  );
};

export default ProductsSidebar;
