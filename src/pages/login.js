import React, { useState, useContext } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../utils/utils";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormErrorMessage,
  VStack,
  InputGroup,
  InputRightElement,
  IconButton,
  Image,
  Center,
  useToast,
} from "@chakra-ui/react";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import * as Yup from "yup";
import { AuthContext } from "../context/authcontext";

const schema = Yup.object().shape({
  identifier: Yup.string().required("Username or email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  const onSubmit = async (values, { resetForm }) => {
    try {
      setIsLoading(true);
      const res = await api.post("login", values);
      toast({
        title: "success",
        description: res.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      resetForm();
      localStorage.setItem("session", JSON.stringify(res.data));
      setIsAuthenticated(true);
      navigate("/home");
    } catch (error) {
      toast({
        title: "Failed",
        description: "Invalid username or password ",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Center minH="100vh">
      <Box
        p={4}
        borderRadius="md"
        bg="white"
        shadow="md"
        maxW={{ base: "90%", sm: "80%", md: "60%", lg: "40%" }}
        w="100%"
      >
        <Box flex="1">
          <Image
            src="https://media.istockphoto.com/id/1390481905/photo/multi-factor-authentication-user-login-cybersecurity-privacy-protect-data-internet-network.webp?b=1&s=170667a&w=0&k=20&c=FXjZAahWrDdDph8ZU3HrsnD2zfqd0VjVjH-Avjwex5k="
            alt="Login Image"
            borderRadius="md"
            w="100%"
            display={{ base: "block", lg: "none" }}
          />
          <Box flex="1" display={{ base: "none", lg: "block" }}>
            <Image
              src="https://media.istockphoto.com/id/1390481905/photo/multi-factor-authentication-user-login-cybersecurity-privacy-protect-data-internet-network.webp?b=1&s=170667a&w=0&k=20&c=FXjZAahWrDdDph8ZU3HrsnD2zfqd0VjVjH-Avjwex5k="
              alt="Login Image"
              borderRadius="md"
              h="100%"
            />
          </Box>
          <Formik
            initialValues={{
              identifier: "",
              password: "",
            }}
            validationSchema={schema}
            onSubmit={onSubmit}
          >
            <Form>
              <VStack spacing={4} align="stretch">
                <Field name="identifier">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.identifier && form.touched.identifier
                      }
                    >
                      <label style={{ color: "black" }}>Enter Username or email</label>
                      <Input
                        {...field}
                        placeholder=" Username or Email"
                        borderRadius="md"
                        borderColor="black"
                        _placeholder={{ color: "black" }}
                        _focus={{ borderColor: "black" }}
                        color="black"
                      />
                      <FormErrorMessage>
                        {form.errors.identifier}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="password">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.password && form.touched.password}
                    >
                      <label style={{ color: "black" }}>Enter Password</label>
                      <InputGroup>
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          borderRadius="md"
                          borderColor="black"
                          _placeholder={{ color: "black" }}
                          _focus={{ borderColor: "black" }}
                          color="black"
                        />
                        <InputRightElement>
                          <IconButton
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                            variant="ghost"
                            onClick={() => setShowPassword(!showPassword)}
                            icon={
                              showPassword ? (
                                <AiFillEyeInvisible />
                              ) : (
                                <AiFillEye />
                              )
                            }
                          />
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>
                        {form.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Center>
                  <VStack spacing={4} align="stretch" w="100%">
                    <Button
                      colorScheme="blue"
                      type="submit"
                      isLoading={isLoading}
                      borderRadius="md"
                      w={{ base: "50%", md: "100%" }}
                    >
                      Log In
                    </Button>
                    <Link to="/sign-up" style={{ width: "100%" }}>
                      <p style={{ color: "black", textAlign: "center" }}>
                        Don't have an account?
                      </p>
                      <Button
                        colorScheme="blue"
                        borderRadius="md"
                        w={{ base: "50%", md: "100%" }}
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </VStack>
                </Center>
              </VStack>
            </Form>
          </Formik>
        </Box>
      </Box>
    </Center>
  );
};

export default Login;
