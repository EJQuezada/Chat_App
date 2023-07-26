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
    Platform, 
} from 'react-native';

const image = {uri: 'https://legacy.reactjs.org/logo-og.png'};



const Start = ({ navigation }) => {
    const [name, setName] = useState('');
    const [color, setColor] = useState(backgroundColors.d)

    const backgroundColors = {
    a: '#474056',
    b: '#757083',
    c: '#8A95A5',
    d: '#B9C6AE',
    };

    return (
        <View style={styles.container}>
            <ImageBackground 
                source={require("../assets/BackgroundImage.png")} resizeMode="cover" style={styles.backgroundImage}
            >
                <View style={styles.titlebox}>
                    <Text style={styles.title}> Welcome to Chat App!</Text>
                </View>
                <View style={styles.box}>
                    <View style={styles.textcontainer}>
                        <Image styles={styles.icon} source={require('..//assets/user-icon.png')}></Image>
                    <TextInput
                        style={styles.textInput}
                        value={name}
                        onChangeText={setName}
                        placeholder='Type your username here'
                        placeholderTextColor= '#B9C6AE'
                    />
                </View>
                <Text style={styles.chooseBackgroundText}>Choose background color: {color.backgroundColor}</Text>
                <View style={styles.colorBox}>
                    <TouchableOpacity
                        style={[styles.colorButton, backgroundColor.black, color === backgroundColor.black.backgroundColor ? styles.selectedColorButton : '']}
                        onPress={() => setColor(backgroundColor.black.backgroundColor)} >
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.colorButton, backgroundColor.purple, color === backgroundColor.purple.backgroundColor ? styles.selectedColorButton : '']}
                        onPress={() => setColor(backgroundColor.purple.backgroundColor)} >
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.colorButton, backgroundColor.grey, color === backgroundColor.grey.backgroundColor ? styles.selectedColorButton : '']}
                        onPress={() => setColor(backgroundColor.grey.backgroundColor)} >
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.colorButton, backgroundColor.green, color === backgroundColor.green.backgroundColor ? styles.selectedColorButton : '']}
                        onPress={() => setColor(backgroundColor.green.backgroundColor)}>
                    </TouchableOpacity>
                </View>    
                <TouchableOpacity
                    style={styles.chatButton}>
                    <Text style={styles.chatButtonText}>Start chatting</Text>
                </TouchableOpacity>    
            </View>
            </ImageBackground>
            {/*Fix keyboard hides the message input field on Android*/}
            { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
            {/*Fix keyboard hides the message input field on iOS*/}
            { Platform.OS === 'ios' ? <KeyboardAvoidingView behavior="padding" /> : null }
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
        fontWeight: '300',
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
