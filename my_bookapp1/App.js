import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { getApps, initializeApp } from "firebase/app"; 
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer} from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import Home from "./components/allBooks";
import Chat from "./components/chat";
import Profile from "./components/profile";
import BookDetails from "./components/bookDetails";

const firebaseConfig = {
  apiKey: "AIzaSyD3s3XABbncQm6o8UMa_ieNQ7Jjxo2jW6g",
  authDomain: "mybookapp1-a7940.firebaseapp.com",
  databaseURL: "https://mybookapp1-a7940-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mybookapp1-a7940",
  storageBucket: "mybookapp1-a7940.appspot.com",
  messagingSenderId: "347594457486",
  appId: "1:347594457486:web:22935a5007dd1a1bc6a4df",
  databaseURL: "https://mybookapp1-a7940-default-rtdb.europe-west1.firebasedatabase.app"
  
};
//Controlls if firebase is already initialized to avoid the error Firebase App named '[DEFAULT]' already exists (app/duplicate-app).
    if (getApps().length < 1) {
      initializeApp(firebaseConfig);
      console.log("Firebase On!");
  }

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  //stack navigator for profile, chat and home
  const StackNavigator = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Books" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="BookDetails" component={BookDetails} />
      </Stack.Navigator>
    )
  }

// Bottom Tab Navigator
const BottomNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="All books"
          component={StackNavigator}
          options={{
            tabBarIcon: () => <Ionicons name="book" size={20} />,
            headerShown: false, 
          }}
        />
          <Tab.Screen
           name="Chat"
           component={Chat}
            options={{
              tabBarIcon: () => <Ionicons name="chatbubbles" size={20} />,
              // headerShown: false,
            }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: () => <Ionicons name="person" size={20} />,
            // headerShown: false,
          }}
          
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return <BottomNavigation />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});