import React, { useState } from 'react';
import {  Text, StyleSheet, TouchableOpacity, TextInput, Image, PermissionsAndroid, ScrollView,ToastAndroid } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useRoute } from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const Announcement = () => {
    const route = useRoute()
    const [imagedata, setImage] = useState({ assets: [{ uri: route.params.data.imageUrl }] });
    const [title, setTitle] = useState(route.params.data.title);
    const [desc, setDesc] = useState(route.params.data.description);
    

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Cool Photo App Camera Permission',
                    message:
                        'Cool Photo App needs access to your camera ' +
                        'so you can take awesome pictures.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the camera');
                OpenGallery();
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const OpenGallery = async () => {
        const result = await launchImageLibrary({ mediaType: 'photo' });
        if (!result.didCancel) {
            console.log(result);
            setImage(result);
        }
    };

    const uploadImageToFirebase = async () => {
        if (!imagedata || !imagedata.assets || imagedata.assets.length === 0) {
            console.error('No image data found.');
            return;
        }
    
        const reference = storage().ref(imagedata.assets[0].fileName);
        const pathToFile = imagedata.assets[0].uri;
        
        try {
            // Uploads file
            await reference.putFile(pathToFile);
            const url = await reference.getDownloadURL();
            console.log(url);
            uploadData(url);
            ToastAndroid.show('Data Uploaded', ToastAndroid.SHORT);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };
    

    const uploadData = () => {
        const timestamp = new Date().toLocaleString();
        firestore()
        .collection('announcements')
        .doc(route.params.id)
        .update({
          title: title,
          description: desc,
         imageUrl:route.params.data.imageUrl +'',
         timestamp: timestamp,
         
        })
        .then(() => {
            ToastAndroid.show('Data Updated', ToastAndroid.SHORT);
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
            <TouchableOpacity style={styles.input} onPress={()=>OpenGallery()}>
                <Text>Choose Image from gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={()=>uploadData()}>
                <Text>Update Details</Text>
            </TouchableOpacity>
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
});