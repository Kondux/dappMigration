import {
  Avatar,
  Container,
  Box,
  Button,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  HStack,
  useBreakpointValue,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";
import * as React from "react";
import { FiDownloadCloud } from "react-icons/fi";

export const XRTab = () => (
  <Stack
    spacing={{
      base: "8",
      lg: "6",
    }}
  >
    <Stack
      spacing="4"
      direction={{
        base: "column",
        lg: "row",
      }}
      justify="space-between"
    >
      <Stack spacing="4" padding={10}>
        <Heading
          size={useBreakpointValue({
            base: "xs",
            lg: "sm",
          })}
          fontWeight="medium"
          color="white"
        >
          XR Dashboard
        </Heading>
        <Text color="white">XR CONTENT COMING SOON!</Text>
      </Stack>
      <Stack direction="row" spacing="3"></Stack>
    </Stack>
  </Stack>
);
