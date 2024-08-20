import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  VStack,
  useToast,
  useBreakpointValue,
} from '@chakra-ui/react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { status, error } = useSelector((state) => state.user);

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await dispatch(userLogin({ email, password }));
    if (userLogin.fulfilled.match(result)) {
      toast({
        title: 'Login successful.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/');
    } else {
      toast({
        title: 'Login failed.',
        description: error || 'Incorrect credentials.',
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
          Login
        </Heading>
        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <VStack spacing={4} align="stretch">
            <FormControl id="email" isRequired>
              <FormLabel color="blue.600">Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              Login
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

export default Login;
