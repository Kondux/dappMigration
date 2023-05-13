import { Button, HStack, Icon, Text } from "@chakra-ui/react";
import React from "react";

export const NavButton = (props) => {
  const { icon, label, ...buttonProps } = props;
  return (
    <Button variant="ghost" justifyContent="start" {...buttonProps}>
      <HStack spacing="3">
        <Icon as={icon} boxSize="6" />
        <Text>{label}</Text>
      </HStack>
    </Button>
  );
};
