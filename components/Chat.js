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
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import {
    addDoc,
    collection,
    getDocs,
    query,
    onSnapshot
} from "firebase/firestore";

const Chat = ({ db, route, navigation }) => {
    const { name, color } = route.params;
    //set the initial state from messages
    const [messages, setMessages] = useState([]);
    const onSend = (newMessages) => {
        addDoc(collection(db, 'messages'), newMessages[0])
    } 

    let unsubMessages;
    useEffect(() => {
        //Set navigation options for the title
        navigation.setOptions({ title: name });
        // Createa quey to fetch messages from firestore collection
        const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
        //Subscribe to real-time updates using onSnapshot
        const unsubMessages = onSnapshot(q, (docs) => {
            let newMessages = [];
            docs.forEach(doc => {
                newMessages.push({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: new Date(doc.data().createdAt.toMillis()),
                });
            });
            setMessages(newMessages);
        });
        return () => {
            if (unsubMessages) unsubMessages();
        };
//        setMessages([
//            {
//                _id: 1,
//                text: 'Hello developer',
//                createdAt: new Date(),
//                user: {
//                    _id: 2,
//                    name: 'React Native',
//                    avatar: 'https://placeimg.com/140/140/any',
//                },
//            },
//            {
//                _id: 2,
//                text: 'This is a system message',
//                createdAt: new Date(),
//                system: true,
//            },
//        ]);

//        navigation.setOptions({ title: name })
    }, []);

// Render the Chat component
    return (
        <View style={[styles.container, {backgroundColor: color }]}>
            <GiftedChat
                style={styles.container}
                messages={messages}
                renderBubble={renderBubble}
                onSend={messages => onSend(messages)}
                user={{
                    _id: uid,
                    name,
                }}
            />
            {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
            {Platform.OS === 'ios' ? <KeyboardAvoidingView behavior="padding" /> : null }
        </View>
    );
};

const renderBubble = (props) => {
    return <Bubble
        {...props}
        wrapperStyle={{
            right: {
                backgroundColor: "#000"
            },
            left: {
                backgroundColor: "#FFF"
            }
        }}
    />
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Chat;
