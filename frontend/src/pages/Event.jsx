import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  VStack,
  HStack,
  Heading,
  Text,
  useToast,
} from '@chakra-ui/react';

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const toast = useToast();

  useEffect(() => {
    fetchEvents();
    fetchRegisteredEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('https://event-backend-wbiy.onrender.com/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchRegisteredEvents = async () => {
    try {
      const response = await axios.get('https://event-backend-wbiy.onrender.com/participants/myevents', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,  
        },
      });
      setRegisteredEvents(response.data);
    } catch (error) {
      console.error('Error fetching registered events:', error);
    }
  };

  const handleRegister = async (eventId) => {
    try {
      await axios.post(`https://event-backend-wbiy.onrender.com/participants/register/${eventId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      toast({
        title: "Registered successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchEvents();
      fetchRegisteredEvents();
    } catch (error) {
      console.error('Error registering for event:', error);
      toast({
        title: "Failed to register",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUnregister = async (eventId) => {
    try {
      await axios.delete(`https://event-backend-wbiy.onrender.com/participants/cancel/${eventId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      toast({
        title: "Unregistered successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchEvents();
      fetchRegisteredEvents();
    } catch (error) {
      console.error('Error unregistering from event:', error);
      toast({
        title: "Failed to unregister",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const isRegistered = (eventId) => {
    return registeredEvents.some(event => event._id === eventId);
  };

  return (
    <Box p={4}>
      <Heading mb={4}>Events</Heading>
      <VStack align="start" spacing={4}>
        {events.map(event => (
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
              Participants: {event.participants.length} / {event.participantLimit || 'No limit'}
            </Text>
            <HStack spacing={4} mt={2}>
              {isRegistered(event._id) ? (
                <Button colorScheme="red" onClick={() => handleUnregister(event._id)}>
                  Unregister
                </Button>
              ) : (
                <Button colorScheme="blue" onClick={() => handleRegister(event._id)}>
                  Register
                </Button>
              )}
            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default EventPage;
