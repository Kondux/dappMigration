import {
  Badge,
  Box,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FiArrowDownRight,
  FiArrowUpRight,
  FiMoreVertical,
} from "react-icons/fi";
import { RiShareCircleFill } from "react-icons/ri";

export const Stat = (props) => {
  const { label, value, delta, ...boxProps } = props;

  return (
    <Box
      variant="elevated"
      px={{
        base: "4",
        md: "6",
      }}
      py={{
        base: "5",
        md: "6",
      }}
      bg="transparent"
      borderRadius="lg"
      boxShadow="2xl"
      {...boxProps}
    >
      <Stack bg="transparent">
        <HStack justify="space-between">
          <Text fontSize="sm" color="white">
            {label}
          </Text>
          <a target="_blank" rel="noreferrer" href={props.link}>
            <RiShareCircleFill />{" "}
          </a>
          {/* <Icon as={FiMoreVertical} boxSize="5" color="muted" /> */}
        </HStack>
        <HStack justify="space-between">
          <Heading
            size={{
              base: "sm",
              md: "md",
            }}
            color={useColorModeValue("purple", "#F37701")}
          >
            {value}
          </Heading>
          <Badge
            variant="subtle"
            colorScheme={delta.isUpwardsTrend ? "green" : "red"}
          >
            <HStack spacing="1">
              <Icon
                as={delta.isUpwardsTrend ? FiArrowUpRight : FiArrowDownRight}
              />
              <Text>{delta.value}% BOOST</Text>
            </HStack>
          </Badge>
        </HStack>
      </Stack>
    </Box>
  );
};
