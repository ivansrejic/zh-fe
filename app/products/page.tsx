"use client";
import { randomUUID } from "crypto";
import Header from "../components/Header/header";
import Product from "../components/Product/product";
import { Button, Input, Spinner, useDisclosure } from "@nextui-org/react";
import useProduct from "../hooks/useProduct.js";
import { useState } from "react";
import CreateProductModal from "../components/Header/components/CreateProductModal/createProductModal";

const HomePage = () => {
  const { data, isLoading, deleteProduct, updateProduct } = useProduct();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [initialProduct, setInitialProduct] = useState(null);

  const openEditModal = (product: any) => {
    setInitialProduct(product);
    onOpen();
  };

  if (isLoading) return <Spinner />;

  return (
    <div>
      <Button
        color="primary"
        onClick={() => {
          setInitialProduct(null);
          onOpen();
        }}
        className="mb-5"
      >
        Add product
      </Button>
      <CreateProductModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        initialProduct={initialProduct}
      />
      <div className="flex flex-wrap gap-3">
        {data.map((product: any) => (
          <Product
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            quantityAvailable={product.quantityAvailable}
            deleteProduct={deleteProduct}
            onEdit={() => openEditModal(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
