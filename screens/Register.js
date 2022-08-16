import { React, useState, useEffect } from "react";
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import {
  View,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";

function Register() {
  const [error, setError] = useState();
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    profileImage: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    (async () => {
    if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
        alert('Sorry, Camera roll permissions are required to make this work!');
        }
    }
    })}, [])

  const chooseImg = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 3],
        quality: 1,			
        allowsEditing: true,
    });
    // console.log(result.uri);

    if (!result.cancelled) {
        setImage(result.uri);
     }
};

const btnRegisterOnAction = () => {
    const formData = new FormData();
    formData.append("firstName", data.firstName)
    formData.append("lastName", data.lastName)
    formData.append("email", data.email)
    formData.append("password", data.password)
    formData.append("profileImage", image)
    console.log(formData)
    try{
        axios.post("http://localhost:3000/api/user/register", formData, {headers: {'Content-Type': 'multipart/form-data'}})
            .then(
                result => {
                    console.log(result.data)
                }
            ).catch(
                error => console.log(error.response.data)
            )
    }catch (err){
        console.log(err)
    }
}

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <ImageBackground
            style={styles.img}
            source={require("../assets/images/splsh-bg.webp")}
          >
            <Text style={styles.title}>Register</Text>
          </ImageBackground>
        </View>
        <View style={styles.container}>
          <View style={error ? styles.error : { display: "none" }}>
            <Text style={{ color: "white", fontWeight: "500" }}>{error}</Text>
          </View>
          <View style={{ width: "100%" }}>
            {/* first Name ------------------------ */}
            <Text style={{ marginBottom: 5, fontSize: 15, fontWeight: "500" }}>
              {" "}
              First Name{" "}
            </Text>
            <TextInput
              placeholder="First Name"
              style={styles.input}
              value={data.firstName}
              autoCapitalize="none"
              onChangeText={(e) =>
                setData((oldVal) => ({ ...oldVal, firstName: e }))
              }
            />
            {/* last Name ------------------------- */}
            <Text style={{ marginBottom: 5, fontSize: 15, fontWeight: "500" }}>
              Last Name
            </Text>
            <TextInput
              placeholder="Last Name"
              style={styles.input}
              value={data.lastName}
              autoCapitalize="none"
              onChangeText={(e) =>
                setData((oldVal) => ({ ...oldVal, lastName: e }))
              }
            />
            {/* Select a profile Image */}
            <Text style={{ marginBottom: 5, fontSize: 15, fontWeight: "500" }}>
              Profile Image
            </Text>
           <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-around", marginVertical: 20}}>
            {image ? <Image source={{url: image}} style={{width: 100, aspectRatio: 1, borderRadius: 50}}/> : <View style={{width: 100, aspectRatio: 1, borderRadius: 50, backgroundColor: "#dddddd"}}></View>}
           {/* <Button title="Choose" onPress={chooseImg} style={{backgroundColor: "black"}}/> */}
           <TouchableOpacity onPress={chooseImg} style={{backgroundColor: "black", paddingHorizontal: 20, paddingVertical: 20, borderRadius: 10}}>
                <Text style={{color: "white"}}>
                    Select a profile picture
                </Text>
           </TouchableOpacity>
           </View>
            {/* Email ------------------------- */}
            <Text style={{ marginBottom: 5, fontSize: 15, fontWeight: "500" }}>
              E-mail
            </Text>
            <TextInput
              placeholder="E-mail"
              style={styles.input}
              value={data.email}
              autoCapitalize="none"
              onChangeText={(e) =>
                setData((oldVal) => ({ ...oldVal, email: e }))
              }
            />

            {/* Password ------------------------- */}
            <Text style={{ marginBottom: 5, fontSize: 15, fontWeight: "500" }}>
              Password
            </Text>
            <TextInput
              placeholder="Password"
              style={styles.input}
              value={data.password}
              onChangeText={(e) =>
                setData((oldVal) => ({ ...oldVal, password: e }))
              }
            />
          </View>
          <TouchableOpacity style={styles.btn} onPress={btnRegisterOnAction}>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 40,
    marginBottom: 200,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 50,
    fontWeight: "600",
    marginBottom: 20,
    color: "white",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  btn: {
    width: "100%",
    paddingVertical: 20,
    backgroundColor: "black",
    alignItems: "center",
    borderRadius: 10,
  },
  img: {
    width: "150%",
    alignItems: "center",
    aspectRatio: 2,
    // borderRadius: "100%",
    borderBottomLeftRadius: 400,
    borderBottomRightRadius: 400,
    overflow: "hidden",
    justifyContent: "center",
  },
  error: {
    backgroundColor: "tomato",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
});

export default Register;
