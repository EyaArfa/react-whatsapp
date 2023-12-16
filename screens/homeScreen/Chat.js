import {
  View,
  Text,
  FlatList,
  TextInput,
  ImageBackground,
  SafeAreaView,
  Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { IconButton } from "react-native-paper";
import firebase from "../../config";
import LottieView from "lottie-react-native";
const database = firebase.database();
export default function Chat({ route }) {
  const { dest } = route.params;
  ref_chats = database.ref("chats");
  var room_id;
  const current = firebase.auth().currentUser.uid;

  if (current < dest.id) room_id = dest.id + current;
  else room_id = current + dest.id;
  ref_room = ref_chats.child(room_id);
  const msg_key = ref_room.push().key;
  const msg_ref = ref_room.child("msg");
  const msg = msg_ref.child(msg_key);
  const typing = ref_room.child("typing");
  const txtinput = useRef();
  const [text, setText] = useState();
  const [data, setdata] = useState([]);
  const [type, settype] = useState(false);
  useEffect(() => {
    msg_ref.on("value", (snapshot) => {
      var d = [];
      if (snapshot) {
        snapshot.forEach((room) => {
          d.push(room.val());
        });
      }
      setdata(d);
    });
  }, []);
  useEffect(() => {
    typing.on("value", (snapshot) => {
      destination = dest.id;
      console.log(snapshot);

      if (snapshot.val()[destination]) settype(true);
    });
  }, [typing]);

  return (
    <ImageBackground
      source={require("../../assets/wallpaper.png")}
      style={{
        flex: 1,
      }}
    >
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flexWrap: "wrap",
            justifyContent: "space-between",
            backgroundColor: "#ffffffaa",
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
            paddingTop: 40,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={
                dest.url
                  ? { uri: dest.url }
                  : require("../../assets/1053244.png")
              }
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
              }}
            />

            <Text
              style={{
                fontSize: 20,
              }}
            >
              {dest.name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <IconButton icon={"phone"} style={{ alignSelf: "flex-end" }} />
            <IconButton icon={"image-area"} style={{ alignSelf: "flex-end" }} />
          </View>
        </View>
        <FlatList
          style={{ alignContent: "stretch", padding: 10 }}
          data={data}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  backgroundColor:
                    item.from == current ? "#ffffffc3" : "#fdd9c4c3",
                  margin: 5,
                  padding: 6,
                  borderRadius: 5,
                  alignSelf: item.from == current ? "flex-end" : "flex-start",
                  overflow: "scroll",
                  maxWidth: 300,
                  width: "60%",
                }}
              >
                <Text>{item.body}</Text>
              </View>
            );
          }}
        ></FlatList>
        <View
          style={{
            display: "flex",
            paddingVertical: 10,
            flexDirection: "row",
            justifyContent: "space-evenly",
            backgroundColor: "#ffffff77",
            alignItems: "center",
          }}
        >
          {type ? (
            <LottieView
              source={require("../../assets/animateTyping.json")}
              autoPlay
              loop
              autoSize
              style={{
                width: 10,
                height: 30,
                bottom: 30,
              }}
            />
          ) : null}
          <TextInput
            ref={txtinput}
            style={{
              width: "80%",
              alignContent: "center",
              padding: 10,

              borderRadius: 20,
              backgroundColor: "#ffffffc4",
            }}
            placeholder="enter your message here"
            onChangeText={(newText) => setText(newText)}
            onFocus={() => {
              typing.child(current).set(true);
            }}
            onBlur={() => {
              typing.child(current).set(false);
              console.log("done");
            }}
            multiline={true}
          ></TextInput>
          <IconButton
            icon="send"
            onPress={() => {
              msg.set({
                to: dest.id,
                from: current,
                body: text,
                date: Date.now(),
              });
              txtinput.current.blur();
              txtinput.current.clear();
            }}
          ></IconButton>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
