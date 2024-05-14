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
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required("New Password is required")
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchUsername, setSearchUsername] = useState("");
  const [sortByMeritPoints, setSortByMeritPoints] = useState(false);
  const [deleteUserModalOpen, setDeleteUserModalOpen] = useState(false);
  const [resetPasswordModalOpen, setResetPasswordModalOpen] = useState(false);
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

  // Reset password
  const resetPassword = async (values) => {
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

  // Delete user modal handlers
  const openDeleteUserModal = (user) => {
    setSelectedUser(user);
    setDeleteUserModalOpen(true);
  };

  const closeDeleteUserModal = () => {
    setSelectedUser(null);
    setDeleteUserModalOpen(false);
  };

  // Delete user
  const deleteUser = async () => {
    try {
      await api.delete(`registration/${selectedUser.id}`);
      setUsers(users.filter((user) => user.id !== selectedUser.id));
      toast({
        title: "Success",
        description: "User deleted successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      closeDeleteUserModal();
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

  // Suspend or activate user based on is_active status
  const toggleUserActivation = async (user) => {
    const action = user.is_active ? "suspend" : "activate";
    try {
      await api.put(`users/${user.id}/${action}`);
      const updatedUsers = users.map((u) => {
        if (u.id === user.id) {
          return { ...u, is_active: !user.is_active };
        }
        return u;
      });
      setUsers(updatedUsers);
      toast({
        title: "Success",
        description: `User ${
          action === "suspend" ? "suspended" : "activated"
        } successfully.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error(
        `Error ${action === "suspend" ? "suspending" : "activating"} user:`,
        error
      );
      // Optional: Show error toast
      toast({
        title: "Error",
        description: `Failed to ${
          action === "suspend" ? "suspend" : "activate"
        } user.`,
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
                  colorScheme={user.is_active ? "red" : "green"}
                  onClick={() => toggleUserActivation(user)}
                >
                  {user.is_active ? "Suspend" : "Activate"}
                </Button>
                <Button
                  colorScheme="blue"
                  ml={2}
                  onClick={() => openResetPasswordModal(user)}
                >
                  Reset Password
                </Button>
                <Button
                  colorScheme="orange"
                  ml={2}
                  onClick={() => openDeleteUserModal(user)}
                >
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
              initialValues={{ newPassword: "", confirmPassword: "" }}
              validationSchema={validationSchema}
              onSubmit={(values) => resetPassword(values)}
            >
              <Form>
                <Field
                  name="newPassword"
                  type="password"
                  placeholder="New Password"
                  as={Input}
                />
                <ErrorMessage name="newPassword" component="div" />
                <Field
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  as={Input}
                />
                <ErrorMessage name="confirmPassword" component="div" />
                <Button mt={4} colorScheme="blue" type="submit">
                  Reset Password
                </Button>
              </Form>
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Delete User Modal */}
      <Modal isOpen={deleteUserModalOpen} onClose={closeDeleteUserModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this user?</ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={deleteUser}>
              Delete
            </Button>
            <Button onClick={closeDeleteUserModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default AdminUsers;
