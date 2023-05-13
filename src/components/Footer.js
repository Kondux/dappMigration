import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  IconButton,
  Input,
  Stack,
  Text,
  HStack,
  Flex,
} from "@chakra-ui/react";
import * as React from "react";
import {
  FaTwitter,
  FaDiscord,
  FaMedium,
  FaInstagram,
  FaTelegram,
  FaYoutube,
} from "react-icons/fa";
import Logo from "./Logo";

const Footer = () => (
  <>
    <Box bg="bg-accent" color="on-accent">
      <Container as="footer" role="contentinfo">
        <Stack
          spacing="1"
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          py={{ base: "3", md: "8" }}
        >
          {/* <Stack
          spacing={{ base: "6", md: "8" }}
          align="center"
          justify="center"
          w="100%"
        > */}
          {/* <Logo />

          <Stack spacing="4" align="center" justify="center" w="100%">
            <Text fontSize="sm" fontWeight="semibold" color="on-accent-subtle">
              Stay up to date
            </Text>
            <Stack
              spacing="4"
              direction={{ base: "column", sm: "row" }}
              maxW={{ lg: "360px" }}
            >
              <Flex d="column">
                <Input
                  placeholder="Enter your email"
                  type="email"
                  required
                  variant="outline-on-accent"
                />

                <Button
                  variant="primary-on-accent"
                  type="submit"
                  flexShrink={0}
                >
                  Subscribe
                </Button>
              </Flex>
            </Stack>
          </Stack> */}

          {/* <Text color="on-accent-muted">
            Kondux is a virtual design lab for artists and brands. We create
            Web3 SAAS integration solutions for Metaverse NFT projects that act
            as a conduit to merge creativity and blockchain technology together.
          </Text> */}
          {/* </Stack> */}
          {/* <Stack
          direction={{ base: "column-reverse", md: "column", lg: "row" }}
          spacing={{ base: "12", md: "8" }}
        >
          <Stack direction="row" spacing="8">
            <Stack spacing="4" minW="36" flex="1">
              <Text
                fontSize="sm"
                fontWeight="semibold"
                color="on-accent-subtle"
              >
                Product
              </Text>
              <Stack spacing="3" shouldWrapChildren>
                <Button variant="link-on-accent">How it works</Button>
                <Button variant="link-on-accent">Pricing</Button>
                <Button variant="link-on-accent">Use Cases</Button>
              </Stack>
            </Stack>
            <Stack spacing="4" minW="36" flex="1">
              <Text
                fontSize="sm"
                fontWeight="semibold"
                color="on-accent-subtle"
              >
                Legal
              </Text>
              <Stack spacing="3" shouldWrapChildren>
                <Button variant="link-on-accent">Privacy</Button>
                <Button variant="link-on-accent">Terms</Button>
                <Button variant="link-on-accent">License</Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack> */}
        </Stack>
        <Divider style={{ marginTop: "50px" }} borderColor="bg-accent-subtle" />
        <Stack
          pt="3"
          pb="6"
          justify="space-between"
          direction={{ base: "column-reverse", md: "row" }}
          align="center"
        >
          <Text style={{ zIndex: 4 }} fontSize="sm" color="on-accent-subtle">
            &copy; {new Date().getFullYear()} Kondux, All rights reserved.
          </Text>
          <ButtonGroup variant="ghost-on-accent">
            <IconButton
              as="a"
              href="https://discord.gg/kondux"
              target="_blank"
              aria-label="Discord"
              icon={<FaDiscord fontSize="1.25rem" />}
            />
            <IconButton
              as="a"
              href="https://twitter.com/Kondux_KNDX"
              target="_blank"
              aria-label="Twitter"
              icon={<FaTwitter fontSize="1.25rem" />}
            />

            <IconButton
              as="a"
              href="https://medium.com/@kondux-web3-technologies"
              target="_blank"
              aria-label="Medium"
              icon={<FaMedium fontSize="1.25rem" />}
            />
            <IconButton
              as="a"
              href="https://www.instagram.com/kondux_kndx/"
              target="_blank"
              aria-label="Instagram"
              icon={<FaInstagram fontSize="1.25rem" />}
              // style={{ zIndex: -1 }}
            />

            <IconButton
              as="a"
              href="https://www.youtube.com/channel/UCyzk-20MoubzfHihaF8NByA"
              target="_blank"
              aria-label="Youtube"
              icon={<FaYoutube fontSize="1.25rem" />}
              // style={{ zIndex: -1 }}
            />
          </ButtonGroup>
        </Stack>
      </Container>
    </Box>
    <div style={{ marginBottom: "69px" }}></div>
  </>
);

export default Footer;
