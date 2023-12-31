import {
  View,
  Text,
  FlatList,
  Image,
  TextBase,
  Pressable,
  Touchable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { Button, Dialog, IconButton, TextInput } from "react-native-paper";
import firebase from "../../config";
import { useEffect } from "react";

const database = firebase.database();

export default function ListProfile(props) {
  const current = props.route.params.current;

  const ref_profil = database.ref("profils");
  const [data, setdata] = useState([]);
  const [currentItem, setcurrentItem] = useState({});
  const [item, setitem] = useState();
  [showDialog, setshowDialog] = useState(false);
  useEffect(() => {
    ref_profil.on("value", (snapshot) => {
      var d = [];
      if (snapshot) {
        snapshot.forEach((profil) => {
          if (profil.val().id == current) {
            setcurrentItem(profil.val());
          } else {
            d.push(profil.val());
          }
        });
      }
      setdata(d);
    });

    return () => {
      ref_profil.off();
    };
  }, []);

  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require("../../assets/wallpaper.png")}
    >
      <SafeAreaView
        style={{
          justifyContent: "center",
        }}
      >
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
          style={{
            marginHorizontal: 20,
            backgroundColor: "#ffffff7e",
          }}
          mode="outlined"
          outlineStyle={{
            borderRadius: 50,
            borderColor: "transparent",
          }}
          underlineColor="transparent"
          left={<TextInput.Icon icon="account-search" />}
        ></TextInput>

        <FlatList
          ItemSeparatorComponent={() => (
            <View style={{ backgroundColor: "#00000000", height: 5 }} />
          )}
          data={data}
          renderItem={({ item }) => {
            return (
              <TouchableWithoutFeedback
                onPress={() => {
                  props.navigation.navigate("chat", { dest: item });
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    padding: 20,
                    margin: 5,
                    borderRadius: 20,
                    backgroundColor: "#ffffffe6",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    alignContent: "space-between",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setitem(item);
                      setshowDialog(true);
                    }}
                  >
                    <Image
                      source={
                        item.url
                          ? { uri: item.url }
                          : require("../../assets/1053244.png")
                      }
                      style={{
                        height: 50,
                        width: 50,
                        borderRadius: 25,
                      }}
                    />
                  </TouchableOpacity>
                  <View style={{ flexDirection: "column" }}>
                    <Text>{item.name}</Text>
                    <Text>{item.lastName}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <IconButton
                      icon={"phone"}
                      style={{ alignSelf: "flex-end" }}
                    />
                    <IconButton icon={"message"} />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            );
          }}
          style={{
            width: "85%",
            height: "100%",
            margin: 20,
          }}
        ></FlatList>
        <Dialog
          visible={showDialog}
          onDismiss={() => {
            setshowDialog(false);
          }}
        >
          <Dialog.Title>Profile Details </Dialog.Title>
          <Dialog.Content>
            <Text>{item?.lastName}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                setshowDialog(false);
              }}
            >
              Cancel
            </Button>
            <IconButton icon="phone"></IconButton>
            <IconButton icon="message"></IconButton>
          </Dialog.Actions>
        </Dialog>
      </SafeAreaView>
    </ImageBackground>
  );
}
