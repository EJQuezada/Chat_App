import { StyleSheet, Alert } from "react-native";

//import the Chat and Start screens
import Chat from "./components/Chat.js";
import Start from "./components/Start.js";

//import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Create the Navigator
const Stack = createNativeStackNavigator();

//import Firestore
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from "firebase/firestore";

//storage for images and videos
import { getStorage } from "firebase/storage";

//package to determine whether user has internet access
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";

const App = () => {
  //Web application's Firebase configuration for storage
  const firebaseConfig = {
    apiKey: "AIzaSyCBCDBZhTKVJsane_M4CwuPZKUjlgu18no",
    authDomain: "we-chat-application.firebaseapp.com",
    projectId: "we-chat-application",
    storageBucket: "we-chat-application.appspot.com",
    messagingSenderId: "898995539454",
    appId: "1:898995539454:web:8fe132b390afd3bd2944af",
    measurementId: "G-P26G88E3NC",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  //Initialize Cloud Firestore and get reference to the service
  const db = getFirestore(app);

  //Initialize storage handler
  const storage = getStorage(app);

  //Define a new state that represents the network connectivity status
  const connectionStatus = useNetInfo();

  //useEffect() code that will display an alert popup if connection is lost
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              storage={storage}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
