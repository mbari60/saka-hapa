import React, { useState, useEffect } from "react";
import { api } from "../utils/utils";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Flex, useToast, Box, Text, Select } from "@chakra-ui/react";

// Register Chart.js components for pie and bar charts
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Dashboard = () => {
  // State variables to store data fetched from the API
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  // State to keep track of the currently selected analysis type
  const [selectedAnalysis, setSelectedAnalysis] = useState("orders");
  // Toast for displaying error messages
  const toast = useToast(); 

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch orders and users data from the API simultaneously
        const [ordersResponse, usersResponse] = await Promise.all([
          api.get("/orders"),
          api.get("/users")
        ]);
        // Update order and user states with the fetched data
        setOrders(ordersResponse.data);
        setUsers(usersResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Showing an error message if fetching fails
        toast({
          title: "Error",
          description: "Failed to fetch data.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchData();
  }, [toast]);

  // Function to calculate total amounts for orders based on their status
  const getOrderAmounts = () => {
    const amounts = {
      Delivered: 0,
      Pending: 0,
    };
    // iterating through the orders that we have fetched and sum up the amount for each status pending and delivered amount
    orders.forEach((order) => {
      const status = order.status ? "Delivered" : "Pending";
      amounts[status] += order.total_amount;
    });

    return amounts;
  };

  // Function to get user merit points, filtering out users with zero merit points
  const getUserMerits = () => {
    const merits = users.reduce((acc, user) => {
      if (user.merit_points > 0) {
        acc.push({ username: user.username, merit_points: user.merit_points });
      }
      return acc;
    }, []);
    return merits;
  };

  // Prepare data for the pie chart showing order status distribution
  const getPieChartData = () => {
    const amounts = getOrderAmounts();

    return {
      labels: ["Delivered", "Pending"],
      datasets: [
        {
          label: "Order Status",
          data: [amounts.Delivered, amounts.Pending],
          backgroundColor: ["#36A2EB", "#FF6384"],
          borderColor: ["#36A2EB", "#FF6384"],
          borderWidth: 1,
        },
      ],
    };
  };

  // Prepare data for bar charts based on the selected analysis type
  const getBarChartData = () => {
    if (selectedAnalysis === "users") {
      const merits = getUserMerits();
      return {
        labels: merits.map(user => user.username),
        datasets: [
          {
            label: "Merit Points",
            data: merits.map(user => user.merit_points),
            backgroundColor: "#FF6384",
          },
        ],
      };
    }
    return {};
  };

  return (
    <Flex direction="column" p={4}>
      <Text fontSize="xl" mb={4}>Dashboard</Text>

      <Select
        placeholder="Select analysis"
        value={selectedAnalysis}
        onChange={(e) => setSelectedAnalysis(e.target.value)}
        mb={4}
      >
        <option value="orders">Order Analysis</option>
        <option value="users">User Analysis</option>
      </Select>

      {selectedAnalysis === "orders" && (
        <>
          <Text fontSize="lg" mb={2}>Order Status Distribution:</Text>
          <div style={{ width: '400px', height: '400px' }}>
            <Pie data={getPieChartData()} />
          </div>
          <Box mb={6}>
            <Text fontSize="lg" mb={2}>Total Amount by Status:</Text>
            <Text>Total Delivered: ksh. {getOrderAmounts().Delivered}</Text>
            <Text>Total Pending: ksh. {getOrderAmounts().Pending}</Text>
          </Box>
        </>
      )}

      {selectedAnalysis === "users" && (
        <Box>
          <Text fontSize="lg" mb={2}>User Merit Points:</Text>
          <div style={{ width: '400px', height: '400px' }}>
            <Bar data={getBarChartData()} options={{ responsive: true }} />
          </div>
        </Box>
      )}
    </Flex>
  );
};

export default Dashboard;
