import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert ,ActivityIndicator,ToastAndroid} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const Seebooks = ({ navigation }) => {
    const [title, settitle] = useState('');
    const [author, setauthor] = useState('');
    const [dept, setdept] = useState('');
    const [pickedFile, setPickedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const pickDocument = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
            });
            if (res && res[0]) {
                const pickedFile = res[0];
                console.log('File selected:', pickedFile.name);
                setPickedFile(pickedFile);
            } else {
                console.log('No file selected');
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled the picker');
            } else {
                console.log('Error selecting file:', err);
            }
        }
    };

    const uploadFile = async () => {
        if (pickedFile) {
            
            try {
                if (!title || !author || !dept) {
                    ToastAndroid.show('Please fill in all fields', ToastAndroid.SHORT);
                    return;
                }
                if (!pickedFile) {
                    ToastAndroid.show('Please select a PDF file', ToastAndroid.SHORT);
                    return;
                  }
                  setIsLoading(true);
            
                  const { uri, name } = pickedFile;
                  const reference = storage().ref(`pdfs/${name}`);
                  
                  // Upload file to Firebase Storage
                  await reference.putFile(uri);
            
                  // Get download URL
                  const downloadURL = await reference.getDownloadURL();
            

                // Store download URL in Firestore along with other details
                await firestore().collection('library').add({
                    department: dept,
                    title: title,
                    author: author,
                    url: downloadURL,
                    name:name,
                });
                
                
                ToastAndroid.show('Data Uploaded', ToastAndroid.SHORT);
                setIsLoading(false);
                settitle('');
                setauthor('');
                setdept('');
                setPickedFile(null);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        } else {
            if (!pickedFile) {
                ToastAndroid.show('Please select a PDF file', ToastAndroid.SHORT);
                return;
            }
        }
    };


    return (
        <ScrollView style={styles.container}>
            <TextInput
                placeholder='Enter Title'
                style={styles.inputtext}
                value={title}
                onChangeText={settitle}
            />
            <TextInput
                placeholder='Enter Author'
                style={styles.inputtext}
                value={author}
                onChangeText={setauthor}
            />
            <TextInput
                style={styles.inputtext}
                placeholder="Enter Department"
                value={dept}
                onChangeText={setdept}
            />
            <TouchableOpacity style={styles.input} onPress={() => pickDocument()}>
                <Text>Choose PDF</Text>
            </TouchableOpacity>
            {pickedFile !== null && (
                <View style={styles.pickedFileContainer}>
                    <Text style={styles.fileDetail1}>File Details:</Text>
                    <Text style={styles.fileDetail}>Name: {pickedFile.name}</Text>
                    <Text style={styles.fileDetail}>Type: {pickedFile.type}</Text>
                    <Text style={styles.fileDetail}>URI: {pickedFile.uri}</Text>
                    <Text>Hello</Text>
                </View>
        
            )}
            {isLoading && < ActivityIndicator size="1800" color="red" style={styles.activityIndicator} />}
           

            <TouchableOpacity style={styles.btn} onPress={() => uploadFile()}>
                <Text>Submit Details</Text>
            </TouchableOpacity>
        </ScrollView >
    );
};

export default Seebooks;

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
    pickedFileContainer: {
        marginBottom: 5,
        backgroundColor: 'white', // Adding a background color to make the details stand out
        padding: 20,
        margin: 15,
        borderRadius: 5,
        shadowColor: 'yellow',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
    fileDetail: {
         marginBottom: 5,
        fontSize: 16,
        color: '#333',// Adjusting text color for better visibility
    },
    fileDetail1: {
        marginBottom: 5,
        fontSize: 16,
        color: 'black',
        fontWeight: "bold" // Adjusting text color for better visibility
    },
    activityIndicator: {
        position: 'absolute',
        alignSelf: 'center',
        zIndex: 9999,
        width: "100%",
        height: "100%",
        backgroundColor: "white",
       
    },
});
