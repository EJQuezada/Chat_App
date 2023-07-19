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

//import the screens
import Chat from './components/Chat.js';
import Start from './components/Start.js';

//import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Create the Navigator
const Stack = createNativeStackNavigator();

const App = () => {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Text>Chat Application</Text>
        <TextInput
          style={styles.textInput}
          value={text}
          onChangeText={setText}
          placeholder='Type Something Here'
        />
        <Text style={styles.textDisplay}>You wrote: {text}</Text>
        <StatusBar style="auto" />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blue: {
    color: 'blue',
    fontWeight: '600',
  },
  bigRed: {
    color: 'red',
    fontSize: 30,
    fontWeight: '300',
  },
  box: {
    width: 60,
    height: 60,
    backgroundColor: 'blue',
  },
  textInput: {
    width: '88%',
    borderWidth: 1,
    height: 50,
    padding: 10
  },
  textDisplay: {
    height: 50,
    lineHeight: 50
  }
});

export default App;
