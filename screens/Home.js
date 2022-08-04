import {React, useState, useEffect} from "react";
import axios from 'axios';
import { SafeAreaView, ScrollView, StyleSheet, View, Text, RefreshControl } from "react-native";
import RecentPost from "../components/RecentPost";
import ArticleCard from "../components/ArticleCards";

function Home(){
    let [articles, setArticles] = useState([]);

    useEffect(() => {
        getArticles();
      }, []);

    async function getArticles() {
        await axios
          .get("https://uniquearticle.azurewebsites.net/api/article/")
          .then((response) => {
            setArticles(response.data);
          })
          .catch((error) => {
            console.log("Articles not found")
          });
      }

    return(
            <SafeAreaView >
                <ScrollView >
                    <RecentPost />
                    <View style={style.articles}>
                        {articles.map((item) => {
                            return (
                            <ArticleCard data={item} key={item._id} />
                            )
                        })}
                    </View>
                </ScrollView>
                
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    home: {
        height: "100%",
    },
    articles: {
        padding: 20,
        backgroundColor: "#f0f0f0",
    }
})

export default Home;