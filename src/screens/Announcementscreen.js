import React, { useState } from 'react';
import {  Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView,  ActivityIndicator,ToastAndroid } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const Announcement = () => {
    const [imagedata, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
   
    const [isLoading, setIsLoading] = useState(false);

    

    const OpenGallery = async () => {
        const result = await launchImageLibrary({ mediaType: 'photo' });
        if (!result.didCancel) {
            console.log(result);
            setImage(result);
        }
    };

    const uploadImageToFirebase = async () => {
        if (!imagedata || !imagedata.assets || imagedata.assets.length === 0) {
            ToastAndroid.show('Please select Image', ToastAndroid.SHORT);
            return;
        }
        if (!title || !desc) {
            ToastAndroid.show('Please fill in all fields', ToastAndroid.SHORT);
            return;
        }
        setIsLoading(true);
        const reference = storage().ref(imagedata.assets[0].fileName);
        const pathToFile = imagedata.assets[0].uri;

        try {
            // Uploads file
            await reference.putFile(pathToFile);
            const url = await reference.getDownloadURL();
            console.log(url);
            uploadData(url);
            setIsLoading(false);
            ToastAndroid.show('Data Uploaded', ToastAndroid.SHORT);
            setTitle('');
            setDesc('');
            setImage(null);
        } catch (error) {
            setIsLoading(false);
            console.error('Error uploading image:', error);
        }

    };


    const uploadData = url => {
        const timestamp = new Date().toLocaleString();
        firestore()
            .collection('announcements')
            .add({
                title: title,
                description: desc,
                imageUrl: url + '',
                timestamp: timestamp,

            })
            .then(() => {
                console.log('User added!');
            });
    };

    return (
        <ScrollView style={styles.container}>
            {
                imagedata !== null && <Image source={{ uri: imagedata.assets[0].uri }} style={styles.selectedImage} />
            }
            <TextInput
                placeholder='Enter Title'
                style={styles.inputtext}
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.textInput}
                multiline={true}
                placeholder="Enter Description"
                value={desc}
                onChangeText={setDesc}
            />
            <TouchableOpacity style={styles.input} onPress={() => OpenGallery()}>
                <Text>Choose Image from gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => uploadImageToFirebase()}>
                <Text>Submit Details</Text>
            </TouchableOpacity>
            {isLoading && < ActivityIndicator size="1800" color="red" style={styles.activityIndicator} />}
        </ScrollView>
    );
};

export default Announcement;

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

    activityIndicator: {
        position: 'absolute',
        alignSelf: 'center',
        zIndex: 9999,
        width: "100%",
        height: "100%",
        backgroundColor: "white"
    },
});