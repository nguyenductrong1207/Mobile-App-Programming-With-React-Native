import { DefaultTheme } from "@react-navigation/native";
import { StyleSheet } from "react-native";

// const AppTheme = {
//     ...DefaultTheme,
//     colors: {
//         ...DefaultTheme.colors,
//         primary: '#04007E'
//     },
// };

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100%',
        padding: 40,
        paddingTop: 10,
        backgroundColor: '#F7E4E4',

    },

    header: {
        fontSize: 50,
        fontWeight: 'bold',
        color: 'black',
        textAlign: "left",
    },
    input: {
        borderColor: 'grey',
        borderBottomWidth: 1,
        paddingBottom: 5,
        width: '100%',
        marginTop: 60,
        paddingLeft: 1,
        fontSize: 15,
        color: 'black',
    },

    button: {
        backgroundColor: '#F09078',
        borderRadius: 20,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginTop: 50,
    },

    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
    },

    text: {
        fontSize: 15,
        textAlign: 'center',
        marginTop: 50,
        color:'black',
    },

    bottomButton: {
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginTop: 50,
    },

    bottomText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#F09078',
    }
});