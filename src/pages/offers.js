import React, { useState } from "react";
import { Box, Image, Heading, Text, Button } from "@chakra-ui/react";

const Offers = () => {
  // Example offer data
  const [offers, setOffers] = useState([
    {
      id: 1,
      name: "Special Offer Product",
      image: "https://via.placeholder.com/150",
      description: "This is a special offer product.",
      price: 100,
      capacity: 10,
    },
    // Add more offer items as needed
  ]);

  // Function to handle booking a product
  const handleBookProduct = (productId) => {
    setOffers((prevOffers) =>
      prevOffers.map((offer) =>
        offer.id === productId && offer.capacity > 0
          ? { ...offer, capacity: offer.capacity - 1 }
          : offer
      )
    );
  };

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={8}>
        Special Offers
      </Heading>
      {offers.map((offer) => (
        <Box
          key={offer.id}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="lg"
          mb={4}
          maxWidth="400px" // Adjust the maximum width as needed
        >
          <Image src={offer.image} alt={offer.name} />
          <Box p="6">
            <Heading as="h2" size="md" mb={2}>
              {offer.name}
            </Heading>
            <Text mb={4}>{offer.description}</Text>
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              Price: Ksh.{offer.price}
            </Text>
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              Capacity: {offer.capacity}
            </Text>
            {offer.capacity > 0 ? (
              <Button
                colorScheme="green"
                onClick={() => handleBookProduct(offer.id)}
              >
                Book Now
              </Button>
            ) : (
              <Text color="red" fontWeight="bold">
                Product out of stock
              </Text>
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Offers;
