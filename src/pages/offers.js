import { useEffect, useState } from "react";
import { api } from "../utils/utils";
import {
  Box,
  Text,
  Image,
  Button,
  Flex,
  Spinner,
  Icon,
} from "@chakra-ui/react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/offers");
      setOffers(response.data);
    } catch (error) {
      console.error("Error fetching offers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePurchase = async (offerId) => {
    setIsLoading(true);
    try {
      await api.post("/buyoffer", { offer_id: offerId });
      // Optionally, you can handle success or refresh the offers after purchase
    } catch (error) {
      console.error("Error purchasing offer:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const starArray = [];

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      starArray.push(<Icon as={FaStar} key={i} color="yellow.400" />);
    }

    // Add half star if applicable
    if (hasHalfStar) {
      starArray.push(
        <Icon as={FaStarHalfAlt} key="half-star" color="yellow.400" />
      );
    }

    // Add remaining empty stars
    const remainingStars = 5 - starArray.length;
    for (let i = 0; i < remainingStars; i++) {
      starArray.push(
        <Icon as={FaStar} key={`empty-star-${i}`} color="gray.400" />
      );
    }

    return starArray;
  };

  const renderTimeSinceCreation = (createdAt) => {
    const createdDate = new Date(createdAt);
    const currentTime = new Date();
    const diffInMinutes = Math.floor((currentTime - createdDate) / (1000 * 60));
    return `${diffInMinutes} minutes ago`;
  };

  return (
    <Box>
      {isLoading && <Spinner size="lg" />}
      {offers.map((offer) => (
        <Box
          key={offer.id}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="lg"
          p={4}
          mb={4}
        >
          <Image src={offer.image_url} alt={offer.offer_name} />
          <Box p="6">
            <Box>
              <Text fontSize="xl" fontWeight="semibold" mb={2}>
                {offer.offer_name}
              </Text>
              <Text color="gray.500" mb={2}>
                {offer.description}
              </Text>
              <Flex alignItems="center">
                <Text fontSize="2xl" fontWeight="bold" mr={2}>
                  Ksh. {offer.offer_price}
                </Text>
                {offer.previous_price && (
                  <Text textDecoration="line-through" color="gray.500">
                    Ksh. {offer.previous_price}
                  </Text>
                )}
              </Flex>
            </Box>
            <Flex alignItems="center" justify="space-between">
              <Box>
                <Text color="gray.500" fontSize="sm">
                  Posted {renderTimeSinceCreation(offer.created_at)}
                </Text>
                <Flex>{renderStars(offer.rating)}</Flex>
              </Box>
              <Button
                colorScheme="blue"
                onClick={() => handlePurchase(offer.id)}
                isLoading={isLoading}
                disabled={offer.slots_limit === 0}
              >
                {isLoading ? "Loading..." : "Buy Now"}
              </Button>
            </Flex>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Offers;
