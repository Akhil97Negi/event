import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createEvent } from '../redux/reducers/eventSlice';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaEdit, FaUsers } from 'react-icons/fa'; 


const EventForm = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [participantLimit, setParticipantLimit] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Format the date to yyyy-MM-dd
    const formattedDate = new Date(date).toISOString().split('T')[0];

    try {
      await dispatch(createEvent({
        name,
        date: formattedDate,
        time,
        location,
        description,
        participantLimit,
      }));
      navigate('/events');
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Form onSubmit={handleSubmit} className="event-form">
            <h2 className="text-center mb-4">Create New Event</h2>
            
            <Form.Group className="mb-3">
              <Form.Label><FaEdit /> Event Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter event name"
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label><FaCalendarAlt /> Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label><FaClock /> Time</Form.Label>
              <Form.Control
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                placeholder="Enter event time"
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label><FaMapMarkerAlt /> Location</Form.Label>
              <Form.Control
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                placeholder="Enter event location"
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label><FaEdit /> Description</Form.Label>
              <Form.Control
                as="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Enter event description"
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label><FaUsers /> Participant Limit</Form.Label>
              <Form.Control
                type="number"
                value={participantLimit}
                onChange={(e) => setParticipantLimit(Number(e.target.value))}
                placeholder="Enter participant limit"
              />
            </Form.Group>
            
            <div className="text-center">
              <Button type="submit" variant="primary">Create Event</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EventForm;
