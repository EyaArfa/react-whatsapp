import { View, Text, TextInput, Image, StyleSheet, Button } from "react-native";
import React from "react";
import firebase from "../../config";
import { useState } from "react";
const database = firebase.database();
export default function Account() {
  [nom, setName] = useState();
  [lastName, setLastName] = useState();
  [phone, setPhone] = useState();

  return (
    <View
      style={{
        alignContent: "center",
        flex: 1,
        margin: 10,
        justifyContent: "center",
        gap: 10,
      }}
    >
      <Text
        style={{
          color: "white",
          textAlign: "center",
          fontSize: 50,
          fontWeight: "900",
        }}
      >
        Profil
      </Text>
      <Image
        source={require("../../assets/1053244.png")}
        style={{
          width: 100,
          alignSelf: "center",
          height: 100,
        }}
      ></Image>
      <TextInput
        style={styles.input}
        onChangeText={(txt) => setName(txt)}
        placeholder="Name"
      ></TextInput>
      <TextInput
        style={styles.input}
        onChangeText={(txt) => setLastName(txt)}
        placeholder="LastName"
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder="Phone"
        keyboardType="phone-pad"
        onChangeText={(txt) => setPhone(txt)}
      ></TextInput>
      <Button
        onPress={() => {
          const refProf = database.ref("profils");
          const key = refProf.push().key;
          const refOne = refProf.child("profil" + key);
          refOne.set({
            name: nom,
            lastName: lastName,
            phone: phone,
          });
        }}
        title="Save"
        style={styles.btn}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    textAlign: "center",
    backgroundColor: "white",
    borderRadius: 10,
    height: 40,
  },
  btn: {
    justifyContent: "space-evenly",
    alignContent: "space-around",
    borderRadius: 20,
  },
});
