import { useQuery } from "@tanstack/react-query";
import apiClient from "../utils/api-client";
import { useEffect, useState } from "react";

const useData = (endPoint, customConfig = {}, queryKey, staleTime = 300_000) => {
  const fetchFuction = apiClient.get(endPoint, customConfig).then(res => res.data);

  return useQuery({
    queryKey,
    queryFn: fetchFuction,
    staleTime
  });
}

export default useData