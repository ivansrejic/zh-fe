import useProduct from "@/app/hooks/useProduct";
import useCategories from "@/app/hooks/useCategories";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

type modalPropTypes = {
  isOpen: boolean;
  onOpen: any;
  onClose: any;
  initialProduct?: {
    id?: string;
    name: string;
    description: string;
    price: number;
    quantityAvailable: number;
    categoryId: number;
  } | null;
};
type productType = {
  id?: string;
  name: string;
  description: string;
  price: number;
  quantityAvailable: number;
  categoryId: number;
};
type categoryType = {
  id: number;
  name: string;
  description: string;
};

const CreateProductModal = ({
  isOpen,
  onOpen,
  onClose,
  initialProduct,
}: modalPropTypes) => {
  const [product, setProduct] = useState<productType>({
    name: "",
    description: "",
    price: 0,
    quantityAvailable: 0,
    categoryId: 0,
  });
  const { createProduct, refetchProducts, updateProduct } = useProduct();
  const { data, isLoading } = useCategories();

  useEffect(() => {
    if (initialProduct) {
      setProduct(initialProduct);
    }
  }, [initialProduct]);

  if (isLoading) return <Spinner />;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (initialProduct) {
      await updateProduct.mutateAsync({ id: initialProduct.id, ...product });
    } else {
      await createProduct.mutateAsync(product);
    }
    setProduct({
      name: "",
      description: "",
      price: 0,
      quantityAvailable: 0,
      categoryId: 0,
    });
    refetchProducts();
    onClose();
  };
  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onClose={onClose}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
    >
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
          <ModalBody>
            <div className="my-5">
              <div>
                <label>Name</label>
                <Input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Description</label>
                <Input
                  type="text"
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Price</label>
                <Input
                  type="number"
                  name="price"
                  value={product.price === 0 ? "" : product.price.toString()}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Quantity</label>
                <Input
                  type="number"
                  name="quantityAvailable"
                  value={
                    product.quantityAvailable === 0
                      ? ""
                      : product.quantityAvailable.toString()
                  }
                  onChange={handleChange}
                />
              </div>
              <div className="pt-4">
                <Select
                  label="Select Category"
                  className="max-w-xs"
                  onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                    setProduct({
                      ...product,
                      categoryId: parseInt(event.target.value),
                    })
                  }
                  value={product.categoryId}
                >
                  {data.map((category: categoryType) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
            <Button color="primary" onClick={handleSubmit}>
              {initialProduct ? "Update Product" : "Add Product"}
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};

export default CreateProductModal;
