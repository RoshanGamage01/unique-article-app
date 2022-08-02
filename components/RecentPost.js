import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

function RecentPost() {
  const [data, setData] = useState({
    title: "",
    description: "",
    image: "https://c.tenor.com/kxZxwvPdm-wAAAAC/loading-loading-screen.gif",
    _id: "",
  });
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get("https://uniquearticle.azurewebsites.net/api/article/post/recent")
      .then((response) => {
        let temp = response.data
        axios.get(`https://uniquearticle.azurewebsites.net/api/user/${temp.writer}`)
            .then(res => temp.writer = res.data.firstName + ' ' + res.data.lastName)
        setData(response.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  const btnOnAction = () => {
    navigation.navigate('Reading', {
        itemId: data._id,
        desc: data.description,
        title: data.title,
        image: data.image,
        date: data.time,
        writer: data.writer
    })
  }

  return (
    <View style={style.container}>
      <ImageBackground
        style={style.image}
        esizeMode="cover"
        source={{
          uri: data.image,
        }}
      >
        <View style={style.postContent}>
          <Text style={style.title}>{data.title}</Text>
          <Text style={style.desc}>
            {data.description.slice(0, 100)}...Read more..
          </Text>
          <TouchableOpacity style={style.btn} onPress={btnOnAction}>
            <Text style={style.btn.btnText}>Read full article</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "black",
  },
  image: {
    width: "100%",
    aspectRatio: 3 / 2,
  },
  postContent: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "500",
    paddingBottom: 10,
  },
  desc: {
    color: "white",
    paddingBottom: 20,
  },
  btn: {
    // width: 100,
    height: 40,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    color: "white",
    btnText: {
      color: "white",
    },
  },
});

export default RecentPost;
