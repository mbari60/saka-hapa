import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Flex, Box, Text, Link as ChakraLink } from "@chakra-ui/react";
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaWhatsapp,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  const { pathname } = useLocation();
  const excludes = [
    "/login",
    "/signup",
    "/forgot-password",
    "/reset",
    "/dashboard",
  ];

  if (excludes.some((excludePath) => pathname.startsWith(excludePath)))
    return null;

  return (
    <footer bg="blue.200" width="100%">
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        maxW="full"
        mx="auto"
        px={4}
        bg="blue.200"
        color="white"
        p="4"
        flexWrap="wrap"
      >
        {/* Social Icons */}
        <Flex spaceX="2" flex={{ base: "auto", md: "initial" }}>
          <Link to="#" className="text-white hover:text-gray-400">
            <FaInstagram size={24} />
          </Link>
          <Link to="#" className="text-white hover:text-gray-400">
            <FaFacebook size={24} />
          </Link>
          <Link to="#" className="text-white hover:text-gray-400">
            <FaLinkedin size={24} />
          </Link>
          <Link to="#" className="text-white hover:text-gray-400">
            <FaWhatsapp size={24} />
          </Link>
          <Link to="#" className="text-white hover:text-gray-400">
            <FaYoutube size={24} />
          </Link>
          <Link to="#" className="text-white hover:text-gray-400">
            <FaTwitter size={24} />
          </Link>
        </Flex>
        <Box
          textAlign={{ base: "center", md: "left" }}
          mt={{ base: 4, md: 0 }}
          color="black"
          flex={{ base: "auto", md: "initial" }}
        >
          <Text mb={2}>Stay Connected:</Text>
          <Flex flexWrap="wrap" gap="4">
            <NavLink to={"/contact"}>Contact us</NavLink>
            <NavLink to={"/feedback"}>Feedback</NavLink>
            <NavLink to={"/signup"}>Join us</NavLink>
            <ChakraLink href="#" _hover={{ color: "gray.400" }}>
              Privacy
            </ChakraLink>
            <ChakraLink href="/about-us" _hover={{ color: "gray.400" }}>
              About us
            </ChakraLink>
          </Flex>
          <Box mt={4}>
            <Text fontSize="sm">
              For support or inquiries, call us at: <br />
              <ChakraLink href="tel:+254791816103" color="black.300">
              <br/>
                +254791816103
              </ChakraLink>
            </Text>
          </Box>
        </Box>
        <Box
          textAlign={{ base: "center", md: "right" }}
          mt={{ base: 4, md: 0 }}
          color="black"
          flex={{ base: "auto", md: "initial" }}
        >
          <Text>
            &copy; {new Date().getFullYear()} All Rights Reserved <br />
            <br />
            <ChakraLink href="/" color="black.300" ml={1}>
              Swaggy sphere
            </ChakraLink>
          </Text>
        </Box>
      </Flex>
    </footer>
  );
};

export default Footer;
