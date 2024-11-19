import {
  Box,
  Button,
  DialogActionTrigger,
  Heading,
  HStack,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { MdDeleteForever, MdModeEditOutline } from "react-icons/md";
import { useProductStore } from "../store/product";
import { toaster } from "@/components/ui/toaster";
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product?.name || "",
    price: product?.price || "",
    image: product?.image || "",
  });

  const { deleteProduct, updateProduct } = useProductStore();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);

    toaster.create({
      title: message,
      type: success ? "success" : "error",
      duration: 1500,
    });

    if (success) {
      console.log("Product deleted successfully");
    }
  };

  const handleUpdateProduct = async () => {
    const { success, message } = await updateProduct(
      product._id,
      updatedProduct
    );

    toaster.create({
      title: message,
      type: success ? "error" : "success",
      duration: 1500,
    });
  };

  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={"48"}
        w={"full"}
        objectFit={"cover"}
      />
      <Box p={4}>
        <Heading as={"h2"} size={"md"} mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight={"bold"} fontSize={"xl"} mb={4}>
          ${product.price}
        </Text>
        <HStack>
          <DialogRoot>
            <DialogTrigger asChild>
              <Button variant="outline" bg={"blue.300"}>
                <MdModeEditOutline color={"black"} />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Product</DialogTitle>
              </DialogHeader>
              <DialogBody>
                <HStack spacing={3}>
                  <Input
                    value={updatedProduct.name}
                    placeholder="Product Name"
                    name="name"
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        name: e.target.value,
                      })
                    }
                  />
                  <Input
                    value={updatedProduct.price}
                    placeholder="Price"
                    name="price"
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        price: e.target.value,
                      })
                    }
                  />
                  <Input
                    value={updatedProduct.image}
                    placeholder="Image URL"
                    name="image"
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        image: e.target.value,
                      })
                    }
                  />
                </HStack>
              </DialogBody>
              <DialogFooter>
                <DialogActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogActionTrigger>
                <DialogActionTrigger asChild>
                  <Button onClick={handleUpdateProduct}>Update</Button>
                </DialogActionTrigger>
              </DialogFooter>
            </DialogContent>
          </DialogRoot>
          <Button
            bg={"red.300"}
            onClick={() => handleDeleteProduct(product._id)}
          >
            <MdDeleteForever />
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
