import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert,ActivityIndicator,ToastAndroid } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const Attendance = ({ navigation }) => {
    const [dept, setDept] = useState('');
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
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
                if (!year || !month || !dept) {
                    ToastAndroid.show('Please fill in all fields', ToastAndroid.SHORT);
                    return;
                }
                if (!pickedFile) {
                    ToastAndroid.show('Please select a PDF file', ToastAndroid.SHORT);
                    return;
                }
                setIsLoading(true)
            
                const { uri, name } = pickedFile;
                const reference = storage().ref(`pdfs/${name}`);
                
                // Upload file to Firebase Storage
                await reference.putFile(uri);
            
                // Get download URL
                const downloadURL = await reference.getDownloadURL();
            
                // Store download URL in Firestore along with other details
                await firestore().collection('attendance').add({
                    department: dept,
                    year: year,
                    month: month,
                    url: downloadURL,
                    name:name,
                });
    
                ToastAndroid.show('Data Uploaded', ToastAndroid.SHORT);
                setIsLoading(false);
                setDept('');
                setYear('');
                setMonth('');
                setPickedFile(null); // Reset pickedFile state to null to hide file details
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        } else {
            ToastAndroid.show('Please select a PDF file', ToastAndroid.SHORT);
        }
    };
    

    return (
        <ScrollView style={styles.container}>
            <TextInput
                placeholder='Enter Department'
                style={styles.inputtext}
                value={dept}
                onChangeText={setDept}
            />
            <TextInput
                placeholder='Enter Year'
                style={styles.inputtext}
                value={year}
                onChangeText={setYear}
            />
            <TextInput
                style={styles.inputtext}
                placeholder="Enter Month"
                value={month}
                onChangeText={setMonth}
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

export default Attendance;

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
