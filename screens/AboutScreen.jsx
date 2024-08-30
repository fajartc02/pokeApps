import { Image, StyleSheet, FlatList, ScrollView } from "react-native";

import { Text, View } from "../components/Themed";
import { MonoText } from "../components/StyledText";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import Colors from "../constants/Colors";
import { TouchableOpacity } from "react-native";
export default function AboutScreen({ navigation }) {
  const StorePokemon = JSON.parse(SecureStore.getItem("pokemons") || []);
  const [pokemons, setPokemons] = useState(StorePokemon);

  function updatePokemon() {
    setPokemons(JSON.parse(SecureStore.getItem("pokemons") || []));
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/poke-gif.gif")}
        style={{ width: 200, height: 200 }}
      />
      <MonoText style={styles.text}>Hallo, Chairil Nizam.</MonoText>
      <MonoText style={{ ...styles.text, marginBottom: 50 }}>
        Pokemon Apps Version 1.0.0
      </MonoText>
      <View style={{ padding: 10 }}>
        <TouchableOpacity onPress={updatePokemon} style={styles.btn}>
          <Text>Update Pokemon</Text>
        </TouchableOpacity>
        <Text>
          Yeay Kamu sudah mendapat sebanyak{" "}
          <Text
            style={{
              color: Colors.primary.text,
              fontWeight: "bold",
              fontSize: 20,
              borderBottomWidth: 10,
              borderStyle: "dotted",
              borderBottomColor: Colors.primary.text,
            }}
          >
            {pokemons.length}
          </Text>{" "}
          Pokemon, Ayo Kumpulkan Lagi!
        </Text>
      </View>

      {pokemons.length === 0 ? <MonoText>Belum Ada</MonoText> : null}
      <FlatList
        data={pokemons}
        contentContainerStyle={{ alignSelf: "flex-start" }}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<MonoText>Belum Ada Pokemon</MonoText>}
        renderItem={({ item }, index) => {
          return (
            <View style={styles.card}>
              <Text
                style={{
                  ...styles.text,
                  fontSize: 12,
                  color: Colors.primary.text,
                  backgroundColor: Colors.primary.background,
                  padding: 2,
                }}
              >
                Pokemon {item.name}
              </Text>
              <Image
                source={{
                  uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`,
                }}
                style={{ width: 100, height: 100 }}
              />
            </View>
          );
        }}
      />
      {/* <ScrollView style={{ flex: 1 }}>
        {pokemons.map((item, index) => {
          {
            item.id;
          }
          <View key={index} style={styles.card}>
            <MonoText style={styles.text}>
              {index + 1}. {item.name}
            </MonoText>
            <Image
              source={{
                uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${1}.png`,
              }}
              style={{ width: 100, height: 100 }}
            />
          </View>;
        })}
      </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginVertical: 10,
  },
  btn: {
    margin: 10,
    padding: 10,
    backgroundColor: Colors.primary.text,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  card: {
    margin: 2,
    borderRadius: 4,
    marginBottom: 10,
    shadowColor: "#000",
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
