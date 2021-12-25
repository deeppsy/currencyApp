import React from "react";
import { Text, SafeAreaView, StyleSheet, FlatList } from "react-native";
import data from "../data/homeScreenData";
import Deck from "../components/Deck";

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Welcome to the Home Screen</Text>
      <FlatList
        data={Object.values(data)}
        keyExtractor={(item) => item.id}
        renderItem={(item) => <Deck item={item} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    textAlign: "center",
    fontSize: 30,
    marginTop: 10,
  },
});

export default HomeScreen;
