import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import { useEffect } from "react";
import ProductCard from "../compon/ProductCard";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, products.message]);

  return (
    <Container w={"full"}>
      <VStack borderSpacing={8}>
        <Text
          fontSize={"30px"}
          fontWeight={"bold"}
          bg={"linear-gradient(to right, #06B6D4,#3B82F6)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Products 🚀
        </Text>
        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          padding={"20px"}
          gap={"30px"}
          w={"4/5"}
        >
          {products.message && products.message.length > 0 ? (
            products.message.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <Text
              fontSize={"xl"}
              textAlign={"center"}
              fontWeight={"bold"}
              color={"gray.500"}
            >
              No Products Found 😢
              <Link to={"/create"}>
                <Text
                  as={"span"}
                  color={"blue.500"}
                  _hover={{ textDecoration: "underline" }}
                >
                  Ceate A Product
                </Text>
              </Link>
            </Text>
          )}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default HomePage;
