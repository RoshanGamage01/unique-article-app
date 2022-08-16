import React, { useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import {View, SafeAreaView, ScrollView, TextInput, Text, Image, StyleSheet, TouchableOpacity, ImageBackground, Linking} from "react-native";
import ArticleCard from "../components/ArticleCards";

function Profile() {
  const [token, setToken] = useState("");
  const [error, setError] = useState();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [profileDetails, setProfileDetails] = useState({
    me: { profileImage: "", title: "", firstName: "", lastName: ""},
    article: [],
  })

  const getProfileDetails = (token) => {
    axios.get("https://uniquearticle.azurewebsites.net/api/user/me", {
        headers: { "x-auth-token": token},
      }).then(r => {
        try {
            return setProfileDetails(r.data);
          } catch (ex) {
            console.log(ex);
          }
      })
      .catch((err) => console.log(err.response.data));
  }

  useEffect(() => {
    SecureStore.getItemAsync("auth-token").then((t) => {
      setToken(t);
      t!==null ? getProfileDetails(t) : null
    })
    .catch(err => console.log(err));
  }, [token]);

  const btnLogInOnAction = () => {
    axios
      .post("https://uniquearticle.azurewebsites.net/api/login", data)
      .then((result) => {SecureStore.setItemAsync("auth-token", result.data.token)
              .then(SecureStore.getItemAsync("auth-token")
              .then(t => {
                setToken(t)
                t!==null ? getProfileDetails(t) : setToken(null)
            }))
      })
      .catch((err) => {
        console.log(err.response.data)
        setError(err.response.data);
      });
  };

  const btnLogOutOnAction = () => {
    SecureStore.deleteItemAsync("auth-token")
        .then(
            setToken(null)
        )
  }

  const btnDontHaveAccountOnAction = () => {
    Linking.openURL("https://uniquearticle.netlify.app/register").catch(r => console.log(r))
  }

  const btnCreateNewArticleOnAction = () => {
    Linking.openURL(`https://uniquearticle.netlify.app/article/new/${profileDetails.me._id}`).catch(r => console.log(r))
  }

  return (
    <View>
      {token === null ? (
        <SafeAreaView>
          <ScrollView>
            <View style={{ alignItems: "center" }}>
              <ImageBackground
                style={styles.img}
                source={require("../assets/images/splsh-bg.webp")}
              >
                <Text style={styles.title}>Log In</Text>
              </ImageBackground>
            </View>
            <View style={styles.container}>
              <View style={error ? styles.error : { display: "none" }}>
                <Text style={{ color: "white", fontWeight: "500" }}>
                  {error}
                </Text>
              </View>
              <View style={{ width: "100%" }}>
                <Text
                  style={{ marginBottom: 5, fontSize: 15, fontWeight: "500" }}
                >
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
              </View>
              <View style={{ width: "100%" }}>
                <Text
                  style={{ marginBottom: 5, fontSize: 15, fontWeight: "500" }}
                >
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
              <TouchableOpacity style={styles.btn} onPress={btnLogInOnAction}>
                <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}> Log In </Text>
              </TouchableOpacity>
              <View style={{flexDirection: "row", marginTop: 20}}>
                <Text>Dont have a account ? </Text>
                <TouchableOpacity onPress={btnDontHaveAccountOnAction}>
                    <Text style={{color: "#0078d4"}}>
                        Register
                    </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      ) : (
        <SafeAreaView>
            <ScrollView>
                <View style={profile_style.container}>
                    <View style={profile_style.profileImageContainer}>
                        <Image source={{uri: profileDetails.me.profileImage ? profileDetails.me.profileImage : "https://c.tenor.com/kxZxwvPdm-wAAAAC/loading-loading-screen.gif"}} style={profile_style.profileImageContainer.profileImage}/>
                    </View>
                    <View style={{marginTop: 20}}>
                        <Text style={profile_style.name}>{profileDetails.me.firstName ? profileDetails.me.firstName + " " + profileDetails.me.lastName : "Loading.."}</Text>
                        <Text style={profile_style.email}>{profileDetails.me.email ? profileDetails.me.email : "Loading..."}</Text>
                    </View>
                    <TouchableOpacity style={{paddingVertical: 20}}>
                        <Text style={{color: "darkred", fontSize: 20}} onPress={btnLogOutOnAction}>Log out</Text>
                    </TouchableOpacity>
                    <View style={profile_style.captions}>
                        <Text style={{fontSize: 15, fontWeight: "600"}}>My articles</Text>
                        <TouchableOpacity style={profile_style.captions.btn} onPress={btnCreateNewArticleOnAction}>
                            <Text style={{fontSize: 20}}>+</Text>
                            <Text style={{fontSize: 15}}> Create New Article</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: "column-reverse", paddingTop: 20,}}>
                        {
                            profileDetails.article.map(item => {
                                return (
                                    <ArticleCard data={item} key={item._id} />
                                    )
                            })
                        }
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
      )}
    </View>
  );
}

const profile_style = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingVertical: 20,
        paddingHorizontal: 40
    },
    profileImageContainer: {
        width: 150,
        height: 150,
        borderRadius: 75,
        overflow: "hidden",
        backgroundColor: "#8e8e8e",
        justifyContent: "center",
        alignContent: "center",
        profileImage: {
            aspectRatio: 1
        }
    },
    name: {
        fontSize: 30,
        fontWeight: "800",
    },
    email: {
        fontSize: 16,
    },
    captions: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 10,
        paddingVertical: 10,
        justifyContent: "space-between",
        btn:{
            flexDirection: "row",
            alignItems: "center"
        }
    },
})

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

export default Profile;
