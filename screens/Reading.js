import { useEffect, useState} from 'react';
import axios from 'axios';
import { SafeAreaView, View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

function Reading(){
  const route = useRoute();
  const params = route.params;

  return(
    <SafeAreaView>
      <ScrollView>
        <View>
          <Image source={{uri: params.image}} style={reading.articleImage}/>
        </View>
        <View style={reading.articleView}>
          <Text style={reading.articleTitle}>{params.title}</Text>
          <Text style={reading.articleDate}>{params.date.slice(0, 10)}</Text>
          <Text style={reading.articleDesc}>{params.desc}</Text>
          <Text>- {params.writer} -</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const reading = StyleSheet.create({
  articleView: {
    padding: 30,
  },
  articleTitle: {
    fontSize: 30,
    fontWeight: "500",
    marginBottom: 5
  },
  articleDate: {
    fontSize: 15,
    marginBottom: 30
  },
  articleDesc: {
    marginBottom: 20
  },
  articleImage: {
    aspectRatio: 3/2
  }
})

export default Reading;