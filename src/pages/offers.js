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
  Center,
  VStack,
  HStack,
  Grid,
  GridItem,
  useToast,
} from "@chakra-ui/react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

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
      await api.post("/offerbookings", { offer_id: offerId });
      // Optionally, you can handle success or refresh the offers after purchase
    } catch (error) {
       toast({
         title: error.response.data.message,
         status: "error",
         duration: 2000,
         isClosable: true,
       });

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
    const diffInHours = Math.floor(
      (currentTime - createdDate) / (1000 * 60 * 60)
    );
    return `${diffInHours} hours ago`;
  };

  return (
    <Grid
      templateColumns={{
        sm: "1fr",
        md: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
      }}
      gap={4}
    >
      {isLoading && <Spinner size="lg" />}
      {offers.map((offer) => (
        <GridItem key={offer.id}>
          <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="lg"
          >
            <Image src={offer.image_url} alt={offer.offer_name} />
            <Box p={4}>
              <VStack align="stretch" spacing={4}>
                <Text fontSize="xl" fontWeight="semibold">
                  {offer.offer_name}
                </Text>
                <Text color="gray.500">{offer.description}</Text>
                <Flex alignItems="center" justifyContent="space-between">
                  <Text color="gray.500" fontSize="sm">
                    {renderTimeSinceCreation(offer.created_at)}
                  </Text>
                  <HStack spacing={1}>{renderStars(offer.rating)}</HStack>
                </Flex>
                <Flex alignItems="center" justifyContent="space-between">
                  <Text fontSize="2xl" fontWeight="bold">
                    Ksh. {offer.offer_price}
                  </Text>
                  <Text color="gray.500" fontSize="sm">
                    Remaining Slots: {offer.slots_limit}
                  </Text>
                </Flex>
                <Center>
                  <Button
                    colorScheme="blue"
                    onClick={() => handlePurchase(offer.id)}
                    isLoading={isLoading}
                    disabled={offer.slots_limit === 0}
                  >
                    {offer.slots_limit === 0 ? "Sold Out" : "Buy Now"}
                  </Button>
                </Center>
              </VStack>
            </Box>
          </Box>
        </GridItem>
      ))}
    </Grid>
  );
};

export default Offers;
