import { useEffect, useState, useContext } from "react";
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
  useToast,
  SimpleGrid,
} from "@chakra-ui/react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AuthContext } from "../context/authcontext"; // Ensure you import your AuthContext

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [loadingState, setLoadingState] = useState({});
  const { isAuthenticated } = useContext(AuthContext);
  const toast = useToast();

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    setLoadingState((prev) => ({ ...prev, global: true }));
    try {
      const response = await api.get("/offers");
      setOffers(response.data);
    } catch (error) {
      console.error("Error fetching offers:", error);
    } finally {
      setLoadingState((prev) => ({ ...prev, global: false }));
    }
  };

  const handlePurchase = async (offerId) => {
    if (!isAuthenticated) {
      toast({
        title: "Please log in to make a purchase.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    setLoadingState((prev) => ({ ...prev, [offerId]: true }));
    try {
      await api.post("/offerbookings", { offer_id: offerId });
      toast({
        title: "Purchase successful!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      // Optionally, refresh the offers or update the state to reflect the purchase
    } catch (error) {
      toast({
        title: error.response?.data?.message || "Purchase failed.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setLoadingState((prev) => ({ ...prev, [offerId]: false }));
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const starArray = [];

    for (let i = 0; i < fullStars; i++) {
      starArray.push(<Icon as={FaStar} key={i} color="yellow.400" />);
    }

    if (hasHalfStar) {
      starArray.push(
        <Icon as={FaStarHalfAlt} key="half-star" color="yellow.400" />
      );
    }

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
    <Box p={6}>
      {loadingState.global && <Spinner size="lg" />}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} my={10}>
        {offers.map((offer) => (
          <Box
            key={offer.id}
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
                    isLoading={loadingState[offer.id]}
                    disabled={offer.slots_limit === 0}
                  >
                    {offer.slots_limit === 0 ? "Sold Out" : "Buy Now"}
                  </Button>
                </Center>
              </VStack>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Offers;
