import React, { useState, useEffect } from "react";
import { api } from "../utils/utils";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
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
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Required"),
});

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchUsername, setSearchUsername] = useState("");
  const [sortByMeritPoints, setSortByMeritPoints] = useState(false);
  const [resetPasswordModalOpen, setResetPasswordModalOpen] = useState(false);
  const [suspendUserModalOpen, setSuspendUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const toast = useToast();

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("users");
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        // Optional: Show error toast
        toast({
          title: "Error",
          description: "Failed to fetch users.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchUsers();
  }, []);

  // Filter users by username
  useEffect(() => {
    const filteredByUsername = users.filter((user) =>
      user.username.toLowerCase().includes(searchUsername.toLowerCase())
    );
    setFilteredUsers(filteredByUsername);
  }, [users, searchUsername]);

  // Sort users by merit points
  useEffect(() => {
    if (sortByMeritPoints) {
      const sortedUsers = [...filteredUsers].sort(
        (a, b) => b.merit_points - a.merit_points
      );
      setFilteredUsers(sortedUsers);
    }
  }, [sortByMeritPoints, filteredUsers]);

  // Reset password modal handlers
  const openResetPasswordModal = (user) => {
    setSelectedUser(user);
    setResetPasswordModalOpen(true);
  };

  const closeResetPasswordModal = () => {
    setSelectedUser(null);
    setResetPasswordModalOpen(false);
  };

  // Suspend user modal handlers
  const openSuspendUserModal = (user) => {
    setSelectedUser(user);
    setSuspendUserModalOpen(true);
  };

  const closeSuspendUserModal = () => {
    setSelectedUser(null);
    setSuspendUserModalOpen(false);
  };

  // Reset password form submission
  const handleResetPassword = async (values) => {
    try {
      await api.put(`resetpassword/${selectedUser.id}`, {
        password: values.newPassword,
      });
      toast({
        title: "Success",
        description: "Password reset successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      closeResetPasswordModal();
    } catch (error) {
      console.error("Error resetting password:", error);
      // Optional: Show error toast
      toast({
        title: "Error",
        description: "Failed to reset password.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Suspend user
  const suspendUser = async () => {
    try {
      await api.put(`suspenduser/${selectedUser.id}`);
      toast({
        title: "Success",
        description: "User suspended successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      closeSuspendUserModal();
    } catch (error) {
      console.error("Error suspending user:", error);
      // Optional: Show error toast
      toast({
        title: "Error",
        description: "Failed to suspend user.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Delete user
  const deleteUser = async () => {
    try {
      await api.delete(`users/${selectedUser.id}`);
      setUsers(users.filter((user) => user.id !== selectedUser.id));
      closeSuspendUserModal(); // Close suspend modal if open
      toast({
        title: "Success",
        description: "User deleted successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      // Optional: Show error toast
      toast({
        title: "Error",
        description: "Failed to delete user.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex direction="column" p={4}>
      <Input
        placeholder="Search by Username"
        value={searchUsername}
        onChange={(e) => setSearchUsername(e.target.value)}
      />
      <Button mt={4} onClick={() => setSortByMeritPoints(!sortByMeritPoints)}>
        {sortByMeritPoints ? "Unsort by Merit Points" : "Sort by Merit Points"}
      </Button>
      <Table variant="striped" colorScheme="gray" mt={4}>
        <Thead>
          <Tr>
            <Th>Username</Th>
            <Th>Email</Th>
            <Th>Phone</Th>
            <Th>Role</Th>
            <Th>Merit Points</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredUsers.map((user) => (
            <Tr key={user.id}>
              <Td>{user.username}</Td>
              <Td>{user.email}</Td>
              <Td>{user.phone}</Td>
              <Td>{user.role}</Td>
              <Td>{user.merit_points}</Td>
              <Td>
                <Button
                  colorScheme="blue"
                  onClick={() => openResetPasswordModal(user)}
                >
                  Reset Password
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => openSuspendUserModal(user)}
                >
                  Suspend
                </Button>
                <Button colorScheme="orange" onClick={deleteUser}>
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {/* Reset Password Modal */}
      <Modal isOpen={resetPasswordModalOpen} onClose={closeResetPasswordModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reset Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                newPassword: "",
                confirmPassword: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleResetPassword}
            >
              {({ values, errors, touched, setFieldValue }) => (
                <Form>
                  <FormControl
                    isInvalid={errors.newPassword && touched.newPassword}
                    mt={4}
                  >
                    <FormLabel>New Password</FormLabel>
                    <Input
                      type="password"
                      name="newPassword"
                      value={values.newPassword}
                      onChange={(e) =>
                        setFieldValue("newPassword", e.target.value)
                      }
                    />
                    <FormErrorMessage>{errors.newPassword}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={
                      errors.confirmPassword && touched.confirmPassword
                    }
                    mt={4}
                  >
                    <FormLabel>Confirm Password</FormLabel>
                    <Input
                      type="password"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={(e) =>
                        setFieldValue("confirmPassword", e.target.value)
                      }
                    />
                    <FormErrorMessage>
                      {errors.confirmPassword}
                    </FormErrorMessage>
                  </FormControl>
                  <Button mt={4} colorScheme="blue" type="submit">
                    Reset Password
                  </Button>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* Suspend User Modal */}
      <Modal isOpen={suspendUserModalOpen} onClose={closeSuspendUserModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Suspend User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to suspend this user?</ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={suspendUser}>
              Suspend
            </Button>
            <Button onClick={closeSuspendUserModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default AdminUsers;
