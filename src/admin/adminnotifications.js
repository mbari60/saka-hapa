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
} from "@chakra-ui/react";

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [isEditing, setIsEditing] = useState({});
  const [newNotificationModalOpen, setNewNotificationModalOpen] =
    useState(false);
  const [newNotification, setNewNotification] = useState({
    description: "",
    image_url: "",
    timeline: 60,
  });
  const [searchDescription, setSearchDescription] = useState("");
  const [searchId, setSearchId] = useState("");
  const toast = useToast();

  // Fetch notifications from the backend
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get("notifications");
        setNotifications(response.data);
        setFilteredNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        // Optional: Show error toast
        toast({
          title: "Error",
          description: "Failed to fetch notifications.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchNotifications();
  }, []);

  // Handle changes in notification details
  const handleNotificationChange = (id, field, value) => {
    const updatedNotifications = notifications.map((notification) => {
      if (notification.id === id) {
        return { ...notification, [field]: value };
      }
      return notification;
    });
    setNotifications(updatedNotifications);
  };

  // Toggle editing mode for a notification
  const toggleEditing = (id) => {
    setIsEditing((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Save changes to a notification
  const saveNotificationChanges = async (id) => {
    const notificationToUpdate = notifications.find(
      (notification) => notification.id === id
    );
    try {
      await api.put(`notifications/${id}`, notificationToUpdate);
      // Optional: Show success toast
      toast({
        title: "Success",
        description: "Notification updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error updating notification:", error);
      // Optional: Show error toast
      toast({
        title: "Error",
        description: "Failed to update notification.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    toggleEditing(id);
  };

  // Delete a notification
  const deleteNotification = async (id) => {
    try {
      await api.delete(`notifications/${id}`);
      setNotifications(
        notifications.filter((notification) => notification.id !== id)
      );
      // Optional: Show success toast
      toast({
        title: "Success",
        description: "Notification deleted successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting notification:", error);
      // Optional: Show error toast
      toast({
        title: "Error",
        description: "Failed to delete notification.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Handle changes in new notification form
  const handleNewNotificationChange = (e) => {
    const { name, value } = e.target;
    setNewNotification((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add a new notification
  const addNotification = async () => {
    try {
      await api.post("notifications", newNotification);
      setNewNotification({
        description: "",
        image_url: "",
        timeline: 60,
      });
      setNewNotificationModalOpen(false);
      // Optional: Show success toast
      toast({
        title: "Success",
        description: "Notification added successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error adding notification:", error);
      // Optional: Show error toast
      toast({
        title: "Error",
        description: "Failed to add notification.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Filter notifications by description and id
  useEffect(() => {
    const filteredByDescription = notifications.filter((notification) =>
      notification.description
        .toLowerCase()
        .includes(searchDescription.toLowerCase())
    );
    const filteredById = notifications.filter(
      (notification) => notification.id.toString() === searchId
    );
    if (searchDescription !== "") {
      setFilteredNotifications(filteredByDescription);
    } else if (searchId !== "") {
      setFilteredNotifications(filteredById);
    } else {
      setFilteredNotifications(notifications);
    }
  }, [notifications, searchDescription, searchId]);

  return (
    <Flex direction="column" p={4}>
      <Button onClick={() => setNewNotificationModalOpen(true)}>
        Add Notification
      </Button>
      <Flex mt={4}>
        <Input
          placeholder="Search by Description"
          value={searchDescription}
          onChange={(e) => setSearchDescription(e.target.value)}
        />
        <Input
          ml={2}
          placeholder="Search by ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
      </Flex>
      <Table variant="striped" colorScheme="gray" mt={4}>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Description</Th>
            <Th>Image URL</Th>
            <Th>Timeline</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredNotifications.map((notification) => (
            <Tr key={notification.id}>
              <Td>{notification.id}</Td>
              <Td>
                {isEditing[notification.id] ? (
                  <Input
                    type="text"
                    value={notification.description}
                    onChange={(e) =>
                      handleNotificationChange(
                        notification.id,
                        "description",
                        e.target.value
                      )
                    }
                  />
                ) : (
                  notification.description
                )}
              </Td>
              <Td>
                {isEditing[notification.id] ? (
                  <Input
                    type="text"
                    value={notification.image_url}
                    onChange={(e) =>
                      handleNotificationChange(
                        notification.id,
                        "image_url",
                        e.target.value
                      )
                    }
                  />
                ) : (
                  notification.image_url
                )}
              </Td>
              <Td>
                {isEditing[notification.id] ? (
                  <Input
                    type="number"
                    value={notification.timeline}
                    onChange={(e) =>
                      handleNotificationChange(
                        notification.id,
                        "timeline",
                        e.target.value
                      )
                    }
                  />
                ) : (
                  notification.timeline
                )}
              </Td>
              <Td>
                {isEditing[notification.id] ? (
                  <Button
                    onClick={() => saveNotificationChanges(notification.id)}
                  >
                    Save
                  </Button>
                ) : (
                  <Button onClick={() => toggleEditing(notification.id)}>
                    Edit
                  </Button>
                )}
                <Button
                  colorScheme="red"
                  ml={2}
                  onClick={() => deleteNotification(notification.id)}
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {/* New Notification Modal */}
      <Modal
        isOpen={newNotificationModalOpen}
        onClose={() => setNewNotificationModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Notification</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                name="description"
                value={newNotification.description}
                onChange={handleNewNotificationChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Image URL</FormLabel>
              <Input
                type="text"
                name="image_url"
                value={newNotification.image_url}
                onChange={handleNewNotificationChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Timeline</FormLabel>
              <Input
                type="number"
                name="timeline"
                value={newNotification.timeline}
                onChange={handleNewNotificationChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={addNotification}>
              Add Notification
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default AdminNotifications;
