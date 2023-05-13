import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  // Center,
  // Image,
  Flex,
  Button,
  Input,
  // InputRightElement,
  // InputGroup,
  // FormControl,
  FormLabel,
  // FormErrorMessage,
  // FormHelperText,
  useColorMode,
  Spacer,
} from "@chakra-ui/react";
import { useMoralis } from "react-moralis";
import { useField, Formik, Form } from "formik";
import * as yup from "yup";

function SettingsTab() {
  const { isAuthenticated, user } = useMoralis();
  const userName = user?.get("username");
  // const walletAddress = user?.get("ethAddress");
  const [username, setUsername] = useState();
  const [show, setShow] = React.useState(false);
  // const handleClick = () => setShow(!show);
  const { colorMode, toggleColorMode } = useColorMode();
  const [color, setColor] = useState("#F37701");

  useEffect(() => {
    if (colorMode === "light") {
      setColor("purple");
    } else {
      setColor("#F37701");
    }
  }, [colorMode]);

  const loginSchema = yup.object({
    name: yup
      .string("Enter your User Name")
      .trim("User name cannot include leading and trailing spaces")
      .min(2, "User Name should be of minimum 2 characters length")
      .max(30, "User Name can only be of maximum 30 characters length")
      .required("User Name is required"),
  });

  const MyTextField = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <>
        <label>
          {label}
          <Input {...field} {...props} />
        </label>
        {meta.touched && meta.error ? (
          <div style={{ color: "#63B3ED" }} className="error">
            {meta.error}
          </div>
        ) : null}
      </>
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="metaContainer">
        <Box>
          <p1>You need to connect your wallet first.</p1>
        </Box>
      </div>
    );
  }

  return (
    <>
      <div
        className="UserContainer"
        style={{ width: "90vw", marginTop: "69px" }}
      >
        <Container>
          <Formik
            initialValues={{ name: "" }}
            validationSchema={loginSchema}
            onSubmit={async (values, actions) => {
              let username = values.name;
              user.set("username", username);
              await user.save();
              const newUserName = user.get("username");
              setTimeout(() => {
                alert(
                  `User Name changed to ${newUserName}! Please logout and reconnect to see changes.`
                );
              }, 700);
              actions.setSubmitting(false);
            }}
          >
            {({ touched, errors, isSubmitting }) => (
              <Form>
                <div className="form-group">
                  <FormLabel
                    style={{ color: `${color}`, paddingTop: "15px" }}
                    htmlFor="name"
                  >
                    User Name
                  </FormLabel>
                  <Spacer />

                  <MyTextField
                    id="name"
                    type="text"
                    name="name"
                    placeholder={userName}
                    value={username}
                    color={color}
                    className={`form-control ${
                      touched.name && errors.name ? "is-invalid" : ""
                    }`}
                  />
                </div>

                {/* <div>
                  <FormLabel htmlFor="wallet" style={{ paddingTop: "15px" }}>
                    Wallet Address
                  </FormLabel>
                  <Spacer />
                  <InputGroup size="md">
                    <Input
                      pr="4.5rem"
                      type={show ? { walletAddress } : "password"}
                      placeholder={walletAddress}
                      value={walletAddress}
                      color={color}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </div> */}

                <div>
                  <Flex direction="row-reverse">
                    <Button variant="secondary" type="submit" mt={4}>
                      {isSubmitting ? "Please wait..." : "Submit"}
                    </Button>
                  </Flex>
                </div>
              </Form>
            )}
          </Formik>
        </Container>
      </div>
    </>
  );
}

export default SettingsTab;
