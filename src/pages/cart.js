import React, { useState , useContext} from "react";
import { AuthContext } from "../context/authcontext"; 
import {
  Box,
  Flex,
  Image,
  Heading,
  Text,
  Button,
  Input,
  Spacer,
  Alert,
  AlertIcon,
  useToast,
} from "@chakra-ui/react";
import { api } from "../utils/utils";

const Cart = ({ cart, removeFromCart }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const toast = useToast()

  const [quantities, setQuantities] = useState(
    cart.reduce((acc, product) => {
      acc[product.id] = 1;
      return acc;
    }, {})
  );
  const [isLoading, setIsLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null);

  const handleQuantityChange = (event, productId) => {
    const value = parseInt(event.target.value);
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: value,
    }));
  };

  const handleIncreaseQuantity = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: prevQuantities[productId] + 1,
    }));
  };

  const handleDecreaseQuantity = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max(prevQuantities[productId] - 1, 1),
    }));
  };

  const totalPrice = cart.reduce(
    (acc, product) => acc + product.price * quantities[product.id],
    0
  );

  const handlePlaceOrder = () => {
    if (!isAuthenticated) {
      toast({
        title: "Please log in to make a purchase.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setIsLoading(true);

    // Create an array of order items
    const orderItems = Object.keys(quantities).map((productId) => ({
      product_id: parseInt(productId),
      quantity: quantities[productId],
    }));

    // Send order items to the backend
    api
      .post("/orders", { order_items: orderItems })
      .then((response) => {
        console.log("Order placed successfully:", response.data);
        setOrderStatus({
          type: "success",
          message: "Order placed successfully",
        });
        toast({
          title: "order placed succesfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setIsLoading(false);
        // Clear the cart after placing the order
        // clearCart();
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        setOrderStatus({
          type: "error",
          message: "Error placing order. Please try again later.",
        });
         toast({
          title: "failed to place order",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        setIsLoading(false);
      });
  };

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={8}>
        Shopping Cart
      </Heading>
      {cart.map((product) => (
        <Box
          key={product.id}
          maxW="xl"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="lg"
          mb={4}
        >
          <Flex p={4} direction={{ base: "column", md: "row" }}>
            <Image src={product.image_url} alt={product.name} boxSize="200px" />
            <Spacer />
            <Box flex="1" ml={{ base: 0, md: 4 }}>
              <Heading as="h2" size="md" mb={2}>
                {product.name}
              </Heading>
              <Text mb={4}>{product.description}</Text>
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                Ksh.{product.price * quantities[product.id]}
              </Text>
              <Flex alignItems="center" mb={4}>
                <Button
                  colorScheme="blue"
                  onClick={() => handleDecreaseQuantity(product.id)}
                >
                  -
                </Button>
                <Input
                  type="number"
                  value={quantities[product.id]}
                  onChange={(e) => handleQuantityChange(e, product.id)}
                  min={1}
                  w="60px"
                  mx={2}
                />
                <Button
                  colorScheme="blue"
                  onClick={() => handleIncreaseQuantity(product.id)}
                >
                  +
                </Button>
                <Spacer />
                <Button
                  colorScheme="red"
                  onClick={() => removeFromCart(product)}
                  ml={{ base: 0, md: 4 }}
                >
                  Remove
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Box>
      ))}
      <Flex align="center" justify="flex-end">
        <Text fontSize="lg" fontWeight="bold" mr={4}>
          Total Price: Ksh.{totalPrice}
        </Text>
        {orderStatus && (
          <Alert status={orderStatus.type} mr={4}>
            <AlertIcon />
            {orderStatus.message}
          </Alert>
        )}
        <Button
          colorScheme="green"
          onClick={handlePlaceOrder}
          isLoading={isLoading}
        >
          {isLoading ? "Placing Order" : "Place Order"}
        </Button>
      </Flex>
    </Box>
  );
};

export default Cart;
