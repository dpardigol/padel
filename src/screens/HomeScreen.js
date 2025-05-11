import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

// Mock data for players
const players = [
  { id: 1, name: "Alice", elo: 1200 },
  { id: 2, name: "Bob", elo: 1250 },
  { id: 3, name: "Charlie", elo: 1150 },
];

export default function HomeScreen() {
  const [playerList, setPlayerList] = useState([]);

  useEffect(() => {
    // Simulate fetching player data
    setPlayerList(players);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Player Rankings</Text>
      <FlatList
        data={playerList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.player}>
            <Text style={styles.playerName}>{item.name}</Text>
            <Text style={styles.playerElo}>ELO: {item.elo}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  player: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  playerName: {
    fontSize: 18,
  },
  playerElo: {
    fontSize: 16,
    color: "#555",
  },
});