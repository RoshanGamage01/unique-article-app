import React from "react";
import { View, Text, StyleSheet } from "react-native";

function TopBar(){
    return (
        <View style={style.container}>
            <Text style={style.logo}>UniqueArticle</Text>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        display: "flex",
        paddingVertical: 10,
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center",
    },
    logo: {
        fontSize: 30,
        fontWeight: "600"
    }
})

export default TopBar;