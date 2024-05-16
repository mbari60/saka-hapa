import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/utils";
import {
  Box,
  Text,
  Input,
  Button,
  Flex,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  InputGroup,
  InputRightElement,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const changePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Old Password is required"),
  newPassword: Yup.string()
    .required("New Password is required")
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const redeemPointsSchema = Yup.object().shape({
  points: Yup.number()
    .required("Points are required")
    .min(1, "Points must be at least 1"),
});

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
  const [redeemPointsModalOpen, setRedeemPointsModalOpen] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [deleteConfirmationModalOpen, setDeleteConfirmationModalOpen] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get("profile");
        if (response.data && response.data.length > 0) {
          setUser(response.data[0]); // Assuming the first object is the user profile
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast({
          title: "Error",
          description: "Failed to fetch user profile.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchUserProfile();
  }, []);

  const openChangePasswordModal = () => setChangePasswordModalOpen(true);
  const closeChangePasswordModal = () => setChangePasswordModalOpen(false);

  const openRedeemPointsModal = () => setRedeemPointsModalOpen(true);
  const closeRedeemPointsModal = () => setRedeemPointsModalOpen(false);

  const openDeleteConfirmationModal = () => setDeleteConfirmationModalOpen(true);
  const closeDeleteConfirmationModal = () => setDeleteConfirmationModalOpen(false);

  const changePassword = async (values) => {
    try {
      await api.put("changepassword", {
        old_password: values.oldPassword,
        new_password: values.newPassword,
      });
      toast({
        title: "Success",
        description: "Password changed successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      closeChangePasswordModal();
    } catch (error) {
      console.error("Error changing password:", error);
      toast({
        title: "Error",
        description: "Failed to change password.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const redeemPoints = async (values) => {
    if (values.points > user.merit_points) {
      toast({
        title: "Error",
        description: "You cannot redeem more points than you have.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    try {
      await api.put("redeemmeritpoints", {
        points: values.points,
      });
      toast({
        title: "Success",
        description: "Points redeemed successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setUser((prevUser) => ({
        ...prevUser,
        merit_points: prevUser.merit_points - values.points,
      }));
      closeRedeemPointsModal();
    } catch (error) {
      console.error("Error redeeming points:", error);
      toast({
        title: "Error",
        description: "Failed to redeem points.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const deleteUserAccount = async () => {
    try {
      // Send request to delete account
      await api.delete("deleteaccount");
      toast({
        title: "Success",
        description: "Account deleted successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      // Additional cleanup or redirection logic after account deletion
      navigate("/");
    } catch (error) {
      console.error("Error deleting account:", error);
      toast({
        title: "Error",
        description: "Failed to delete account.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <Flex direction="column" p={4} maxW="600px" mx="auto">
      <Box mb={4}>
        <Text fontSize="2xl" fontWeight="bold">
          User Profile
        </Text>
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem>
            <Text>Username:</Text>
          </GridItem>
          <GridItem>
            <Text>{user.username}</Text>
          </GridItem>
          <GridItem>
            <Text>Email:</Text>
          </GridItem>
          <GridItem>
            <Text>{user.email}</Text>
          </GridItem>
          <GridItem>
            <Text>Phone:</Text>
          </GridItem>
          <GridItem>
            <Text>{user.phone}</Text>
          </GridItem>
          <GridItem>
            <Text>Merit Points:</Text>
          </GridItem>
          <GridItem>
            <Text>{user.merit_points}</Text>
          </GridItem>
        </Grid>
      </Box>
      <Button colorScheme="blue" onClick={openChangePasswordModal} mb={4}>
        Change Password
      </Button>
      <Button colorScheme="green" onClick={openRedeemPointsModal} mb={4}>
        Redeem Points
      </Button>
      <Button colorScheme="red" onClick={openDeleteConfirmationModal}>
        Delete Account
      </Button>

      {/* Change Password Modal */}
      <Modal isOpen={changePasswordModalOpen} onClose={closeChangePasswordModal}>
        <ModalOverlay />
          <ModalContent>
          <ModalHeader>Change Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
              }}
              validationSchema={changePasswordSchema}
              onSubmit={(values) => changePassword(values)}
            >
              {({ values }) => (
                <Form>
                  <Field name="oldPassword">
                    {({ field }) => (
                      <InputGroup mb={4}>
                        <Input
                          {...field}
                          type={showOldPassword ? "text" : "password"}
                          placeholder="Old Password"
                        />
                        <InputRightElement width="4.5rem">
                          <Button
                            h="1.75rem"
                            size="sm"
                            onClick={() => setShowOldPassword(!showOldPassword)}
                          >
                            {showOldPassword ? "Hide" : "Show"}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    )}
                  </Field>
                  <ErrorMessage name="oldPassword" component="div" />

                  <Field name="newPassword">
                    {({ field }) => (
                      <InputGroup mb={4}>
                        <Input
                          {...field}
                          type={showNewPassword ? "text" : "password"}
                          placeholder="New Password"
                        />
                        <InputRightElement width="4.5rem">
                          <Button
                            h="1.75rem"
                            size="sm"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? "Hide" : "Show"}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    )}
                  </Field>
                  <ErrorMessage name="newPassword" component="div" />

                  <Field name="confirmPassword">
                    {({ field }) => (
                      <InputGroup mb={4}>
                        <Input
                          {...field}
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm Password"
                        />
                        <InputRightElement width="4.5rem">
                          <Button
                            h="1.75rem"
                            size="sm"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            {showConfirmPassword ? "Hide" : "Show"}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    )}
                  </Field>
                  <ErrorMessage name="confirmPassword" component="div" />

                  <Button colorScheme="blue" type="submit">
                    Change Password
                  </Button>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Redeem Points Modal */}
      <Modal isOpen={redeemPointsModalOpen} onClose={closeRedeemPointsModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Redeem Points</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{ points: "" }}
              validationSchema={redeemPointsSchema}
              onSubmit={(values) => redeemPoints(values)}
            >
              <Form>
                <Field name="points">
                  {({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      placeholder="Points to redeem"
                      mb={4}
                    />
                  )}
                </Field>
                <ErrorMessage name="points" component="div" />
                <Button colorScheme="green" type="submit">
                  Redeem Points
                </Button>
              </Form>
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteConfirmationModalOpen} onClose={closeDeleteConfirmationModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Delete Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete your account?</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={deleteUserAccount}>Delete</Button>
            <Button variant="ghost" onClick={closeDeleteConfirmationModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default UserProfile;
