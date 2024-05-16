import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormErrorMessage,
  VStack,
  Heading,
  IconButton,
  InputGroup,
  InputRightElement,
  Grid,
  Text,
  Link as ChakraLink,
  useColorModeValue,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import * as Yup from "yup";
import { api } from "../utils/utils";
import { toast } from "react-hot-toast";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const colorMode = useColorModeValue("black", "white");
  const bgMode = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.300", "gray.600");

  const schema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .required("Phone number is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirm_password: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const handleSubmit = async (values, actions) => {
    try {
      setIsLoading(true);
      const response = await api.post("registration", {
        username: values.username,
        email: values.email,
        phone: values.phone,
        password: values.password,
      });
      console.log(response.data.message);
      toast.success(response.data.message);
      actions.resetForm();
      navigate("/");
      
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Grid h="100vh" placeItems="center">
      <Box
        maxW="xl"
        p="6"
        borderRadius="lg"
        boxShadow="lg"
        bg={bgMode}
        w="100%"
        maxH="80vh"
        overflowY="auto"
      >
        <Text fontSize="xl" textAlign="center" mb="4">
          Already have an account?{" "}
          <ChakraLink as={Link} to="/" color="blue.500">
            login
          </ChakraLink>
        </Text>
        <Heading as="h2" size="lg" mb="6" textAlign="center">
          Sign Up
        </Heading>
        <Formik
          initialValues={{
            username: "",
            email: "",
            phone: "",
            password: "",
            confirm_password: "",
          }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <VStack spacing={4} align="stretch">
                <Field name="username">
                  {({ field }) => (
                    <FormControl
                      isInvalid={errors.username && touched.username}
                      borderColor={borderColor}
                    >
                      <Input {...field} placeholder="Username" color={colorMode} />
                      <FormErrorMessage>{errors.username}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="email">
                  {({ field }) => (
                    <FormControl
                      isInvalid={errors.email && touched.email}
                      borderColor={borderColor}
                    >
                      <Input {...field} placeholder="Email" color={colorMode} />
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="phone">
                  {({ field }) => (
                    <FormControl
                      isInvalid={errors.phone && touched.phone}
                      borderColor={borderColor}
                    >
                      <Input {...field} placeholder="Phone number starting with 07 or 01 or +254" color={colorMode} />
                      <FormErrorMessage>{errors.phone}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="password">
                  {({ field }) => (
                    <FormControl
                      isInvalid={errors.password && touched.password}
                      borderColor={borderColor}
                    >
                      <InputGroup>
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          color={colorMode}
                        />
                        <InputRightElement>
                          <IconButton
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                            variant="ghost"
                            icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                            onClick={handleTogglePassword}
                          />
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="confirm_password">
                  {({ field }) => (
                    <FormControl
                      isInvalid={
                        errors.confirm_password && touched.confirm_password
                      }
                      borderColor={borderColor}
                    >
                      <InputGroup>
                        <Input
                          {...field}
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm Password"
                          color={colorMode}
                        />
                        <InputRightElement>
                          <IconButton
                            aria-label={
                              showConfirmPassword
                                ? "Hide confirm password"
                                : "Show confirm password"
                            }
                            variant="ghost"
                            icon={
                              showConfirmPassword ? (
                                <ViewOffIcon />
                              ) : (
                                <ViewIcon />
                              )
                            }
                            onClick={handleToggleConfirmPassword}
                          />
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>
                        {errors.confirm_password}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Button
                  type="submit"
                  colorScheme="blue"
                  isLoading={isLoading}
                  loadingText="Signing Up"
                  w="100%"
                >
                  Sign Up
                </Button>
              </VStack>
            </Form>
          )}
        </Formik>
      </Box>
    </Grid>
  );
};

export default Signup;
