import React, { useState } from "react";
import {
  Box,
  Flex,
  Image,
  Heading,
  Text,
  Button,
  Input,
} from "@chakra-ui/react";

const Cart = ({ cart, removeFromCart }) => {
  const [quantities, setQuantities] = useState(
    cart.reduce((acc, product) => {
      acc[product.id] = 1;
      return acc;
    }, {})
  );

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
    // Implement place order functionality here
    console.log("Placing order...");
  };

  return (
    <div>
      <Heading as="h1" size="xl" mb={8}>
        Shopping Cart
      </Heading>
      {cart.map((product) => (
        <Box
          key={product.id}
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="lg"
          mb={4}
        >
          <Image src={product.image} alt={product.name} />
          <Box p="6">
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
              <Button
                colorScheme="red"
                onClick={() => removeFromCart(product)}
                ml="auto"
              >
                Remove
              </Button>
            </Flex>
          </Box>
        </Box>
      ))}
      <Flex align="center" justify="flex-end">
        <Text fontSize="lg" fontWeight="bold" mr={4}>
          Total Price: Ksh.{totalPrice}
        </Text>
        <Button colorScheme="green" onClick={handlePlaceOrder}>
          Place Order
        </Button>
      </Flex>
    </div>
  );
};

export default Cart;
