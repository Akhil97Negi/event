import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Navbar from './pages/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Events from './pages/Event';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </Router>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
