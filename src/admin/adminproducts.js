import React, { useState, useEffect } from "react";
import { api } from "../utils/utils";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Button,
  Flex,
  Spacer,
  useToast,
} from "@chakra-ui/react";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const toast = useToast();

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Optional: Show error toast
        toast({
          title: "Error",
          description: "Failed to fetch products.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchProducts();
  }, []);

  // Handle changes in product details
  const handleProductChange = (id, field, value) => {
    const updatedProducts = products.map((product) => {
      if (product.id === id) {
        return { ...product, [field]: value };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  // Save changes to a product
  const saveProductChanges = async (id) => {
    const productToUpdate = products.find((product) => product.id === id);
    try {
      await api.put(`products/${id}`, productToUpdate);
      // Optional: Show success toast
      toast({
        title: "Success",
        description: "Product updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error updating product:", error);
      // Optional: Show error toast
      toast({
        title: "Error",
        description: "Failed to update product.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Delete a product
  const deleteProduct = async (id) => {
    try {
      await api.delete(`products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
      // Optional: Show success toast
      toast({
        title: "Success",
        description: "Product deleted successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      // Optional: Show error toast
      toast({
        title: "Error",
        description: "Failed to delete product.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex direction="column" p={4}>
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th>Price</Th>
            <Th>Category</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product) => (
            <Tr key={product.id}>
              <Td>{product.id}</Td>
              <Td>
                <Input
                  type="text"
                  value={product.name}
                  onChange={(e) =>
                    handleProductChange(product.id, "name", e.target.value)
                  }
                />
              </Td>
              <Td>
                <Input
                  type="text"
                  value={product.description}
                  onChange={(e) =>
                    handleProductChange(
                      product.id,
                      "description",
                      e.target.value
                    )
                  }
                />
              </Td>
              <Td>
                <Input
                  type="number"
                  value={product.price}
                  onChange={(e) =>
                    handleProductChange(product.id, "price", e.target.value)
                  }
                />
              </Td>
              <Td>
                <Input
                  type="text"
                  value={product.category}
                  onChange={(e) =>
                    handleProductChange(product.id, "category", e.target.value)
                  }
                />
              </Td>
              <Td>
                <Button onClick={() => saveProductChanges(product.id)}>
                  Save
                </Button>
                <Button
                  colorScheme="red"
                  ml={2}
                  onClick={() => deleteProduct(product.id)}
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  );
};

export default AdminProducts;
