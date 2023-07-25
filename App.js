import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { 
  ImageBackground,
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  Button, 
  TouchableOpacity,
  Alert,
  ScrollView 
} from 'react-native';

//import the Chat and Start screens
import Chat from './components/Chat';
import Start from './components/Start';

import { useEffect } from 'react';
//import { Alert } from 'react-native';

//import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Create the Navigator
const Stack = createNativeStackNavigator();

const App = () => {
  const [text, setText] = useState('');

  //alert the user input ('text' state's value)
  const alertMyText = () => {
    Alert.alert(text);
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Start'
      >
        <Stack.Screen
          name='Start'
          component={Start}
        />
        <Stack.Screen
          name='Chat'
          component={Chat}
        />
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
}

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
