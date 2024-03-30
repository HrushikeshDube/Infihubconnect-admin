import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Button, TextInput } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Attendance from './AttendanceScreen';

const Home = ({ navigation }) => {
  

  return (
    
    <View style={Styles.container}>
      <View><Text style={Styles.text}>ADD ITEMS</Text></View>
      <View style={Styles.boxconatiner}>
        <TouchableOpacity style={Styles.box} onPress={()=>navigation.navigate('Add Books')}>
          <View style={{ flex: 1, flexDirection: "column", alignItems: "center" }}>
            <Image source={require('../images/books.png')} style={Styles.imagee} />
            <Text style={{ fontWeight: "700", fontSize: 15, color: "black", top: 10 }}>LIBRARY</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.box} onPress={()=>navigation.navigate('Attendance')}>
          <View style={{ flex: 1, flexDirection: "column", alignItems: "center" }}>
            <Image source={require('../images/immigration.png')} style={Styles.imagee} />
            <Text style={{ fontWeight: "700", fontSize: 15, color: "black", top: 10 }}>ATTENDANCE</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.box} onPress={()=>navigation.navigate('Announcement')}>
          <View style={{ flex: 1, flexDirection: "column", alignItems: "center" }}>
            <Image source={require('../images/megaphone.png')} style={Styles.imagee} />
            <Text style={{ fontWeight: "700", fontSize: 15, color: "black", top: 10 }}>ANNOUNCEMENT</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.box} onPress={()=>navigation.navigate('Notification')}>
          <View style={{ flex: 1, flexDirection: "column", alignItems: "center" }}>
            <Image source={require('../images/notification-bell.png')} style={Styles.imagee} />
            <Text style={{ fontWeight: "700", fontSize: 15, color: "black", top: 10 }}>NOTICE</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>

  );
};

export default Home;

const Styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#1C2120",
  },
  text: {
    marginTop: 50,
    alignSelf: "center",
    fontSize: 25,
    fontWeight: "800",
    color: "#FFDB4F"
},
  box: {
    height: 140,
    width: 140,
    backgroundColor: "white",
    margin: 20,
    borderRadius: 20,
  },
  boxconatiner: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor:"#1C2120"

  },
  imagee: {
    height: 100,
    width: 100,
    alignSelf: "center",
    top: 5
  }

});