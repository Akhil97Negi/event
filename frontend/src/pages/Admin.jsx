import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
  HStack,
  Heading,
  Text,
} from '@chakra-ui/react';

const AdminPage = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    time: '',
    location: '',
    description: '',
    participantLimit: 0,
  });
  const [editingEventId, setEditingEventId] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://event-backend-wbiy.onrender.com/events', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleCreateEvent = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://event-backend-wbiy.onrender.com/events', newEvent, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchEvents();
      resetForm();
      onClose();
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleUpdateEvent = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`https://event-backend-wbiy.onrender.com/events/${editingEventId}`, newEvent, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchEvents();
      resetForm();
      onClose();
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://event-backend-wbiy.onrender.com/events/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleEditEvent = (event) => {
    setNewEvent({
      name: event.name,
      date: event.date,
      time: event.time,
      location: event.location,
      description: event.description,
      participantLimit: event.participantLimit,
    });
    setEditingEventId(event._id);
    onOpen();
  };

  const resetForm = () => {
    setNewEvent({
      name: '',
      date: '',
      time: '',
      location: '',
      description: '',
      participantLimit: 0,
    });
    setEditingEventId(null);
  };

  return (
    <Box p={4}>
      <Heading mb={4}>Admin Page</Heading>

      <Button colorScheme="blue" onClick={() => { resetForm(); onOpen(); }}>
        Create Event
      </Button>

      <VStack align="start" mt={4} spacing={4}>
        {events.map((event) => (
          <Box
            key={event._id}
            p={4}
            borderWidth={1}
            borderRadius="lg"
            width="100%"
            boxShadow="md"
          >
            <Heading size="md">{event.name}</Heading>
            <Text>Date: {new Date(event.date).toLocaleDateString()}</Text>
            <Text>Time: {event.time}</Text>
            <Text>Location: {event.location}</Text>
            <Text>Description: {event.description}</Text>
            <Text>
              Participants: {event.participants.length}/{event.participantLimit > 0 ? event.participantLimit : 'Unlimited'}
            </Text>
            {event.waitlist && event.waitlist.length > 0 && (
              <Text>Waitlist: {event.waitlist.length}</Text>
            )}
            <HStack spacing={4} mt={2}>
              <Button
                colorScheme="teal"
                onClick={() => handleEditEvent(event)}
              >
                Update
              </Button>
              <Button
                colorScheme="red"
                onClick={() => handleDeleteEvent(event._id)}
              >
                Delete
              </Button>
            </HStack>
          </Box>
        ))}
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editingEventId ? 'Update Event' : 'Create New Event'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl id="name" isRequired>
                <FormLabel>Event Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={newEvent.name}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl id="date" isRequired>
                <FormLabel>Date</FormLabel>
                <Input
                  type="date"
                  name="date"
                  value={newEvent.date}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl id="time" isRequired>
                <FormLabel>Time</FormLabel>
                <Input
                  type="time"
                  name="time"
                  value={newEvent.time}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl id="location" isRequired>
                <FormLabel>Location</FormLabel>
                <Input
                  type="text"
                  name="location"
                  value={newEvent.location}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl id="description" isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea
                  name="description"
                  value={newEvent.description}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl id="participantLimit">
                <FormLabel>Participant Limit</FormLabel>
                <Input
                  type="number"
                  name="participantLimit"
                  value={newEvent.participantLimit}
                  onChange={handleInputChange}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={editingEventId ? handleUpdateEvent : handleCreateEvent}
            >
              {editingEventId ? 'Update' : 'Create'}
            </Button>
            <Button onClick={onClose} ml={3}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AdminPage;
