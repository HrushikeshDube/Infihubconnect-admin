import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'

import Account from './src/tabs/account';
import Home from './src/screens/Home';
import Splash from './src/screens/Splash';
import Login from './src/screens/Login';
import Seebooks from './src/screens/seebooks';
import Attendance from './src/screens/AttendanceScreen';
import Notification from './src/screens/NotificationScreen';
import Announcement from './src/screens/Announcementscreen';
import Announcelist from './src/screens/listingannouncement';
import Editannouncement from './src/editscreens/Editannouncement';
import Viewannouncement from './src/viewscreens/viewannnounce';
import Attendancelist from './src/listscreens/listattendance';
import AttendanceViewerScreen from './src/viewscreens/viewattendance';
import Noticelist from './src/listscreens/listnotices';
import Bookslist from './src/listscreens/listbooks';
import BooksViewScreen from './src/viewscreens/bookview';
import Viewnotice from './src/viewscreens/viewnotice';
import SplashScreen from './src/screens/Splashscreen';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();




const TabNavigation = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: '#fff',
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 1,
          right: 1,
          elevation: 0,
          height: 80,
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
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="BookslistScreen"
        component={Bookslist}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="library" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Attendancelist"
        component={Attendancelist}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="clipboard-list" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Announcements"
        component={Announcelist}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="announcement" color={color} size={size} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Noticelist"
        component={Noticelist}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="notifications-active" color={color} size={size} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Profile"
        component={Account}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icons name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="TabNavigation"
          component={TabNavigation}
          options={{ headerShown: false }} />
        <Stack.Screen name="Home"
          component={Home}
          options={{ headerShown: false }} />
        <Stack.Screen
          name='Add Books'
          component={Seebooks}
          options={{
            title: 'Add Books',
            headerStyle: {
              backgroundColor: "#FFDB4F",
            },
            headerTitleStyle:{
              color:"black"
            }
          }}
        />
        <Stack.Screen
          name='Attendance'
          component={Attendance}
          options={{
            title: 'Add Attendance',
            headerStyle: {
              backgroundColor: "#FFDB4F",
            },
            headerTitleStyle:{
              color:"black"
            }
          }}
        />
        <Stack.Screen
          name='Notification'
          component={Notification}
          options={{
            title: 'Add Notice',
            headerStyle: {
              backgroundColor: "#FFDB4F",
            },
            headerTitleStyle:{
              color:"black"
            }
          }}
        />
        <Stack.Screen
          name='Announcement'
          component={Announcement}
          options={{
            title: 'Add Announcement',
            headerStyle: {
              backgroundColor: "#FFDB4F",
            },
            headerTitleStyle:{
              color:"black"
            }
          }}
        />
        <Stack.Screen
          name='Editnnouncement'
          component={Editannouncement}
          options={{
            title: 'Edit Announcement',
            headerStyle: {
              backgroundColor: "#FFDB4F",
            },
            headerTitleStyle:{
              color:"black"
            }
          }}
        />
        <Stack.Screen
          name='Viewnnouncement'
          component={Viewannouncement}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen
          name="AttendanceViewScreen"
          component={AttendanceViewerScreen}
          options={{ headerShown: false }} />
          <Stack.Screen
          name="BookslistScreen"
          component={Bookslist}
          options={{ headerShown: false }} />
          <Stack.Screen
          name="BooksViewScreen"
          component={BooksViewScreen}
          options={{ headerShown: false }} />
           <Stack.Screen
          name="NoticeViewScreen"
          component={Viewnotice}
          options={{ headerShown: false }} />
           <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
