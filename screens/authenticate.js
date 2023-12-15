import { useRef, useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import firebase from "../config";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
const auth = firebase.auth();
export default function Authenticate(props) {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const input2 = useRef();
  const schema = yup.object().shape({
    email: yup.string().required("Email is required").email("Invalid email"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must contain at least 6 characters"),
  });

  return (
    <View style={styles.image}>
      <ImageBackground
        source={require("../assets/download.jpeg")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.widgetContainder}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 30,
              fontWeight: "700",
              color: "#00000080",
            }}
          >
            Authenticate
          </Text>
          <Formik
            validationSchema={schema}
            initialValues={{ email: "", password: "" }}
            //change on submit function
            onSubmit={(values) => {
              auth
                .signInWithEmailAndPassword(values.email, values.password)
                .then(() => {
                  const id = auth.currentUser.uid;

                  props.navigation.navigate("home", { id });
                })
                .catch((err) => {
                  alert(err.message);
                });
            }}
          >
            {({
              handleChange,
              handleSubmit,
              values,
              handleBlur,
              errors,
              isValid,
            }) => (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  onSubmitEditing={() => {
                    input2.current.focus();
                  }}
                  blurOnSubmit={false}
                  keyboardType="email-address"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                ></TextInput>
                {errors.email && (
                  <Text style={{ fontSize: 10, color: "red" }}>
                    {errors.email}
                  </Text>
                )}
                <TextInput
                  ref={input2}
                  style={styles.input}
                  placeholder="password"
                  textContentType="password"
                  secureTextEntry={true}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                ></TextInput>
                {errors.password && (
                  <Text style={{ fontSize: 10, color: "red" }}>
                    {errors.password}
                  </Text>
                )}
                <View style={styles.btnContainer}>
                  <Button
                    title="Sign in"
                    style={styles.btn}
                    onPress={
                      handleSubmit
                      // () => {}
                    }
                    color="rgba(141, 85, 146, 1)"
                    disabled={!isValid}
                  />
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate("sign_up")}
                  >
                    <Text style={{ color: "white", fontWeight: "700" }}>
                      Create New User
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnContainer: {
    flexDirection: "column",
    gap: 5,
    alignItems: "center",
  },
  widgetContainder: {
    backgroundColor: "rgba(255,255,255,0.3)",
    padding: 20,

    flexDirection: "column",
    gap: 10,
  },

  image: {
    flex: 1,
    justifyContent: "center",
  },

  input: {
    textAlign: "center",
    backgroundColor: "white",
    borderRadius: 10,
    height: 40,
  },
  btn: {
    justifyContent: "space-evenly",
    alignContent: "space-around",
  },
});
