import { React, useState, useEffect } from "react";
import axios from "axios";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

function ArticleCard(props) {
  const [writer, setWriter] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get(
        `https://uniquearticle.azurewebsites.net/api/user/${props.data.writer}`
      )
      .then((response) => {
        setWriter(`${response.data.firstName} ${response.data.lastName}`);
      })
      .catch((error) => console.log(error.response.data));
  }, []);

  const cardOnAction = () => {
    navigation.navigate('Reading', {
        itemId: props.data._id,
        desc: props.data.description,
        title: props.data.title,
        image: props.data.image,
        date: props.data.time,
        writer: writer
    })
  }

  return (
    <TouchableOpacity onPress={cardOnAction}>
        <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: props.data.image }} style={styles.image} />
      </View>
      <View>
        <Text style={styles.title}>{props.data.title}</Text>
        <Text style={styles.time}>{props.data.time.slice(0, 10)}</Text>
      </View>
      <View>
        <Text style={styles.desc}>
          {props.data.description.slice(0, 100)}...Read more..
        </Text>
      </View>
      <View style={styles.writer}>
        <Text style={styles.writer.text}>- {writer} -</Text>
      </View>
    </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},
  imageContainer: {
    width: "100%",
    backgroundColor: "black",
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 3 / 2,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    marginTop: 10,
    marginBottom: 5,
  },
  time: {
    marginBottom: 20,
  },
  desc: {
    fontSize: 15,
    marginBottom: 20,
  },
  writer: {
    alignItems: "center",
    marginBottom: 30,
    text: {
        fontSize: 16,
        fontWeight: "500",
    }
  }
});

export default ArticleCard;
