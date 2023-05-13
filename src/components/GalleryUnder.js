import {
  Flex,
  Avatar,
  Container,
  Box,
  Button,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  HStack,
  Spacer,
  useBreakpointValue,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";
import * as React from "react";
import Logo from "./Logo";
import Footer from "../components/Footer";

const GalleryUnder = () => (
  <>
    <Flex direction="column">
      <Container>
        <Flex
          style={{ height: "55vh" }}
          alignItems="center"
          justifyContent="center"
        >
          <Box style={{ height: "30vh" }}>
            <Flex
              style={{ height: "20vh" }}
              alignItems="space-around"
              justifyContent="space-around"
              flexDirection="column"
            >
              <Logo
                logo={[
                  { src: "/images/logo/logo-white.png" },
                  { src: "/images/logo/logo-white.png" },
                ]}
              />

              <Spacer />
              <Text textAlign="center">
                Gallery Is Under <span>Maintanance</span>
              </Text>
              <Spacer />

              <Text textAlign="center">Will be up soon!</Text>
            </Flex>
          </Box>
        </Flex>
      </Container>
      <Box style={{ textAlign: "center" }}>
        <Footer />
      </Box>
    </Flex>
  </>
);

export default GalleryUnder;
