import React from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  Flex,
  VStack,
  Center,
  SimpleGrid,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const AboutUs = () => {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      rating: 5,
      comment: "Swaggy Sphere provides incredibly fast delivery and great products!",
      imageUrl:
        "https://media.istockphoto.com/id/1445597021/photo/black-man-phone-and-social-media-in-city-reading-text-message-or-communication-on-social.webp?b=1&s=170667a&w=0&k=20&c=-q2G1j_5fzPTNJWahLG2WMJW4PzXGK_cefA1zlEnGI8=",
    },
    {
      id: 2,
      name: "Jane Smith",
      rating: 4,
      comment: "I love the variety of products on Swaggy Sphere and their fast delivery!",
      imageUrl:
        "https://media.istockphoto.com/id/1644128335/photo/cheerful-young-business-professional-using-smart-phone.webp?b=1&s=170667a&w=0&k=20&c=yZA0UT-QlWI_m-EtqyxxHdsHvYhtoucYV0_PbIN63z0=",
    },
    {
      id: 3,
      name: "Michael Johnson",
      rating: 5,
      comment: "The merit points system is a fantastic bonus. Highly recommend Swaggy Sphere!",
      imageUrl:
        "https://media.istockphoto.com/id/1653368125/photo/candid-portrait-of-african-professional-using-laptop.webp?b=1&s=170667a&w=0&k=20&c=JrTVPgpwHI59pPki6kLv-cKfDroWQ1D4G0is7GwoF3g=",
    },
    {
      id: 4,
      name: "Emily Davis",
      rating: 4.5,
      comment: "Impressed with the quality and speed of service at Swaggy Sphere.",
      imageUrl:
        "https://images.unsplash.com/photo-1530785602389-07594beb8b73?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8a2VueWFuJTIwd29tYW58ZW58MHx8MHx8fDA%3D%3D",
    },
  ];

  return (
    <Box p={6}>
      <Heading as="h1" size="2xl" textAlign="center" mb={8}>
        About Swaggy Sphere
      </Heading>
      <Flex flexWrap="wrap" alignItems="center" mb={12}>
        <Box flex="1 1 300px" mr={{ base: 0, md: 6 }}>
          <Image
            src="https://media.istockphoto.com/id/1194709125/photo/grocery-shopping.webp?b=1&s=170667a&w=0&k=20&c=T2e7JQV3QKEPvjikcKh4NaOpIFdksh9_CnesPd4QIfc="
            alt="Swaggy Sphere"
            w="100%"
            h="auto"
            borderRadius="md"
          />
        </Box>
        <VStack flex="1 1 400px" alignItems="flex-start">
          <Text fontSize="xl" textAlign="center" mb={6}>
            Swaggy Sphere is your go-to destination for a seamless and speedy
            shopping experience. We understand the importance of getting the
            products you need quickly, and we are committed to making that
            process as smooth and enjoyable as possible.
          </Text>
          <br />
          <br />
          <br />
          <Text fontSize="xl" textAlign="center" mb={6}>
            Our mission is to provide high-quality products with delivery within
            24 hours. We offer a merit point system for every successful
            purchase, allowing you to redeem points for cash at different times
            of the year. Plus, enjoy random bonus offers for extra value!
          </Text>
        </VStack>
      </Flex>
      <Heading as="h2" size="xl" textAlign="center" mb={6}>
        Testimonials
      </Heading>
      <Slide duration={3000} transitionDuration={500} arrows={false}>
        {testimonials.map((testimonial) => (
          <Box key={testimonial.id}>
            <Center mb={8}>
              <Box
                bg="white"
                p={6}
                borderRadius="md"
                boxShadow="md"
                maxW="xl"
                w="100%"
              >
                <Flex alignItems="center" mb={4}>
                  <Image
                    src={testimonial.imageUrl}
                    alt={testimonial.name}
                    boxSize="80px"
                    borderRadius="full"
                    mr={4}
                  />
                  <VStack alignItems="flex-start">
                    <Heading as="h3" size="md">
                      {testimonial.name}
                    </Heading>
                    <Flex alignItems="center">
                      {[...Array(Math.round(testimonial.rating))].map(
                        (_, i) => (
                          <FaStar key={i} color="yellow" />
                        )
                      )}
                    </Flex>
                  </VStack>
                </Flex>
                <Text>{testimonial.comment}</Text>
              </Box>
            </Center>
          </Box>
        ))}
      </Slide>
      <Heading as="h2" size="xl" textAlign="center" mb={6}>
        Our Services
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={8}>
        <ServiceCard
          title="Fast Delivery"
          description="Get your products delivered within 24 hours of purchase."
        />
        <ServiceCard
          title="Merit Points"
          description="Earn merit points with every purchase and redeem them for cash at different times of the year."
        />
        <ServiceCard
          title="Bonus Offers"
          description="Enjoy random bonus offers for less prices with swaggy sphere"
        />
        <ServiceCard
          title="Customer Support"
          description="Our team is here to help you with any inquiries or issues you may have."
        />
      </SimpleGrid>
    </Box>
  );
};

const ServiceCard = ({ title, description }) => {
  return (
    <Box p={6} bg="gray.100" borderRadius="md" boxShadow="md">
      <Heading as="h3" size="lg" mb={4} textAlign="center">
        {title}
      </Heading>
      <Text textAlign="center">{description}</Text>
    </Box>
  );
};

export default AboutUs;
