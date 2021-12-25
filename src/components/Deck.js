import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import colors from "../utils/colors";
const { width, height } = Dimensions.get("window");
const Deck = ({ item }) => {
  const { title } = item.item;

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default Deck;

const styles = StyleSheet.create({
  itemContainer: {
    width: 0.8 * width,
    height: 0.15 * height,
    margin: 30,
    borderWidth: 1,
    borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    color: colors.primary,
  },
});
