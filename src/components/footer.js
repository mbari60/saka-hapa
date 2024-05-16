import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Flex, Box, Text, Link as ChakraLink } from "@chakra-ui/react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import "../index.css";

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
        p={4}
        flexWrap="wrap"
      >
        {/* Social Icons */}
        <Flex
          direction="column"
          align="center"
          mb={4}
          width={{ base: "100%", md: "auto" }}
        >
          <Text mb={2} color="black">
            Stay Connected on Social Media platforms
          </Text>
          <Box
            mb={2}
            textAlign="center"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Link
              to="https://www.instagram.com/swaggy_sphere"
              className="text-white hover:text-gray-400"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <FaInstagram size={24} />
              <Text mt={2} color="black">
                Click to join our Instagram page
              </Text>
            </Link>
          </Box>
          <Box
            mb={2}
            textAlign="center"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Link
              to="https://chat.whatsapp.com/G5ZtqemPVfEC2LVdsZ974O"
              className="text-white hover:text-gray-400"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <FaWhatsapp size={24} />
              <Text mt={2} color="black">
                Click to join WhatsApp Group
              </Text>
            </Link>
          </Box>
        </Flex>

        <Box
          textAlign={{ base: "center", md: "left" }}
          mt={{ base: 4, md: 0 }}
          color="black"
          flex={{ base: "auto", md: "initial" }}
        >
          <Flex
            flexWrap="wrap"
            gap={4}
            justifyContent={{ base: "center", md: "flex-start" }}
          >
            <NavLink to="/feedback">Feedback</NavLink>
            <NavLink to="/signup">Join us</NavLink>
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
                +254791816103
              </ChakraLink>
            </Text>
            <Box mt={4}>
              <Text fontSize="sm">
                Email us at{" "}
                <a
                  href="mailto:kevin.wanjiru600@gmail.com"
                  className="linkbutton"
                >
                  kevin.wanjiru600@gmail.com
                </a>
              </Text>
            </Box>
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
