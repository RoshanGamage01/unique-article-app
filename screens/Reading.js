import React , { useEffect, useState} from 'react';
import axios from 'axios';
import * as SecureStore from "expo-secure-store";
import { Alert, SafeAreaView, View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useRoute } from '@react-navigation/native';

function Reading(){
  const route = useRoute();
  const params = route.params;
  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    getCanEditValue()
  }, [])

  async function getCanEditValue(){
    const token = await SecureStore.getItemAsync('auth-token')
    // console.log(token)
    if (token !== null){
      await axios.get(`https://uniquearticle.azurewebsites.net/api/article/${params.itemId}`, {headers: {"x-auth-token": token}})
        .then(response => {
          // console.log(response.data.canEdit)
          setCanEdit(response.data.canEdit)
        })
        .catch(err => {
          console.log(err)
        })
    }else{
      setCanEdit(false)

    }
  }


  const btnEditArticleOnAction = () => {
    Alert.alert(  
      'Can\'t Edit Article',  
      'You can\'t edit article inside mobile app',  
      [  
          {text: 'Go to website', onPress: () => {
            Linking.openURL(`https://uniquearticle.netlify.app/`)
          }},  
          {  
              text: 'Cancel',  
              style: 'cancel',  
          }
      ],  
      {cancelable: false}  
  )  
  }

  return(
    <SafeAreaView>
      <ScrollView>
        <View>
          <Image source={{uri: params.image}} style={reading.articleImage}/>
          {
            canEdit ? (
              <TouchableOpacity onPress={btnEditArticleOnAction} style={{position: 'absolute', right: 0, paddingHorizontal: 20, paddingVertical: 10, borderWidth: 1, borderColor: "white", marginTop: 20, marginRight: 20, borderRadius: 5}}>
                <Text style={{color: "white"}}>
                  Edit article
                </Text>
              </TouchableOpacity>
            ) : (<View></View>)
          }
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