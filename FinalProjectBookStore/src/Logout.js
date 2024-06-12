import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

const Logout = ({ navigation }) => {
    return (
        <View style= {styles.container}>
            <Button mode="contained" buttonColor="#FFD5C3" textColor="black"
                onPress={() => navigation.navigate('Login')}
            > Logout</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        margin: 10,
    },

})
export default Logout;