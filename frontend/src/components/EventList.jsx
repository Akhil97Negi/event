import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents, deleteEvent } from '../redux/reducers/eventSlice';
import { Button, Pagination, Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt, FaUsers } from 'react-icons/fa'; 
import './EventList.css'; 

const PAGE_SIZE = 10;

const EventList = () => {
  const dispatch = useDispatch();
  const { events = [], status = 'idle', error = null } = useSelector((state) => state.events);
  const [currentPage, setCurrentPage] = useState(1);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEvents());
    }
  }, [status, dispatch]);

  const handleDelete = (id) => {
    if (token) {
      dispatch(deleteEvent({ id, token }));
    } else {
      console.error('No token available');
    }
  };

  const totalPages = Math.ceil(events.length / PAGE_SIZE);
  const paginatedEvents = events.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  let content;

  if (status === 'loading') {
    content = <div className="loading">Loading...</div>;
  } else if (status === 'succeeded') {
    content = (
      <Row className="event-list">
        {paginatedEvents.map((event) => (
          <Col md={6} lg={4} key={event._id} className="mb-4">
            <Card className="event-card">
              <Card.Body>
                <Card.Title className="event-name">{event.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{event.date}</Card.Subtitle>
                <Card.Text>
                  <strong>Time:</strong> {event.time}
                </Card.Text>
                <Card.Text>
                  <strong>Location:</strong> {event.location}
                </Card.Text>
                <Card.Text>
                  <strong>Participants:</strong> {event.participants}
                </Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <Link to={`/events/${event._id}/participants`}>
                    <Button variant="info" className="me-2">
                      <FaUsers /> Participants
                    </Button>
                  </Link>
                  <Link to={`/events/${event._id}/edit`}>
                    <Button variant="warning" className="me-2">
                      <FaEdit /> Update
                    </Button>
                  </Link>
                  <Button onClick={() => handleDelete(event._id)} variant="danger">
                    <FaTrashAlt /> Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    );
  } else if (status === 'failed') {
    content = <div className="error">{error}</div>;
  }

  return (
    <Container className="event-list-container">
      <div className="d-flex justify-content-end mb-4">
        <Link to="/events/new">
          <Button variant="primary" className="add-event-button">
            <span className="plus-icon">+</span> New Event
          </Button>
        </Link>
      </div>
      <h2 className="mb-4">Events</h2>
      {content}
      <Pagination className="mt-4">
        <Pagination.Prev
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        />
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </Container>
  );
};

export default EventList;
