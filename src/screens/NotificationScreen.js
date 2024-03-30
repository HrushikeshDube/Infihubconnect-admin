import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, PermissionsAndroid, ScrollView,ToastAndroid, Alert, ActivityIndicator } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';






const Notification = () => {
   
   
    const [title, setTitle] = useState('');
    const [notice, setnotice] = useState('');
    

    
    const uploadData = async () => {
        try {
            if (!title || !notice) {
                ToastAndroid.show('Please fill in all fields', ToastAndroid.SHORT);
                return;
            }
            const timestamp = new Date().toLocaleString();
            await firestore().collection('notices').add({
                title: title,
                description: notice,
                timestamp: timestamp
            });

            ToastAndroid.show('Data Uploaded', ToastAndroid.SHORT);
        } catch (error) {
            console.error('Error uploading data to Firestore: ', error);
        }
    };

    return (
        <ScrollView style={styles.container}>
            
            <TextInput
                placeholder='Enter Title'
                style={styles.inputtext}
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.textInput}
                multiline={true}
                placeholder="Enter Notice"
                value={notice}
                onChangeText={setnotice}
            />
            <TouchableOpacity style={styles.btn} onPress={()=>uploadData()}>
                <Text>Submit Details</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};




export default Notification;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1C2120"
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
        marginBottom: 50
    },
    inputtext: {
        paddingLeft: 25,
        height: 50,
        alignSelf: "center",
        marginTop: 30,
        width: "90%",
        borderWidth: 0.5,
        borderRadius: 10,
        backgroundColor: "white",
        borderColor: "red"
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        width: '90%',
        minHeight: 100,
        alignSelf: 'center',
        marginTop: 30,
        backgroundColor: 'white',
        textAlignVertical: 'top',
    },
    input: {
        paddingLeft: 5,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginTop: 30,
        width: "90%",
        borderWidth: 0.5,
        borderRadius: 10,
        backgroundColor: "white",
        borderColor: "red"
    },
    selectedImage: {
        width: '90%',
        height: 200,
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 10
    },
    container1: {
        flex: 1,
        justifyContent: 'center',
      },
      horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
      },
});