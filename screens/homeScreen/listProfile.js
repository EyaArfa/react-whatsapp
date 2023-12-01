import { View, Text, FlatList } from "react-native";
import React from "react";
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
          fontWeight: "900",
        }}
      >
        listProfile
      </Text>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                backgroundColor: "white",
              }}
            >
              <Text>{item.name}</Text>
              <Text>{item.lastName}</Text>
              <Text>{item.phone}</Text>
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
