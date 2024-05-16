import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Image,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  useColorMode,
  Avatar,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
} from "@chakra-ui/react";

import { AiOutlineBell, AiOutlineShoppingCart } from "react-icons/ai";
import {
  ChevronDownIcon,
  MoonIcon,
  SunIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import { AuthContext } from "../context/authcontext";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [showMenu, setShowMenu] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { logout, isAuthenticated, user } = useContext(AuthContext);
  const isSuperuser = isAuthenticated && user && user.role === "admin";


  const handleMenuItemClick = () => {
    setShowMenu(false); // Close the menu when a link is clicked
    setIsDrawerOpen(false); // Close the drawer when a link is clicked
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Box bg="blue.200" color="white" p="4">
      <Flex flexWrap="wrap" align="center">
        <Image
          src="https://images.template.net/wp-content/uploads/2014/09/Zenith-Fitness-Logo.jpg"
          alt="Logo"
          boxSize={{ base: "30px", md: "40px" }}
          mr="4"
        />
        <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" mr="auto">
          Swaggy-Sphere
        </Text>
        <Box
          ml="auto"
          mt={{ base: 4, md: 0 }}
          display="flex"
          alignItems="center"
        >
          <IconButton
            aria-label="Toggle Menu"
            icon={<HamburgerIcon />}
            onClick={() => setIsDrawerOpen(true)}
            display={{ base: "block", md: "none" }}
            mr="2"
          />
          <Box
            display={{ base: showMenu ? "block" : "none", md: "flex" }}
            alignItems="center"
          >
            <Button
              variant="ghost"
              as={Link}
              to="/home"
              onClick={handleMenuItemClick}
            >
              Home
            </Button>
            <Button
              variant="ghost"
              as={Link}
              to="/products"
              onClick={handleMenuItemClick}
            >
              Products
            </Button>
            <IconButton
              aria-label="Cart"
              icon={<AiOutlineShoppingCart />}
              size="md"
              variant="ghost"
              as={Link}
              to="/cart"
              onClick={handleMenuItemClick}
            />
            <Button
              variant="ghost"
              as={Link}
              to="/offers"
              onClick={handleMenuItemClick}
            >
              Offers
            </Button>
            <Button
              variant="ghost"
              as={Link}
              to="/about-us"
              onClick={handleMenuItemClick}
            >
              About Us
            </Button>
            <Button
              variant="ghost"
              as={Link}
              to="/feedback"
              onClick={handleMenuItemClick}
            >
              Feedback
            </Button>
            <IconButton
              aria-label="Notifications"
              icon={<AiOutlineBell />}
              size="md"
              variant="ghost"
              as={Link}
              to="/notifications"
              onClick={handleMenuItemClick}
            />
            {isSuperuser && (
              <Button
                variant="ghost"
                as={Link}
                to="/adminviews"
                onClick={handleMenuItemClick}
              >
                Admin
              </Button>
            )}
          </Box>
          <IconButton
            aria-label="Toggle Color Mode"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            size="sm"
            ml={{ base: "auto", md: 2 }}
          />
          {isAuthenticated ? (
            <>
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
                      onClick={handleMenuItemClick}
                    >
                      Profile
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Button variant="link" color="red.500" onClick={logout}>
                      Logout
                    </Button>
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <Box display={{ base: "none", md: "flex" }} alignItems="center">
              <Button colorScheme="black" mr="2">
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "inherit" }}
                  onClick={handleMenuItemClick}
                >
                  Login
                </Link>
              </Button>
              <Button colorScheme="black" mr="2">
                <Link
                  to="/signup"
                  style={{ textDecoration: "none", color: "inherit" }}
                  onClick={handleMenuItemClick}
                >
                  Create Account
                </Link>
              </Button>
            </Box>
          )}
        </Box>
      </Flex>
      <Drawer
        isOpen={isDrawerOpen}
        placement="right"
        onClose={handleDrawerClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing="4">
              <Link to="/home" onClick={handleMenuItemClick}>
                Home
              </Link>
              <Link to="/products" onClick={handleMenuItemClick}>
                Products
              </Link>
              <Link to="/cart" onClick={handleMenuItemClick}>
                Cart
              </Link>
              <Link to="/offers" onClick={handleMenuItemClick}>
                Offers
              </Link>
              <Link to="/about-us" onClick={handleMenuItemClick}>
                About Us
              </Link>
              <Link to="/feedback" onClick={handleMenuItemClick}>
                Feedback
              </Link>
              <Link to="/notifications" onClick={handleMenuItemClick}>
                Notifications
              </Link>
              {isSuperuser && (
                <Link to="/adminviews" onClick={handleMenuItemClick}>
                  Admin
                </Link>
              )}
              {isAuthenticated && (
                <>
                  <Link to="/profile" onClick={handleMenuItemClick}>
                    Profile
                  </Link>
                  <Button color="red.500" onClick={logout}>
                    Logout
                  </Button>
                </>
              )}
              {!isAuthenticated && (
                <>
                  <Link to="/" onClick={handleMenuItemClick}>
                    Login
                  </Link>
                  <Link to="/signup" onClick={handleMenuItemClick}>
                    Create Account
                  </Link>
                </>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
