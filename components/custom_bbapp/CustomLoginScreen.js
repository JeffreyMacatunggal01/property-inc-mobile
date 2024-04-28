import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Modal, TextInput } from "react-native";
import LoginScreen from "@src/containers/Custom/LoginScreen";
import AppButton from "@src/components/AppButton";
import { getExternalCodeSetup } from "@src/externalCode/externalRepo";
// import { AuthApi } from "@src/externalCode/auth";

// define external code entry here to init this screen/file
const externalCodeSetup = getExternalCodeSetup();

const CustomLoginScreen = (props) => {
  const [userToken, setUserToken] = useState(null);
  // define state or item to hold current token
  const [loginAction, setLoginAction] = useState(null);


  const validateUserToken = () => {
    // check userToken expiration
    // if token not expired
        // check if present in database
        // if present in database, do login
        // not present, write/generate a new one
        // loginAction();
    // expired, generate a new one
        // loginAction
    

  }

  return <View></View>;
};
