import { useEffect, useState } from "react";
import { api } from "../utils/utils";
import {
  Box,
  Text,
  Image,
  Flex,
  Spinner,
  Icon,
  Center,
  VStack,
  Grid,
  GridItem,
  useToast,
} from "@chakra-ui/react";
import { FaClock } from "react-icons/fa";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const toast = useToast();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/notifications");
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setError("Failed to fetch notifications. Please try again later.");
    } finally {
      setIsLoading(false);
    }
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
      {error && (
        <Center>
          <Text color="red.500">{error}</Text>
        </Center>
      )}
      {notifications.map((notification) => (
        <GridItem key={notification.id}>
          <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="lg"
          >
            <Image src={notification.image_url} alt="Notification" />
            <Box p={4}>
              <VStack align="stretch" spacing={4}>
                <Flex alignItems="center" justifyContent="space-between">
                  <Text fontSize="sm" color="gray.500">
                    <Icon as={FaClock} mr={1} />
                    {renderTimeSinceCreation(notification.created_at)}
                  </Text>
                </Flex>
                <Text fontSize="xl" fontWeight="semibold">
                  {notification.description}
                </Text>
              </VStack>
            </Box>
          </Box>
        </GridItem>
      ))}
    </Grid>
  );
};

export default Notifications;
