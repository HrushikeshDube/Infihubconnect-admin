import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator, ToastAndroid } from 'react-native';
import auth from '@react-native-firebase/auth';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [initializing, setInitializing] = useState(true);

    // Handle user state changes
    function onAuthStateChanged(user) {
        if (user) {
            // User is signed in, navigate to the home screen
            navigation.navigate('TabNavigation');
        } else {
            // User is signed out
            console.log('User is signed out');
            setEmail('');
            setPassword('');
        }
        // Set initializing to false once authentication state is determined
        setInitializing(false);
    }

    useEffect(() => {
        setEmail('');
        setPassword('');
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // Unsubscribe on unmount
    }, []);

    const loginuser = () => {
        auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                // Successfully logged in
                ToastAndroid.show('Successfully Logged In', ToastAndroid.SHORT);
            })
            .catch((error) => {
                // Handle login errors
                console.error(error);
                ToastAndroid.show('Invalid Credentials', ToastAndroid.SHORT);
            });
    };

    if (initializing) {
        // Render loading indicator while initializing authentication state
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#FFDB4F" />
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <Image source={require('../images/profile.png')} style={styles.imgss} />
            <Text style={styles.text}> Admin Login</Text>
            <TextInput
                placeholder='Enter Email'
                placeholderTextColor={"#1C2120"}
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={styles.inputtext}
            />
            <TextInput
                placeholder='Enter Password'
                placeholderTextColor={"#1C2120"}
                value={password}
                onChangeText={(text) => setPassword(text)}
                style={styles.inputtext}
                secureTextEntry
            />
            <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                    if (email !== '' && password !== '') {
                        loginuser();
                    } else {
                        ToastAndroid.show('Please Enter Data', ToastAndroid.SHORT);
                    }
                }}
            >
                <Text style={styles.btntext}>Log In</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#1C2120"
    },
    text: {
        marginTop: 50,
        alignSelf: "center",
        fontSize: 25,
        fontWeight: "800",
        color: "#FFDB4F"
    },
    inputtext: {
        paddingLeft: 25,
        height: 50,
        alignSelf: "center",
        backgroundColor: "white",
        color: "#1C2120",
        marginTop: 30,
        width: "90%",
        borderWidth: 0.5,
        borderRadius: 10,
    },
    imgss: {
        height: 150,
        width: 150,
        alignSelf: "center",
        marginTop: 40,
        marginBottom: -18
    },
    btn: {
        paddingLeft: 10,
        height: 50,
        alignSelf: "center",
        marginTop: 30,
        width: "90%",
        borderWidth: 0.5,
        borderRadius: 10,
        backgroundColor: "#FFDB4F",
        justifyContent: 'center',
        alignItems: 'center',
    },
    btntext: {
        fontSize: 20,
        fontWeight: "800",
        color: "white"
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
