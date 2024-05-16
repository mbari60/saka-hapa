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

const AdminOffers = () => {
  const [offers, setOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [isEditing, setIsEditing] = useState({});
  const [newOfferModalOpen, setNewOfferModalOpen] = useState(false);
  const [newOffer, setNewOffer] = useState({
    offer_name: "",
    description: "",
    offer_price: 0,
    timeline: 60,
    image_url: "",
    insta_url: "",
    slots_limit: 0,
    rating: 1,
  });
  const [searchName, setSearchName] = useState("");
  const [searchId, setSearchId] = useState("");
  const toast = useToast();

  // Fetch offers from the backend
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await api.get("/offers");
        setOffers(response.data);
        setFilteredOffers(response.data);
      } catch (error) {
        console.error("Error fetching offers:", error);
        // Optional: Show error toast
        toast({
          title: "Error",
          description: "Failed to fetch offers.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchOffers();
  }, []);

  // Handle changes in offer details
  const handleOfferChange = (id, field, value) => {
    const updatedOffers = offers.map((offer) => {
      if (offer.id === id) {
        return { ...offer, [field]: value };
      }
      return offer;
    });
    setOffers(updatedOffers);
  };

  // Toggle editing mode for an offer
  const toggleEditing = (id) => {
    setIsEditing((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Save changes to an offer
  const saveOfferChanges = async (id) => {
    const offerToUpdate = offers.find((offer) => offer.id === id);
    try {
      await api.put(`/offers/${id}`, offerToUpdate);
      // Optional: Show success toast
      toast({
        title: "Success",
        description: "Offer updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error updating offer:", error);
      // Optional: Show error toast
      toast({
        title: "Error",
        description: "Failed to update offer.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    toggleEditing(id);
  };

  // Delete an offer
  const deleteOffer = async (id) => {
    try {
      await api.delete(`/offers/${id}`);
      setOffers(offers.filter((offer) => offer.id !== id));
      // Optional: Show success toast
      toast({
        title: "Success",
        description: "Offer deleted successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting offer:", error);
      // Optional: Show error toast
      toast({
        title: "Error",
        description: "Failed to delete offer.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Handle changes in new offer form
  const handleNewOfferChange = (e) => {
    const { name, value } = e.target;
    setNewOffer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add a new offer
  const addOffer = async () => {
    try {
      await api.post("offers", newOffer);
      setNewOffer({
        offer_name: "",
        description: "",
        offer_price: 0,
        timeline: 60,
        image_url: "",
        insta_url: "",
        slots_limit: 0,
        rating: 1,
      });
      setNewOfferModalOpen(false);
      // Optional: Show success toast
      toast({
        title: "Success",
        description: "Offer added successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error adding offer:", error);
      // Optional: Show error toast
      toast({
        title: "Error",
        description: "Failed to add offer.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Filter offers by name and id
  useEffect(() => {
    const filteredByName = offers.filter((offer) =>
      offer.offer_name.toLowerCase().includes(searchName.toLowerCase())
    );
    const filteredById = offers.filter(
      (offer) => offer.id.toString() === searchId
    );
    if (searchName !== "") {
      setFilteredOffers(filteredByName);
    } else if (searchId !== "") {
      setFilteredOffers(filteredById);
    } else {
      setFilteredOffers(offers);
    }
  }, [offers, searchName, searchId]);

  return (
    <Flex direction="column" p={4}>
      <Button onClick={() => setNewOfferModalOpen(true)}>Add Offer</Button>
      <Flex mt={4}>
        <Input
          placeholder="Search by Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
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
            <Th>Offer Name</Th>
            <Th>Description</Th>
            <Th>slots_limit</Th>
            <Th>Offer Price</Th>
            <Th>Timeline</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredOffers.map((offer) => (
            <Tr key={offer.id}>
              <Td>{offer.id}</Td>
              <Td>
                {isEditing[offer.id] ? (
                  <Input
                    type="text"
                    value={offer.offer_name}
                    onChange={(e) =>
                      handleOfferChange(offer.id, "offer_name", e.target.value)
                    }
                  />
                ) : (
                  offer.offer_name
                )}
              </Td>
              <Td>
                {isEditing[offer.id] ? (
                  <Input
                    type="text"
                    value={offer.description}
                    onChange={(e) =>
                      handleOfferChange(offer.id, "description", e.target.value)
                    }
                  />
                ) : (
                  offer.description
                )}
              </Td>
              <Td>
                {isEditing[offer.id] ? (
                  <Input
                    type="number"
                    value={offer.slots_limit}
                    onChange={(e) =>
                      handleOfferChange(offer.id, "slots_limit", e.target.value)
                    }
                  />
                ) : (
                  offer.slots_limit
                )}
              </Td>
              <Td>
                {isEditing[offer.id] ? (
                  <Input
                    type="number"
                    value={offer.offer_price}
                    onChange={(e) =>
                      handleOfferChange(offer.id, "offer_price", e.target.value)
                    }
                  />
                ) : (
                  offer.offer_price
                )}
              </Td>
              <Td>
                {isEditing[offer.id] ? (
                  <Input
                    type="number"
                    value={offer.timeline}
                    onChange={(e) =>
                      handleOfferChange(offer.id, "timeline", e.target.value)
                    }
                  />
                ) : (
                  offer.timeline
                )}
              </Td>
              <Td>
                {isEditing[offer.id] ? (
                  <Button onClick={() => saveOfferChanges(offer.id)}>
                    Save
                  </Button>
                ) : (
                  <Button onClick={() => toggleEditing(offer.id)}>Edit</Button>
                )}
                <Button
                  colorScheme="red"
                  ml={2}
                  onClick={() => deleteOffer(offer.id)}
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {/* New Offer Modal */}
      <Modal
        isOpen={newOfferModalOpen}
        onClose={() => setNewOfferModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Offer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Offer Name</FormLabel>
              <Input
                type="text"
                name="offer_name"
                value={newOffer.offer_name}
                onChange={handleNewOfferChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                name="description"
                value={newOffer.description}
                onChange={handleNewOfferChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Offer Price</FormLabel>
              <Input
                type="number"
                name="offer_price"
                value={newOffer.offer_price}
                onChange={handleNewOfferChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Timeline</FormLabel>
              <Input
                type="number"
                name="timeline"
                value={newOffer.timeline}
                onChange={handleNewOfferChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Image URL</FormLabel>
              <Input
                type="text"
                name="image_url"
                value={newOffer.image_url}
                onChange={handleNewOfferChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>insta_url</FormLabel>
              <Input
                type="text"
                name="insta_url"
                value={newOffer.insta_url}
                onChange={handleNewOfferChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Slots Limit</FormLabel>
              <Input
                type="number"
                name="slots_limit"
                value={newOffer.slots_limit}
                onChange={handleNewOfferChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Rating</FormLabel>
              <Input
                type="number"
                name="rating"
                placeholder="Number between 1 to 5"
                value={newOffer.rating}
                onChange={handleNewOfferChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={addOffer}>
              Add Offer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default AdminOffers;
