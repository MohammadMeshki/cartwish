import apiClient from "../utils/api-client";

export default function checkoutAPI() {
    return apiClient.post("/order/checkout")
}