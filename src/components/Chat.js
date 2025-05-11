import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";
import { collection, addDoc, query, onSnapshot, orderBy } from "firebase/firestore";
import { db, auth } from "../services/FirebaseConfig";

const Chat = ({ friendId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const chatId = [auth.currentUser.uid, friendId].sort().join("_");
    const messagesRef = collection(db, "chats", chatId, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => doc.data()));
    });

    return unsubscribe;
  }, [friendId]);

  const sendMessage = async () => {
    const chatId = [auth.currentUser.uid, friendId].sort().join("_");
    const messagesRef = collection(db, "chats", chatId, "messages");

    await addDoc(messagesRef, {
      text: newMessage,
      sender: auth.currentUser.uid,
      timestamp: new Date(),
    });

    setNewMessage("");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <Text style={item.sender === auth.currentUser.uid ? styles.myMessage : styles.theirMessage}>
            {item.text}
          </Text>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <TextInput
        style={styles.input}
        value={newMessage}
        onChangeText={setNewMessage}
        placeholder="Type a message..."
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#d1f7c4",
    borderRadius: 10,
    padding: 10,
    marginBottom: 5,
  },
  theirMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#f1f0f0",
    borderRadius: 10,
    padding: 10,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default Chat;