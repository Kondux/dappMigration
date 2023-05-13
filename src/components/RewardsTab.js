import {
  Heading,
  Stack,
  Container,
  useBreakpointValue,
} from "@chakra-ui/react";
import Staking from "./Staking/Staking";

import image from "../components/Staking/images/bg/HLX2.png";

import * as React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";

export function RewardsTab() {
  return (
    <>
      <Scrollbars>
        <Stack
          spacing={{
            base: "8",
            lg: "6",
          }}
          style={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <Stack
            spacing="4"
            direction={{
              base: "column",
              lg: "row",
            }}
            justify="center"
          >
            <Stack spacing="4" padding={8}>
              <Heading
                p={useBreakpointValue({
                  base: "0",
                  lg: "4",
                })}
                size={useBreakpointValue({
                  base: "xs",
                  lg: "lg",
                })}
                fontWeight="medium"
                color="white"
              >
                Rewards Staking Dashboard
              </Heading>
            </Stack>
          </Stack>

          <Staking />
        </Stack>
      </Scrollbars>
    </>
  );
}
