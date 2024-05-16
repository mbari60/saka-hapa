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
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isEditing, setIsEditing] = useState({});
  const [newProductModalOpen, setNewProductModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    image_url: "",
    insta_url:"",
    rating: 1,
  });
  const [searchName, setSearchName] = useState("");
  const [searchId, setSearchId] = useState("");
  const toast = useToast();

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("products");
        setProducts(response.data);
        setFilteredProducts(response.data);
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

  // Toggle editing mode for a product
  const toggleEditing = (id) => {
    setIsEditing((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
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
    toggleEditing(id);
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

  // Handle changes in new product form
  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add a new product
  const addProduct = async () => {
    try {
      await api.post("products", newProduct);
      setNewProduct({
        name: "",
        description: "",
        price: 0,
        category: "",
        image_url: "",
        insta_url: "",
        rating: 1,
      });
      setNewProductModalOpen(false);
      // Optional: Show success toast
      toast({
        title: "Success",
        description: "Product added successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error adding product:", error);
      // Optional: Show error toast
      toast({
        title: "Error",
        description: "Failed to add product.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Filter products by name and id
  useEffect(() => {
    const filteredByName = products.filter((product) =>
      product.name.toLowerCase().includes(searchName.toLowerCase())
    );
    const filteredById = products.filter(
      (product) => product.id.toString() === searchId
    );
    if (searchName !== "") {
      setFilteredProducts(filteredByName);
    } else if (searchId !== "") {
      setFilteredProducts(filteredById);
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchName, searchId]);

  return (
    <Flex direction="column" p={4}>
      <Button onClick={() => setNewProductModalOpen(true)}>Add Product</Button>
      <Flex mt={4}>
        <Input
          placeholder="Search by Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <Input
          ml={2}
          placeholder="Search by ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
      </Flex>
      <Table variant="striped" colorScheme="gray" mt={4}>
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
          {filteredProducts.map((product) => (
            <Tr key={product.id}>
              <Td>{product.id}</Td>
              <Td>
                {isEditing[product.id] ? (
                  <Input
                    type="text"
                    value={product.name}
                    onChange={(e) =>
                      handleProductChange(product.id, "name", e.target.value)
                    }
                  />
                ) : (
                  product.name
                )}
              </Td>
              <Td>
                {isEditing[product.id] ? (
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
                ) : (
                  product.description
                )}
              </Td>
              <Td>
                {isEditing[product.id] ? (
                  <Input
                    type="number"
                    value={product.price}
                    onChange={(e) =>
                      handleProductChange(product.id, "price", e.target.value)
                    }
                  />
                ) : (
                  product.price
                )}
              </Td>
              <Td>
                {isEditing[product.id] ? (
                  <Input
                    type="text"
                    value={product.category}
                    onChange={(e) =>
                      handleProductChange(
                        product.id,
                        "category",
                        e.target.value
                      )
                    }
                  />
                ) : (
                  product.category
                )}
              </Td>
              <Td>
                {isEditing[product.id] ? (
                  <Button onClick={() => saveProductChanges(product.id)}>
                    Save
                  </Button>
                ) : (
                  <Button onClick={() => toggleEditing(product.id)}>
                    Edit
                  </Button>
                )}
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
      {/* New Product Modal */}
      <Modal
        isOpen={newProductModalOpen}
        onClose={() => setNewProductModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleNewProductChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                name="description"
                value={newProduct.description}
                onChange={handleNewProductChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Price</FormLabel>
              <Input
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleNewProductChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Category</FormLabel>
              <Input
                type="text"
                name="category"
                value={newProduct.category}
                onChange={handleNewProductChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Image URL</FormLabel>
              <Input
                type="text"
                name="image_url"
                value={newProduct.image_url}
                onChange={handleNewProductChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>insta_url</FormLabel>
              <Input
                type="text"
                name="insta_url"
                value={newProduct.insta_url}
                onChange={handleNewProductChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Rating</FormLabel>
              <Input
                type="number"
                name="rating"
                placeholder="Number between 1 to 5"
                value={newProduct.rating}
                onChange={handleNewProductChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={addProduct}>
              Add Product
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default AdminProducts;
