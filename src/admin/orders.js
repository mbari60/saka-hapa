import React, { useState, useEffect } from "react";
import { api } from "../utils/utils";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Button,
  Th,
  Td,
  Flex,
  useToast,
  Input,
} from "@chakra-ui/react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [usernames, setUsernames] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const toast = useToast();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("/orders");
        setOrders(response.data);
        // Fetch usernames for each user_id
        fetchUsernames(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        // Optional: Show error toast
        toast({
          title: "Error",
          description: "Failed to fetch orders.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchOrders();
  }, []);

  const fetchUsernames = async (orders) => {
    const userIds = orders.map((order) => order.user_id);
    try {
      const response = await Promise.all(
        userIds.map((id) => api.get(`/registration/${id}`))
      );
      const usernameMap = {};
      response.forEach((res, index) => {
        const username = res.data.username;
        const userId = userIds[index];
        usernameMap[userId] = username;
      });
      setUsernames(usernameMap);
    } catch (error) {
      console.error("Error fetching usernames:", error);
      // Optional: Show error toast
      toast({
        title: "Error",
        description: "Failed to fetch usernames.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const updateOrderStatus = async (id) => {
    try {
      await api.put(`/delivered/${id}`);
      // Update order status locally
      const updatedOrders = orders.map((order) =>
        order.id === id ? { ...order, status: true } : order
      );
      setOrders(updatedOrders);
      toast({
        title: "Success",
        description: "Order status updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error updating order status:", error);
      // Optional: Show error toast
      toast({
        title: "Error",
        description: "Failed to update order status.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const filterOrders = (searchTerm) => {
    // Filter orders based on the entered order ID
    const filteredOrders = orders.filter((order) =>
      order.id.toString().includes(searchTerm.trim())
    );
    setOrders(filteredOrders);
  };

  return (
    <Flex direction="column" p={4}>
      <Input
        placeholder="Search by Order ID"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          filterOrders(e.target.value);
        }}
        mb={4}
      />
      <Table variant="striped" colorScheme="gray" mt={4}>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>User Name</Th>
            <Th>Order Items</Th>
            <Th>Total Amount</Th>
            <Th>Status</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map((order) => (
            <Tr key={order.id}>
              <Td>{order.id}</Td>
              <Td>{usernames[order.user_id]}</Td>
              <Td>
                <ul>
                  {order.order_items.map((item) => (
                    <li key={item.id}>
                      {item.quantity} x {item.product_name} (ksh.{" "}
                      {item.unit_price})
                    </li>
                  ))}
                </ul>
              </Td>
              <Td>ksh. {order.total_amount}</Td>
              <Td>{order.status ? "Delivered" : "Pending"}</Td>
              <Td>
                {!order.status && (
                  <Button
                    colorScheme="blue"
                    onClick={() => updateOrderStatus(order.id)}
                  >
                    Mark as Delivered
                  </Button>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  );
};

export default AdminOrders;
