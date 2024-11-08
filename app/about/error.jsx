import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { WindowWraper } from "../components/WindowWraper";
import { useAuth } from "../service/authservice";

const PageNotFound = () => {

  const {userData} = useAuth()
  return (
    <WindowWraper bg="white">
      <View
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        
        <h1 style={{ color: "#161622", alignSelf: "center" }}>
          Ups sorry {userData?.name} page was not found ):
        </h1>
      </View>
    </WindowWraper>
  );
};

export default PageNotFound;

const styles = StyleSheet.create({});
