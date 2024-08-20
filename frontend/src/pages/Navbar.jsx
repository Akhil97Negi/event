import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';
import {
  Box,
  Flex,
  HStack,
  Link as ChakraLink,
  Button,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useBreakpointValue,
  IconButton,
  Stack,
  Text
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

const Navbar = () => {
  const { user, role } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleLogout = () => {
    dispatch(logout());
  };

  const Links = () => (
    <HStack spacing={4} align="center">
      <ChakraLink as={Link} to="/" fontSize="lg" fontWeight="semibold">
        Home
      </ChakraLink>
      {user && (
        <>
          {role === 'admin' && (
            <ChakraLink as={Link} to="/admin" fontSize="lg" fontWeight="semibold">
              Admin
            </ChakraLink>
          )}
          <ChakraLink as={Link} to="/events" fontSize="lg" fontWeight="semibold">
            Events
          </ChakraLink>
        </>
      )}
      {!user && (
        <>
          <ChakraLink as={Link} to="/login" fontSize="lg" fontWeight="semibold">
            Login
          </ChakraLink>
          <ChakraLink as={Link} to="/register" fontSize="lg" fontWeight="semibold">
            Register
          </ChakraLink>
        </>
      )}
    </HStack>
  );

  return (
    <Box bg="teal.600" color="white" px={4} py={2}>
      <Flex align="center" justify="space-between">
        {isMobile ? (
          <>
            <IconButton
              icon={<HamburgerIcon />}
              variant="outline"
              colorScheme="whiteAlpha"
              onClick={onOpen}
              aria-label="Open menu"
              size="lg"
              borderRadius="full"
              color="white" // Set icon color
              bg="teal.500" // Set background color
              _hover={{ bg: 'teal.400' }} // Background color on hover
              _active={{ bg: 'teal.600' }} // Background color on active
            />
            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Menu</DrawerHeader>
                <DrawerBody>
                  <Stack spacing={4} as="nav">
                    <Links />
                    {user && (
                      <Button
                        colorScheme="teal"
                        variant="solid"
                        onClick={handleLogout}
                        size="lg"
                        width="full"
                      >
                        Logout
                      </Button>
                    )}
                  </Stack>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </>
        ) : (
          <>
            <Text fontSize="2xl" fontWeight="bold" color="white">
              MyApp
            </Text>
            <HStack spacing={4} align="center">
              <Links />
              {user && (
                <Button
                  colorScheme="teal"
                  variant="outline"
                  onClick={handleLogout}
                  size="lg"
                  borderRadius="full"
                >
                  Logout
                </Button>
              )}
            </HStack>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
