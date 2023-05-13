import React, { useState, useEffect, Component } from "react";
import App from "./App";
import {
  Box,
  Center,
  Flex,
  FormControl,
  Input,
  Stack,
  FormLabel,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import profile from "./components/Images/kondux.png";

function Login() {
  const [access, setAccess] = useState("false");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { colorMode, toggleColorMode } = useColorMode();
  const [color, setColor] = useState("#F37701");

  let formStyle = {
    maxWidth: "350px",
    maxHeight: "525px",
    background: "linear-gradient(#712E6D, grey)",
    borderRadius: "2%",
  };

  useEffect(() => {
    if (colorMode === "light") {
      setColor("purple");
    } else {
      setColor("#F37701");
    }
  }, [colorMode]);

  // function used to control submit event on form.

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target.email.value);

    if (!e.target.username.value) {
      alert("Username is required");
    } else if (!e.target.username.value) {
      alert("Valid Username is required");
    } else if (!e.target.password.value) {
      alert("Password is required");
    } else if (
      e.target.username.value === "eth" &&
      e.target.password.value === "joebideniscool"
    ) {
      alert("Access Granted.");

      e.target.username.value = "";
      e.target.password.value = "";
      setAccess("true");
    } else {
      alert(
        "Current user level is not high enough to access classified information."
      );
    }
  };

  // return <App />;

  return (
    <Box className="App">
      {access === "true" ? (
        <>
          <App />
        </>
      ) : (
        <Box padding={10}>
          <Center>
            <Flex
              p={5}
              flexDirection="column"
              justify="space-evenly"
              align="center"
            >
              <img src={profile} className="logo" alt="Login" />

              <form className="form" onSubmit={handleSubmit}>
                <Flex
                  p={5}
                  flexDirection="column"
                  justify="center"
                  align="center"
                >
                  <FormControl id="username">
                    <Stack
                      p={5}
                      direction={{ base: "column", md: "column" }}
                      // spacing={{ base: "4", md: "5" }}
                      justify="space-between"
                    >
                      <FormLabel variant="inline">Username</FormLabel>
                      <Stack />
                      <Input
                        maxW={{ md: "3xl" }}
                        placeholder=""
                        type="text"
                        value={name}
                        color={color}
                        autocomplete="username"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Stack>
                  </FormControl>

                  <FormControl id="password">
                    <Stack
                      p={5}
                      direction={{ base: "column", md: "column" }}
                      // spacing={{ base: "4", md: "5" }}
                      justify="space-between"
                    >
                      <FormLabel variant="inline">Password</FormLabel>
                      <Stack />
                      <Input
                        maxW={{ md: "3xl" }}
                        placeholder=""
                        type="password"
                        value={password}
                        color={color}
                        autocomplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Stack>
                  </FormControl>

                  {/* 
                <div className="input-group">
                  <label htmlFor="name">Username</label>
                  <input type="name" name="name" placeholder="" />
                </div>

                <div className="input-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" />
                </div> */}

                  <Button size="lg" variant="secondary" type="submit">
                    ENTER
                  </Button>
                </Flex>

                {/* <button className="primary">ENTER</button> */}
              </form>
            </Flex>
          </Center>
        </Box>
      )}

      {/* <h1>This is the start of something Greyt!</h1> */}
    </Box>
  );
}

export default Login;
