import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  Button,
  Touchable,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import React from "react";
import firebase from "../../config";
import { useState } from "react";
const database = firebase.database();
export default function Account(props) {
  const current = props.route.params.current;
  console.log(
    "🚀 ~ file: account.js:19 ~ props.route.params.:",
    props.route.params
  );
  console.log("🚀 ~ file: account.js:54 ~ .then ~ id:", current);
  [nom, setName] = useState();
  [lastName, setLastName] = useState();
  [phone, setPhone] = useState();
  [defaultUri, setdefault] = useState(true);
  [uri, seturi] = useState(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      console.log("-------------------------->", result.assets[0].uri);
      setdefault(false);
      seturi(result.assets[0].uri);
      console.log("--------------------->>>>>>", uri);
    }
  };
  const imageToBlob = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob"; //bufferArray
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    return blob;
  };

  const uploadLocalImage = async (uriLocal) => {
    //convert image
    const blob = await imageToBlob(uriLocal);
    //upload blob
    const storage = firebase.storage();
    const ref_images = storage.ref("images");
    const ref_image = ref_images.child("image" + current + ".jpg");
    await ref_image.put(blob);
    //get image url
    const url = ref_image.getDownloadURL();
    return url;
  };
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
      <TouchableOpacity
        onPress={() => {
          pickImage();
        }}
      >
        <Image
          source={
            defaultUri ? require("../../assets/1053244.png") : { uri: uri }
          }
          style={{
            width: 100,
            alignSelf: "center",
            height: 100,
          }}
        ></Image>
      </TouchableOpacity>

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
        onPress={async () => {
          var url = null;
          const refProf = database.ref("profils");
          console.log("before upload");
          if (uri !== null) {
            url = await uploadLocalImage(uri);
          }
          console.log("🚀 ~ file: account.js:130 ~ onPress={ ~ url:", url);
          const refOne = refProf.child("profil" + current);
          refOne.set({
            id: current,
            name: nom,
            lastName: lastName,
            phone: phone,
            url: url,
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
