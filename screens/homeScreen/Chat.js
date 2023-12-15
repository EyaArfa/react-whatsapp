import { View, Text, FlatList, TextInput } from "react-native";
import React from "react";
import { Button, IconButton } from "react-native-paper";

export default function Chat() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <FlatList style={{ alignContent: "stretch" }} data={[]}></FlatList>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <TextInput
          style={{
            width: "70%",
            height: 20,
          }}
          placeholder="enter your message here"
        ></TextInput>
        <IconButton icon="send"></IconButton>
      </View>
    </View>
  );
}
