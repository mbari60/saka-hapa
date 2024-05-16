import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Image,
  Flex,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";
import "react-slideshow-image/dist/styles.css";

const Home = () => {
  return (
    <Box p={6}>
      <Heading as="h1" size="2xl" textAlign="center" mb={8}>
        Welcome to Swaggy Sphere
      </Heading>

      <Box
        flex="1"
        display="flex"
        flexDirection="column"
        alignItems="center"
        mb={{ base: 8, md: 0, lg: 0 }}
        mx={{ base: 0, md: 4 }}
      >
        <Image
          src="https://images.unsplash.com/photo-1597109581777-c566de89ca08?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGVsZWN0cm9uaWMlMjBzaG9wfGVufDB8fDB8fHww"
          alt="Slide 1"
          borderRadius="md"
          mb={4}
        />
        <Text fontSize="lg" textAlign="center" fontStyle="bold">
          Our Aim as Swaggy Sphere
        </Text>
        <br />
        <Text fontSize="sm" textAlign="center" fontStyle="itallic">
          We are aimed at delivering quality products at the expected time and ensure that our customers are confident about getting the products that they require 
        </Text>
      </Box>
      <br/>
      <br/>
      <hr/>
      <br/>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 4 }}
        gap="6"
        mx="auto"
        maxW="1200px"
      >
        <Box p="4" borderWidth="1px" borderRadius="lg" boxShadow="md">
          <Heading as="h2" fontSize="xl" mb="4">
            New Arrivals
          </Heading>
          <Text fontSize="md" mb="4">
            Discover the latest trends and must-have items.
          </Text>
          <Link to="/products">
            <Button colorScheme="blue">Shop Now</Button>
          </Link>
        </Box>
        <Box p="4" borderWidth="1px" borderRadius="lg" boxShadow="md">
          <Heading as="h2" fontSize="xl" mb="4">
            Best Sellers
          </Heading>
          <Text fontSize="md" mb="4">
            Explore our top-rated products loved by thousands of customers.
          </Text>
          <Link to="/products">
            <Button colorScheme="blue">Discover More</Button>
          </Link>
        </Box>
        <Box p="4" borderWidth="1px" borderRadius="lg" boxShadow="md">
          <Heading as="h2" fontSize="xl" mb="4">
            Exclusive Deals
          </Heading>
          <Text fontSize="md" mb="4">
            Unlock special offers and discounts on your favorite items.
          </Text>
          <Link to="/offers">
            <Button colorScheme="blue">Grab Yours</Button>
          </Link>
        </Box>
        <Box p="4" borderWidth="1px" borderRadius="lg" boxShadow="md">
          <Heading as="h2" fontSize="xl" mb="4">
            Limited Edition
          </Heading>
          <Text fontSize="md" mb="4">
            Discover unique and limited-edition pieces you won't find anywhere
            else.
          </Text>
          <Link to="/offers">
            <Button colorScheme="blue">Explore Now</Button>
          </Link>
        </Box>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} my={10}>
        <Box
          textAlign="center"
          boxShadow="md"
          borderRadius="md"
          overflow="hidden"
        >
          <Image
            src="https://images.unsplash.com/photo-1548695607-9c73430ba065?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGVsaXZlcnl8ZW58MHx8MHx8fDA%3D"
            alt="Transport Image"
            objectFit="cover"
            width="50%"
            height={{ base: "200px", md: "250px" }}
            mx="auto"
          />
          <Text fontSize="lg" p={4}>
            Fast and Reliable delivery countrywide
          </Text>
        </Box>
        <Box
          textAlign="center"
          boxShadow="md"
          borderRadius="md"
          overflow="hidden"
        >
          <Image
            src="https://media.istockphoto.com/id/1287632115/photo/were-the-best-when-it-comes-to-fast-delivery.webp?b=1&s=170667a&w=0&k=20&c=t5UZvyNoHeK_eTV-eL9BfxFOHVN-L3RJRW2xMXmfyuE="
            alt="Delivery Image"
            objectFit="cover"
            width="50%"
            height={{ base: "200px", md: "250px" }}
            mx="auto"
          />
          <Text fontSize="lg" p={4}>
            Hassle-Free Returns and Exchanges
          </Text>
        </Box>
      </SimpleGrid>
      <Flex
        justify="center"
        align="center"
        flexDirection={{ base: "column", md: "row" }}
        my="10"
      >
        <Box
          flex="1"
          textAlign="center"
          mb={{ base: 8, md: 0, lg: 0 }}
          mx={{ base: 0, md: 4 }}
        >
          <Image
            src="https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YWZyaWNhbiUyMGRlbGl2ZXJ5fGVufDB8fDB8fHww"
            alt="Customer 1"
            borderRadius="full"
            mb={2}
            w="100px"
            h="100px"
          />
          <Text fontSize="md">John - "Great experience!"</Text>
        </Box>
        <Box
          flex="1"
          textAlign="center"
          mb={{ base: 8, md: 0, lg: 0 }}
          mx={{ base: 0, md: 4 }}
        >
          <Image
            src="https://media.istockphoto.com/id/1366824814/photo/daughter-watches-unrecognizable-dad-receive-mail-from-unrecognizable-delivery-person.webp?b=1&s=170667a&w=0&k=20&c=wmI-VS80yja22U4z7z84wpA40xYCVxRHiSNYgaQYmm8="
            alt="Customer 2"
            borderRadius="full"
            mb={2}
            w="100px"
            h="100px"
          />
          <Text fontSize="md">Sarah - "Love the products!"</Text>
        </Box>
        <Box
          flex="1"
          textAlign="center"
          mb={{ base: 8, md: 0, lg: 0 }}
          mx={{ base: 0, md: 4 }}
        >
          <Image
            src="https://media.istockphoto.com/id/482132516/photo/happy-african-young-woman-with-parcel-box-at-home.webp?b=1&s=170667a&w=0&k=20&c=rit0rZMktNObaObT76KIQWpjZdvl7N7KsDWgDKRrYZA="
            alt="Customer 3"
            borderRadius="full"
            mb={2}
            w="100px"
            h="100px"
          />
          <Text fontSize="md">Emma - "Fast delivery!"</Text>
        </Box>
        <Box
          flex="1"
          textAlign="center"
          mb={{ base: 8, md: 0, lg: 0 }}
          mx={{ base: 0, md: 4 }}
        >
          <Image
            src="https://media.istockphoto.com/id/1371301907/photo/friendly-young-man-wearing-denim-shirt.webp?b=1&s=170667a&w=0&k=20&c=uvclBOQrU3gd4_FMwzmTNK1PY4ydO_SlEgELJYj5mVI="
            alt="Customer 4"
            borderRadius="full"
            mb={2}
            w="100px"
            h="100px"
          />
          <Text fontSize="md">David - "Highly recommend!"</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Home;
