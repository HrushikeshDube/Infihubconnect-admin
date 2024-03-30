import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Alert, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Editannouncement from '../editscreens/Editannouncement';

const Announcelist = ({ navigation }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        getdata();
    }, []);

    const getdata = () => {
        firestore()
            .collection('announcements')
            .get()
            .then(querySnapshot => {
                console.log('Total users: ', querySnapshot.size);
                let tempData = [];
                querySnapshot.forEach(documentSnapshot => {
                    console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                    tempData.push({ id: documentSnapshot.id, data: documentSnapshot.data() });
                });
                setItems(tempData);
            });
    };
    const deleteannouncement = docId => {
        firestore()
            .collection('announcements')
            .doc(docId)
            .delete()
            .then(() => {
                Alert.alert("Deleted")
                getdata();
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Announcements</Text>
            <FlatList
                data={items}
                renderItem={({ item, index }) => (
                    <View style={styles.itemview}>
                        <Image source={{ uri: item.data.imageUrl }} style={styles.imgitem} />

                        <View style={styles.editview}>
                            <View style={styles.textContainer}>
                                <Text style={styles.title}>Title:</Text>
                                <Text style={styles.title1}>{item.data.title}</Text>


                            </View>
                            <Text style={{ color: 'black', fontSize: 15, top: 8, left: 11, fontWeight: 'bold' }}>
                                    Date: <Text style={{ fontWeight: '100', color: 'grey' }}>{item.data.timestamp}</Text>
                                </Text>
                            <View style={{ flex: 1, flexDirection: "row", marginTop: 40, }}>
                                <TouchableOpacity onPress={() => navigation.navigate('Editnnouncement', {
                                    data: item.data,
                                    id: item.id
                                })}><Image source={require('../images/edit.png')} style={styles.viewimg} /></TouchableOpacity>
                                <TouchableOpacity onPress={() => deleteannouncement(item.id)}><Image source={require('../images/delete.png')} style={styles.viewimg} /></TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('Viewnnouncement', {
                                    data: item.data,
                                    id: item.id
                                })}><Image source={require('../images/view.png')} style={{ height: 30, width: 30, left: 100}} /></TouchableOpacity>
                            </View>

                        </View>
                    </View>
                )}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C2120',
    },
    text: {
        marginTop: 10,
        alignSelf: "center",
        fontSize: 25,
        fontWeight: "800",
        color: "#FFDB4F"
    },
    itemview: {
        flexDirection: 'row',
        backgroundColor: 'white',
        width: '90%',
        alignSelf: 'center',
        elevation: 4,
        marginTop: 20,
        borderRadius: 10,
        padding: 5,
    },
    imgitem: {
        height: 120,
        width: 100,
    },
    textContainer: {
        marginLeft: 10,
        flex: 1,
        flexDirection: 'row'
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color:'black'
    },
    title1: {
        fontSize: 16,
    },
    description: {
        fontSize: 14,
        marginTop: 5,
    },
    editview: {
        flex: 1,
        flexDirection: "column",

    },
    viewimg: {
        height: 30,
        width: 30,
        marginLeft: 10
    },
    timestamp: {
        fontSize: 14,
        marginTop: 5,
        left: 10,
        color: 'gray' // or any color you prefer
    },
});

export default Announcelist;
