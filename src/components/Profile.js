import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { auth } from "../services/FirebaseConfig"; // Use the centralized auth object
import { doc, getDoc } from "firebase/firestore";

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{userData.displayName}</Text>
      <Text style={styles.elo}>ELO Ranking: {userData.elo}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  elo: {
    fontSize: 18,
    marginTop: 10,
  },
});

export default Profile;