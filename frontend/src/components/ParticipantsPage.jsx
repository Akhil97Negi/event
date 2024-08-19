import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchParticipants } from '../redux/reducers/participantsSlice'; 
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const ParticipantsPage = () => {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const { participants = [], status = 'idle', error = null } = useSelector((state) => state.participants);
  
  useEffect(() => {
    dispatch(fetchParticipants(eventId));
  }, [eventId, dispatch]);

  let content;

  if (status === 'loading') {
    content = <div>Loading...</div>;
  } else if (status === 'succeeded') {
    content = (
      <ul>
        {participants.map(participant => (
          <li key={participant._id}>
            <h4>{participant.name}</h4>
            <p>{participant.email}</p>
          </li>
        ))}
      </ul>
    );
  } else if (status === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <div>
      <h2>Participants for Event</h2>
      {content}
      <Button href={`/events/${eventId}/register`} variant="success">Register New Participant</Button>
    </div>
  );
};

export default ParticipantsPage;
