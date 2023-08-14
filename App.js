import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { 
  ImageBackground,
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  Button, 
  TouchableOpacity,
  LogBox,
  Alert,
  ScrollView 
} from "react-native";

//import the Chat and Start screens
import Chat from "./components/Chat";
import Start from "./components/Start";

import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";

//import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Create the Navigator
const Stack = createNativeStackNavigator();

//import Firestore
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

//import { useEffect } from "react";

const App = () => {
 //Web application's Firebase configuration 
  const firebaseConfig = {
    apiKey: "AIzaSyCBCDBZhTKVJsane_M4CwuPZKUjlgu18no",
    authDomain: "we-chat-application.firebaseapp.com",
    projectId: "we-chat-application",
    storageBucket: "we-chat-application.appspot.com",
    messagingSenderId: "898995539454",
    appId: "1:898995539454:web:8fe132b390afd3bd2944af",
    measurementId: "G-P26G88E3NC"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  //Initialize Cloud Firestore and get reference to the service
  const db = getFirestore(app);

  //Initialize storage handler
  const storage = getStorage(app);

  //Define a new state that represents the network connectivity status
  const connectionStatus = useNetInfo();

  const [text, setText] = useState('');

  //alert the user input ('text' state's value)
  const alertMyText = () => {
    Alert.alert(text);
  }

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
      <Stack.Navigator
        initialRouteName='Start'
      >
        <Stack.Screen
          name='Start'
          component={Start}
        />
        <Stack.Screen name='Chat' component={Chat}>
          {(props) => (<Chat isConnected={connectionStatus.isConnected}
                      db={db}
                      storage={storage}
                      {...props} />)}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>

    //<View style={styles.container}>
    //  <NavigationContainer>
    //    <Text>Chat Application</Text>
    //    <TextInput
    //      style={styles.textInput}
    //      value={text}
    //      onChangeText={setText}
    //      placeholder='Type Something Here'
    //    />
    //    <Text style={styles.textDisplay}>You wrote: {text}</Text>
    //    <Button
    //      onPress={() => {
    //        alertMyText();
    //      }}
    //      title="Press Me"
    //    />
    //    <StatusBar style="auto" />
    //  </NavigationContainer>
    //</View>
  );
};

//const styles = StyleSheet.create({
//  container: {
//    flex: 1,
//    backgroundColor: '#fff',
//    alignItems: 'center',
//    justifyContent: 'center',
//  },
//  blue: {
//    color: 'blue',
//   fontWeight: '600',
//  },
//  bigRed: {
//    color: 'red',
//    fontSize: 30,
//    fontWeight: '300',
//  },
//  box: {
//    width: 60,
//    height: 60,
//    backgroundColor: 'blue',
//  },
//  textInput: {
//    width: '88%',
//    borderWidth: 1,
//    height: 50,
 //   padding: 10
//  },
//  textDisplay: {
//    height: 50,
//    lineHeight: 50
//  }
//});

export default App;
