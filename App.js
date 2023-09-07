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
  Image,
  Alert,
  ScrollView 
} from "react-native";
import MapView from "react-native-maps";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

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
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";

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

  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);

  // pick image from the library
  const pickImage = async () => {
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissions?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync();

      if (!result.canceled) setImage(result.assets[0]);
      else setImage(null)
    }
  }

  const takePhoto = async () => {
    let permissions = await ImagePicker.requestCameraPermissionsAsync();

    if (permissions?.granted) {
      let result = await ImagePicker.launchCameraAsync();

      if (!result.canceled) setImage(result.assets[0]);
      else setImage(null)
    }
  }

  const getLocation = async () => {
    let permissions = await Location.requestForegroundPermissionsAsync();

    if (permissions?.granted) {
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    } else {
      Alert.alert("Permissions to read location are not granted");
    }
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
//    <View style={StyleSheet.container}>
//      <Button
//        onPress={pickImage}
//        title="Pick an image from the library"
//      />
//      <Button
//        onPress={takePhoto}
//        title="Open Camera"
//      />
//      <Button
//        onPress={getLocation}
//        title="Get my location"
//      />
//
//      {
//        location &&
//        <MapView
//          style={{ width: 300, height: 200 }}
//          region={{
//            latitude: location.coords.latitude,
//            longitude: location.coords.longitude,
//            latitudeDelta: 0.0922,
//            longitudeDelta: 0.0421,
//          }}
//        />
//      }
//
//    </View>

    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Start'
      >
        <Stack.Screen
          name='Start'
          component={Start}
        />
        <Stack.Screen name='Chat'>
          {(props) => (<Chat isConnected={connectionStatus.isConnected}
                      db={db}
                      storage={storage}
                      {...props} />)}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  }
});

export default App;
