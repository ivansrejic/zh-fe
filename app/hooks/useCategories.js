import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useCategories = () => {
  const getCategoriesCallback = async () => {
    const { data } = await axios.get("http://localhost:8080/category/all");
    return data;
  };

  const {
    data,
    isLoading,
    refetch: refetchCategories,
  } = useQuery(["get-categories"], getCategoriesCallback);

  return {
    data,
    isLoading,
    refetchCategories,
  };
};

export default useCategories;
