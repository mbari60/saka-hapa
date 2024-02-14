import React from "react";
import {
  Box,
  Heading,
  Grid,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Contact = () => {
  const toast = useToast();

  const handleSubmit = (values, { resetForm }) => {
    // Send email to specified address (kevinmbari600@gmail.com)
    // This is just a mock function since we cannot send actual emails in a browser environment
    sendEmail(values.email, values.message);

    // Clear form fields after submission
    resetForm();

    // Show success message
    toast({
      title: "Message Sent",
      description: "Your message has been sent successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  // Mock function to send email (in real application, you would use a server-side function to send email)
  const sendEmail = (email, message) => {
    // This is a mock function for demonstration purposes
    console.log(
      `Email sent to: kevinmbari600@gmail.com\nEmail: ${email}\nMessage: ${message}`
    );
  };

  // Yup validation schema
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    message: Yup.string().required("Required"),
  });

  return (
    <Grid justifyContent="center" pt={20}>
      <Box p={8} maxWidth="900px">
        <Heading as="h1" size="xl" mb={8} color="brand.primary">
          Contact Us
        </Heading>
        <Formik
          initialValues={{ email: "", message: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field name="email">
                {({ field, form }) => (
                  <FormControl
                    id="email"
                    mb={4}
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <FormLabel color="text.muted">Email Address</FormLabel>
                    <Input
                      {...field}
                      type="email"
                      placeholder="john.doe@example.com"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      color="red.500"
                    />
                  </FormControl>
                )}
              </Field>
              <Field name="message">
                {({ field, form }) => (
                  <FormControl
                    id="message"
                    mb={4}
                    isInvalid={form.errors.message && form.touched.message}
                  >
                    <FormLabel color="text.muted">Message</FormLabel>
                    <Textarea {...field} />
                    <ErrorMessage
                      name="message"
                      component="div"
                      color="red.500"
                    />
                  </FormControl>
                )}
              </Field>
              <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
                Send Message
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Grid>
  );
};

export default Contact;
