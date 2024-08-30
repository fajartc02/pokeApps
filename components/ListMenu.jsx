import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../constants/Colors";

export default function ListMenu(props) {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={
        props.onHandlePress ||
        (() => {
          alert("Nanti ya mas, belum selesai :)");
        })
      }
      style={styles.card}
    >
      <Text style={styles.title}>{props.title || "Menu"}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    width: "80%",
    backgroundColor: "#000",
    borderRadius: 4,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary.text,
  },
});
