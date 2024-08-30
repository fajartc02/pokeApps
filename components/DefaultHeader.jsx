import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import Colors from "../constants/Colors";

export default function DefaultHeader(props) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/bg-pokemon.png")}
        style={{ width: 20, height: 20 }}
      />
      <Text style={styles.title}>{props.title || props.children}</Text>
      <Image
        source={require("../assets/images/bg-pokemon.png")}
        style={{ width: 20, height: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderBottomColor: Colors.primary.text,
    borderBottomWidth: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
