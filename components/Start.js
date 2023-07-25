import { useState } from 'react';
import { 
    ImageBackground,
    StyleSheet, 
    View, 
    Text, 
    Button, 
    TextInput, 
    TouchableOpacity,
    KeyboardAvoidingView,
    Alert, 
} from 'react-native';

const image = {uri: 'https://legacy.reactjs.org/logo-og.png'};

const backgroundColors = {
    a: '#474056',
    b: '#757083',
    c: '#8A95A5',
    d: '#B9C6AE',
};

const Start = ({ navigation }) => {
    const [name, setName] = useState('');
    const [color, setColor] = useState(backgroundColors.d)

    return (
        <ImageBackground
            source={require("../assets/BackgroundImage.png")}
            resizeMode='cover'
            style={styles.backgroundImage}
        >

        <View style={styles.container}>
             <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <Text> Welcome to Chat App!</Text>
                <TextInput
                    style={styles.textInput}
                    value={name}
                    onChangeText={setName}
                    placeholder='Type your username here'
                    placeholderTextColor= '#B9C6AE'
                />
                <Button
                    title="Go to Chat Screen"
                    onPress={() => navigation.navigate('Chat Screen', { name: name})}
                />
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: "5%",
    },
    textInput: {
        fontSize: 14,
        fontWeight: "300",
        color: "black",
        width: "88%",
        padding: 15,
        borderWidth: 1,
        marginTop: 15,
        marginBottom: 15
    },
    button: {
        alignContent: 'center',
        backgroundColor: '#757083',
        padding: 10, 
    },
});

export default Start;
