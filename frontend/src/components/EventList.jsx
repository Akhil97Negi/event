import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents, deleteEvent } from '../redux/reducers/eventSlice'; 
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const EventList = () => {
  const dispatch = useDispatch();
  const { events = [], status = 'idle', error = null } = useSelector((state) => state.events);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEvents());
    }
  }, [status, dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteEvent(id));
  };

  let content;

  if (status === 'loading') {
    content = <div>Loading...</div>;
  } else if (status === 'succeeded') {
    content = (
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <h3>{event.name}</h3> {/* Ensure the property name matches your data */}
            <p>{event.date}</p>
            <p>{event.location}</p>
            <Button onClick={() => handleDelete(event._id)} variant="danger">Delete</Button>
          </li>
        ))}
      </ul>
    );
  } else if (status === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <div>
      <h2>Events</h2>
      {content}
      <Link to="/events/new">
        <Button variant="primary">Create New Event</Button>
      </Link>
    </div>
  );
};

export default EventList;
