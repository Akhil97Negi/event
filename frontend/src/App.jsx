import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import EventList from './components/EventList';
import EventForm from './components/EventForm';

const App = () => {
  const { isLoggedIn } = useSelector(state => state.auth);

  return (
    <Router>
      <Navbar />
      <div className="container my-4">
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!isLoggedIn ? <Register /> : <Navigate to="/" />} />
          <Route path="/events" element={isLoggedIn ? <EventList /> : <Navigate to="/login" />} />
          <Route path="/events/new" element={isLoggedIn ? <EventForm /> : <Navigate to="/login" />} />
          <Route path="/events/:eventId/edit" element={isLoggedIn ? <EventForm /> : <Navigate to="/login" />} />
          <Route path="/events/:eventId/participants" element={isLoggedIn ? <div>Participants Page</div> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
