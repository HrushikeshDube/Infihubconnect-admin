import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, TouchableOpacity, StyleSheet, Image,ActivityIndicator,ToastAndroid } from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import SplashScreen from '../screens/Splashscreen';

const Account = ({ navigation }) => { // Receive navigation prop here
  const [userEmail, setUserEmail] = useState(null);
  const [initializing, setInitializing] = useState(true); // Add initializing state

  useEffect(() => {
    // Check if user is logged in
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        setUserEmail(user.email);
      } else {
        // No user is signed in.
        setUserEmail(null);
      }
      // Set initializing to false once authentication state is determined
      setInitializing(false);
    });

    // Unsubscribe from the listener when component unmounts
    return unsubscribe;
  }, []);

  const handleSignOut = () => {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      ToastAndroid.show('Successfully Signed Out', ToastAndroid.SHORT);
      navigation.navigate("Login");
    }).catch((error) => {
      // An error happened.
      console.error(error);
    });
  };

  if (initializing) {
    // Render SplashScreen while initializing authentication state
    return <SplashScreen />;
  }

  return (
    <View style={Styles.screen}>
      <Text style={Styles.text}>Profile</Text>
      <Image source={require('../images/profile.png')} style={Styles.imgss} />
      <View style={Styles.box2}>
        <View style={Styles.minibox}>
          <View style={Styles.mailcon}>
            <Text style={{ paddingLeft: 10, color: 'black' }}>Email :</Text>
            <Text style={{ left: -30, color: "grey" }}>{userEmail}</Text>
          </View>
          <View style={{ width: "95%", backgroundColor: "grey", height: 1, left: -2, marginTop: 8 }}></View>
        </View>
        <TouchableOpacity onPress={handleSignOut} style={Styles.btn}><Text>Sign Out</Text></TouchableOpacity>
      </View>
    </View>
  );
};

export default Account;

const Styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#1C2120",
    paddingBottom: 10
  },
  mailcon: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  minibox:{
    width:"90%",
    borderColor:"black",
    padding:15,
    alignSelf:"center",  
  },
  text: {
    marginTop: 20,
    alignSelf: "center",
    fontSize: 25,
    fontWeight: "800",
    color: "#FFDB4F"
  },
  btn: {
    paddingLeft: 10,
    left:-1,
    height: 50,
    marginTop: 30,
    alignSelf:"center",
    width: "90%",
    borderWidth: 0.5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#FFDB4F',
    shadowColor: 'yellow',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  imgss: {
    height: 150,
    width: 150,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: -18
  },
  box2: {
    flex: 2,
    marginTop: 40,
    paddingTop: 70,
    width: "100%",
    backgroundColor: "white",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 10
  }
});
