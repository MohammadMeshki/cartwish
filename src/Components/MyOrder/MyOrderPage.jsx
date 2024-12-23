import React, { useEffect, useState } from "react";
import "./MyOrderPage.css";
import CommonTable from "../Common/CommonTable";
import useData from "../../hooks/useData";
import Loader from "../Common/Loader";

const MyOrderPage = () => {
  const {
    data: orders,
    error,
    isLoading,
  } = useData("/order", null, ["myorders"], 60 * 1000);

  const getOrderProductTitle = (order) => {
    const productStringArray = order.products.map(
      (item) => `${item.product.title}(${item.quantity})`
    );
    return productStringArray.join(", ");
  };

  return (
    <section className="align-center myorder-page">
      {isLoading && <Loader />}
      {error && <em className="form-error">{error}</em>}
      {orders && (
        <CommonTable headings={["Order", "Products", "Total", "Status"]}>
          <tbody>
            {orders.map((purchasedProducts, index) => (
              <tr key={purchasedProducts._id}>
                <td>{index + 1}</td>
                <td>{getOrderProductTitle(purchasedProducts)}</td>
                <td>${purchasedProducts.total}</td>
                <td>{purchasedProducts.status}</td>
              </tr>
            ))}
          </tbody>
        </CommonTable>
      )}
    </section>
  );
};

export default MyOrderPage;
