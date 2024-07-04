"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const useProduct = () => {
  const getProductsCallback = async () => {
    const { data } = await axios.get("http://localhost:8080/product/all");
    return data;
  };
  const {
    data,
    isLoading,
    refetch: refetchProducts,
  } = useQuery(["get-products"], getProductsCallback);

  const createProductCallback = async ({
    name,
    description,
    price,
    quantityAvailable,
    categoryId,
  }) => {
    const { data } = await axios.post("http://localhost:8080/product", {
      name,
      description,
      price,
      quantityAvailable,
      categoryId,
    });

    return data;
  };

  const createProduct = useMutation(createProductCallback, {
    onError: () => {
      return error.response?.data || "Unknown error";
    },
  });

  const updateProductCallback = async ({
    id,
    name,
    description,
    price,
    quantityAvailable,
    categoryId,
  }) => {
    const { data } = await axios.put("http://localhost:8080/product", {
      id,
      name,
      description,
      price,
      quantityAvailable,
      categoryId,
    });
    return data;
  };

  const updateProduct = useMutation(updateProductCallback);

  const deleteProductCallback = async (id) => {
    const { data } = await axios.delete("http://localhost:8080/product", {
      params: {
        id: id,
      },
    });
    return data;
  };

  const deleteProduct = useMutation(deleteProductCallback);

  return {
    data,
    isLoading,
    refetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};

export default useProduct;
