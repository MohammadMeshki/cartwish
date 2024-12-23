import { useInfiniteQuery } from "@tanstack/react-query";
import apiClient from "../utils/api-client";

const useProductList = (query) => {
    console.log(query)
    const fetchProducts = () => apiClient.get("/products",query).catch(err => console.log(err));

    return useInfiniteQuery({
        queryKey: ["products"],
        queryFn: fetchProducts,
        // getNextPageParam: (lastPage, allPages) => {
        //     return lastPage.data.currentPage < lastPage.data.totalPages ? lastPage.data.currentPage + 1 : null;
        // }
    })
}

export default useProductList;