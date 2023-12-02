import { View, Text, FlatList, Image, TextBase, Pressable } from "react-native";
import React from "react";
import { IconButton, TextInput } from "react-native-paper";
const data = [
  {
    name: "foulen",
    lastName: "benfoulen",
    phone: "1256325",
  },
  {
    name: "foulen0",
    lastName: "benfoulen",
    phone: "5856325",
  },
];
export default function ListProfile() {
  return (
    <View>
      <Text
        style={{
          color: "white",
          textAlign: "center",
          fontSize: 50,
          fontWeight: "500",
        }}
      >
        listProfile
      </Text>
      <TextInput
        placeholder="Search"
        left={<TextInput.Icon icon="account-search" />}
      ></TextInput>
      <FlatList
        ItemSeparatorComponent={() => (
          <View style={{ backgroundColor: "#00000000", height: 5 }} />
        )}
        sep
        data={data}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                padding: 20,
                margin: 5,
                borderRadius: 20,
                backgroundColor: "white",
                flexDirection: "row",
                flexWrap: "nowrap",
                alignContent: "space-between",
                justifyContent: "space-between",
              }}
            >
              <Image
                source={require("../../assets/1053244.png")}
                style={{
                  height: 50,
                  width: 50,
                }}
              />
              <View style={{ flexDirection: "column" }}>
                <Text>{item.name}</Text>
                <Text>{item.lastName}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <IconButton icon={"phone"} style={{ alignSelf: "flex-end" }} />
                <IconButton icon={"message"} />
              </View>
            </View>
          );
        }}
        style={{
          width: "85%",
          height: "100%",
          margin: 20,
        }}
      ></FlatList>
    </View>
  );
}
