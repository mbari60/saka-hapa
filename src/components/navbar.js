import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Image,
  Button,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  useColorMode,
  IconButton,
} from "@chakra-ui/react";

import {
  AiOutlineBell,
  AiOutlineShoppingCart,
} from "react-icons/ai";

import { ChevronDownIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box bg="blue.200" color="white" p="4">
      <Flex flexWrap="wrap" align="center">
        <Image
          src="https://images.template.net/wp-content/uploads/2014/09/Zenith-Fitness-Logo.jpg"
          alt="Gym Logo"
          boxSize={{ base: "30px", md: "40px" }}
          mr="4"
        />
        <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" mr="auto">
          Saka-Hapa
        </Text>
        <Box ml="auto" mt={{ base: 4, md: 0 }} display="flex">
          <Button variant="ghost" as={Link} to="/home">
            Home
          </Button>
          <Button variant="ghost" as={Link} to="/products">
            Products
          </Button>
          <IconButton
            aria-label="Cart"
            icon={<AiOutlineShoppingCart />}
            size="md"
            variant="ghost"
            as={Link}
            to="/cart"
          />
          <Button variant="ghost" as={Link} to="/offers">
            Offers
          </Button>
          <Button variant="ghost" as={Link} to="/about-us">
            About Us
          </Button>
          <Button variant="ghost" as={Link} to="/contact">
            Contact Us
          </Button>
          <Button variant="ghost" as={Link} to="/feedback">
            Feedback
          </Button>
          <IconButton
            aria-label="Notifications"
            icon={<AiOutlineBell />}
            size="md"
            variant="ghost"
            as={Link}
            to="/notifications"
          />
        </Box>
        <IconButton
          aria-label="Toggle Color Mode"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          size="sm"
          ml={2}
          mr={{ base: 0, md: 2 }}
        />
        <Menu mr={{ base: 0, md: 2 }}>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            bg="black"
            color="white"
            display={{ base: "none", md: "block" }}
          >
            <Avatar size="sm" name="User" />
          </MenuButton>
          <MenuList>
            <MenuItem>
              <Link
                to="/profile"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Profile
              </Link>
            </MenuItem>
            <MenuItem>
              <Button variant="link" color="red.500">
                Logout
              </Button>
            </MenuItem>
          </MenuList>
        </Menu>
        <Box display={{ base: "none", md: "flex" }} alignItems="center">
          <Button colorScheme="black" mr="2">
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Login
            </Link>
          </Button>
          <Button colorScheme="black" mr="2">
            <Link
              to="/signup"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Create Account
            </Link>
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
