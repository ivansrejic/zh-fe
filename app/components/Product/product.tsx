import useProduct from "@/app/hooks/useProduct";
import { Button, Card, CardBody } from "@nextui-org/react";

type ProductTypes = {
  id: string;
  name: string;
  price: number;
  quantityAvailable: number;
  deleteProduct: any;
  onEdit: () => void;
};

const Product = ({
  id,
  name,
  price,
  quantityAvailable,
  deleteProduct,
  onEdit,
}: ProductTypes) => {
  const { refetchProducts } = useProduct();

  const handleDelete: any = async () => {
    await deleteProduct.mutateAsync(id);
    refetchProducts();
  };
  return (
    <Card
      className="border-none bg-background/60 dark:bg-default-100/50 w-[210px]"
      shadow="md"
    >
      <CardBody className="flex flex-col justify-between">
        <div className="flex flex-col">
          <div className="mb-2">
            <p className=" text-blue-500 text-xl">{name}</p>
          </div>
          <div>
            <p>
              $: <span className="text-big b">{price}</span>
            </p>
          </div>
          <div>
            <p>
              Quantity: <span className="text-big b">{quantityAvailable}</span>
            </p>
          </div>
        </div>
        <div className=" flex gap-2 mt-5">
          <Button onClick={onEdit}>Edit</Button>
          <Button color="danger" variant="bordered" onPress={handleDelete}>
            Delete
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default Product;
