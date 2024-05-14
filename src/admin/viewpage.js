import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  VStack,
  Text,
  IconButton,
  // useColorMode,
} from "@chakra-ui/react";
import { HiMenu, HiX } from "react-icons/hi";

const AdminPage = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  // const { colorMode, toggleColorMode } = useColorMode();

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <Flex>
      {showSidebar && (
        <Box
          // bg={colorMode === "light" ? "gray.200" : "gray.700"}
          w="250px"
          minH="100vh"
          p="4"
          boxShadow="md"
        >
          <VStack spacing="4" align="start">
            <Text fontSize="xl" fontWeight="bold">
              Admin Panel
            </Text>
            <Link to="/getorders">
              <Text>Orders</Text>
            </Link>
            <Link to="/adminusers">
              <Text>Users</Text>
            </Link>
            <Link to="/adminproducts">
              <Text>Products</Text>
            </Link>
            <Link to="/adminoffers">
              <Text>Offers</Text>
            </Link>
            <Link to="/adminnotifications">
              <Text>Notifications</Text>
            </Link>
          </VStack>
        </Box>
      )}
      <Box flex="1" p="4">
        <Flex justify="flex-end" mb="4">
          <IconButton
            aria-label="Toggle Sidebar"
            icon={showSidebar ? <HiX /> : <HiMenu />}
            onClick={handleToggleSidebar}
            mr="2"
          />
        </Flex>
        <Box p="4">
          <Text fontSize="xl" fontWeight="bold" mb="4">
            Welcome to Admin Panel
          </Text>
          <Text>
            Here you can manage various aspects of your website or application.
          </Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default AdminPage;
