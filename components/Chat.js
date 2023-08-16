import React from "react";
import { useState, useEffect } from "react";
import { 
    StyleSheet, 
    View, 
    Text, 
    Alert,
    TextInput,
    ImageBackground,
    TouchableOpacity,
    Platform,
    KeyboardAvoidingView, 
} from "react-native";
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
//Import elements to fetch messages from database
import {
    addDoc,
    collection,
    getDocs,
    query,
    onSnapshot, 
    orderBy
} from "firebase/firestore";
//import AsyncStorage from "@react-native-async-storage/async-storage";
//import MapView from "react-native-maps";


const Chat = ({ db, route, navigation, isConnected, storage }) => {
    const { name, color, uid } = route.params;

    //set the initial state from messages
    const [messages, setMessages] = useState([]);

    let unsubMessages;

    useEffect(() => {
        //Set navigation options for the title
        navigation.setOptions({ title: name });
    }, []);

    useEffect(() => {
        //Set the state with a static message
        navigation.setOptions({ title: name });

        addDoc(collection(db, 'messages'), {
            _id: Date.now(),
            text: name + ' entered the chat',
            createdAt: new Date(),
            system: true,
        });

        if (isConnected === true) {
            if (unsubMessages) unsubMessages();
            unsubMessages = null;

            const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
            unsubMessages = onSnapshot(q, (documentsSnapshot) => {
                let newMessages = [];
                documentsSnapshot.forEach(doc => {
                    newMessages.push(
                        {
                            id: doc.id,
                            ...doc.data(),
                            createdAt: new Date(doc.data().createdAt.toMillis())
                        })
                });
                cacheMessages(newMessages);
                setMessages(newMessages);
            });
    } else loadCachedMessages();
    
    //Clean up code
    return () => {
        if (unsubMessages) unsubMessages();
    }
}, [isConnected]);

const cacheMessages = async (messagesToCache) => {
    try {
        await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
        console.log(error.message);
    }
}

const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem('messages') || [];
    setMessages(JSON.parse(cachedMessages));
}

const onSend = (newMessages) => {
    addDoc(collection(db, 'messages'), newMessages[0])
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
}

const renderBubble = (props) => {
    return <Bubble {...props}
    wrapperStyle={{
        right: {
            backgroundColor: '#000'
        },
        left: {
            backgroundColor: '#FFF'
        }
    }} />
}

const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
}

//const renderCustomActions = (props) => {
//    return <CustomActions storage={storage} {...props} />;
//};

const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
        return (
            <MapView
                style={{
                    width: 150,
                    height: 100,
                    borderRadius: 13,
                    margin: 3
                }}
                region={{
                    latitude: currentMessage.location.latitude,
                    longitude: currentMessage.location.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
        );
    }
    return null;
}

// Render the Chat component
    return (
        <View style={[styles.container, { backgroundColor: color }]}>
            <GiftedChat
                messages={messages}
                renderInputToolbar={renderInputToolbar}
                renderBubble={renderBubble}
                onSend={messages => onSend(messages)}
                //renderActions={renderCustomActions}
                renderCustomView={renderCustomView}
                user={{
                    _id: uid,
                    name: name,
                }}
            />
            {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
            {Platform.OS === 'ios' ? <KeyboardAvoidingView behavior="padding" /> : null }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default Chat;
