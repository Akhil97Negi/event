import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createEvent } from '../redux/reducers/eventSlice';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const EventForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [participantLimit, setParticipantLimit] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createEvent({ name, date, time, location, description, participantLimit }));
    navigate('/events'); // Redirect to the events page after creation
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formEventName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter event name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formEventDate">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formEventTime">
        <Form.Label>Time</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter event time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formEventLocation">
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter event location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formEventDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter event description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formEventParticipantLimit">
        <Form.Label>Participant Limit</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter participant limit"
          value={participantLimit}
          onChange={(e) => setParticipantLimit(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Create Event
      </Button>
    </Form>
  );
};

export default EventForm;
