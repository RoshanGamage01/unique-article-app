import {React, useState} from "react";
import {View, TextInput, StyleSheet, SafeAreaView, Text} from 'react-native'

function EditArticle(){
    const [data, setData] = useState({title: '', desc: ''})

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{fontSize: 30, fontWeight: "600"}}>Edit Article</Text>
            <View style={{width: "100%"}}>
                <Text>Title</Text>
                <TextInput placeholder="title" value={data.title} onChangeText={(e) => setData((oldVal) => ({ ...oldVal, title: e }))} style={{width: "100%", height: 50, borderWidth: 2,}}/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingVertical: 30,
        paddingHorizontal: 20,
    }
})

export default EditArticle;