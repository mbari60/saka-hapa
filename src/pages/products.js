import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Image,
  Heading,
  Text,
  Button,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import { api } from "../utils/utils";

const ProductsPage = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const toast = useToast();

  useEffect(() => {
    // Fetch products
    api
      .get("/products")
      .then((response) => {
        setProducts(response.data);

        // Extract unique categories from products
        const uniqueCategories = Array.from(
          new Set(response.data.map((product) => product.category))
        );
        setCategories(uniqueCategories);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  // Filter products by search term and selected category
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!selectedCategory || product.category === selectedCategory)
  );

  // Function to handle adding product to cart
  const handleAddToCart = (product) => {
    addToCart(product);
    toast({
      title: `${product.name} added to cart.`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <div>
      <Flex justifyContent="space-between" alignItems="center" mb={8}>
        <Heading as="h1" size="xl" mb={4}>
          Products
        </Heading>
        <Box flex="1" ml={4}>
          <Input
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
        <Box flex="1" ml={4}>
          <Select
            placeholder="Filter by category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </Box>
      </Flex>
      <Flex flexWrap="wrap" justifyContent="center" gap={8}>
        {filteredProducts.map((product) => (
          <Box
            key={product.id}
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="lg"
            style={{ height: "450px" }}
          >
            <Image
              src={product.image_url}
              alt={product.name}
              objectFit="cover"
              style={{ height: "200px" }}
            />
            <Box p="6">
              <Heading as="h2" size="md" mb={2}>
                {product.name}
              </Heading>
              <Text mb={4}>{product.description}</Text>
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                Ksh.{product.price}
              </Text>
              {product.insta_url && (
                <Box mb={4}>
                  <Button
                    colorScheme="teal"
                    as="a"
                    href={product.insta_url}
                    target="_blank"
                    rel="noreferrer"
                    size="sm" 
                    whiteSpace="nowrap" 
                    overflow="hidden" 
                    textOverflow="ellipsis"
                  >
                    View on Instagram
                  </Button>
                </Box>
              )}
              <Button
                colorScheme="teal"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </Button>
            </Box>
          </Box>
        ))}
      </Flex>
    </div>
  );
};

export default ProductsPage;
