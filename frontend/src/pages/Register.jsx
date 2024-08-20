import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Heading,
  Text,
  VStack,
  useToast,
  useBreakpointValue,
} from '@chakra-ui/react';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { status, error } = useSelector((state) => state.user);

  const handleRegister = async (e) => {
    e.preventDefault();
    const result = await dispatch(userRegister(formData));
    if (userRegister.fulfilled.match(result)) {
      toast({
        title: 'Registration successful.',
        description: 'You can now log in.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/login');
    } else {
      toast({
        title: 'Registration failed.',
        description: error || 'An error occurred during registration.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  
  const maxW = useBreakpointValue({ base: 'full', md: 'md' });

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bg="gray.200"
      p={4}
    >
      <Box
        maxW={maxW}
        w="full"
        bg="white"
        p={8}
        borderRadius="lg"
        boxShadow="lg"
        borderWidth={1}
        borderColor="gray.300"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Heading mb={6} textAlign="center" color="blue.600">
          Register
        </Heading>
        <form onSubmit={handleRegister} style={{ width: '100%' }}>
          <VStack spacing={4} align="stretch">
            <FormControl id="username" isRequired>
              <FormLabel color="blue.600">Username</FormLabel>
              <Input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="Enter your username"
                focusBorderColor="blue.500"
                variant="outline"
                bg="gray.50"
                color="blue.800" // Set text color
                _placeholder={{ color: 'blue.500' }} 
                _hover={{ borderColor: 'blue.500' }} 
                _focus={{ borderColor: 'blue.500' }} 
              />
            </FormControl>

            <FormControl id="email" isRequired>
              <FormLabel color="blue.600">Email</FormLabel>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
                focusBorderColor="blue.500"
                variant="outline"
                bg="gray.50"
                color="blue.800" 
                _placeholder={{ color: 'blue.500' }} 
                _hover={{ borderColor: 'blue.500' }} 
                _focus={{ borderColor: 'blue.500' }} 
              />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel color="blue.600">Password</FormLabel>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter your password"
                focusBorderColor="blue.500"
                variant="outline"
                bg="gray.50"
                color="blue.800" 
                                _placeholder={{ color: 'blue.500' }} 
                _hover={{ borderColor: 'blue.500' }} 
                _focus={{ borderColor: 'blue.500' }} 
              />
            </FormControl>

            <FormControl id="role">
              <FormLabel color="blue.600">Role</FormLabel>
              <Select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                focusBorderColor="blue.500"
                variant="outline"
                bg="gray.50"
                color="blue.800" 
                _hover={{ borderColor: 'blue.500' }} 
                _focus={{ borderColor: 'blue.500' }} 
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Select>
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              w="full"
              isLoading={status === 'loading'}
              size="lg"
              mt={4}
              _hover={{ bg: 'blue.600' }}
              _active={{ bg: 'blue.700' }}
            >
              Register
            </Button>
          </VStack>
        </form>
        {error && (
          <Text color="red.500" mt={4} textAlign="center">
            {error}
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default Register;
