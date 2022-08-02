import {React, useState, useEffect} from "react";
import axios from 'axios';
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from "react-native";
import RecentPost from "../components/RecentPost";
import TopBar from "../components/TopBar";
import Reading from "./Reading";
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
        <SafeAreaView>
                {/* <TopBar/> */}
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
    }
})

export default Home;