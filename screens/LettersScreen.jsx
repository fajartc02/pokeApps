import { Image, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
// import { LettersConstant } from "../constants/LettersConstant";
import { RandomLetters } from "../utils/RandomLetters";
import { Button } from "react-native";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import * as SecureStore from "expo-secure-store";
import DefaultModal from "../components/DefaultModal";
import { Audio } from "expo-av";

export default function LettersScreen({ navigation }) {
  const [letter, setLetter] = useState(null);
  const [pokemonId, setPokemonId] = useState(randomNumberForPokemonId());
  const [pokemonName, setPokemonName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [letterAnswered, setLetterAnswered] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isThrowPokeball, setIsThrowPokeball] = useState(false);
  const [sound, setSound] = useState();

  async function playSound() {
    if (letter == null) return;
    const { sound } = await Audio.Sound.createAsync(letter.sound);
    setSound(sound);

    // console.log("Playing Sound");
    await sound.playAsync();
  }

  useEffect(() => {
    playSound();
    return sound
      ? () => {
          // console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [letter]);

  function suffle() {
    setLetter(RandomLetters());
  }

  function randomNumberForPokemonId() {
    return Math.floor(Math.random() * 1025) + 1;
  }

  function throwAndCatchPokeball() {
    setIsThrowPokeball(true);
    setTimeout(() => {
      setIsThrowPokeball(false);
    }, 2000);
  }

  async function onCheckLetter(changedText) {
    setLetterAnswered(changedText);
    setIsLoading(true);
    if (changedText !== "") {
      if (changedText === letter.letter) {
        let randomNumber = randomNumberForPokemonId();
        setPokemonId(randomNumber);
        await getNamePokemonById();
        setModalVisible(true);
        setIsCorrect(true);

        if (SecureStore.getItem("pokemons")) {
          const obj = JSON.parse(SecureStore.getItem("pokemons"));
          const objPokemon = {
            id: randomNumber,
            name: await getNamePokemonById(),
            number: randomNumber,
          };
          obj.push(objPokemon);
          SecureStore.setItem("pokemons", JSON.stringify(obj));
        }
        throwAndCatchPokeball();
        setIsLoading(false);
        setTimeout(() => {
          setModalVisible(false);
          suffle();
          setIsCorrect(false);
          setPokemonName(null);

          setLetterAnswered("");
        }, 5000);
      } else {
        setIsLoading(false);
        setModalVisible(true);
        setIsCorrect(false);
        setTimeout(() => {
          setModalVisible(false);
          setPokemonName(null);

          setLetterAnswered("");
        }, 5000);
      }
    }
  }

  useEffect(() => {
    suffle();
    if (!SecureStore.getItem("pokemons")) {
      SecureStore.setItem("pokemons", JSON.stringify([]));
    }
  }, []);

  async function getNamePokemonById() {
    setIsLoading(true);
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon-form/${pokemonId}/`
    );
    const json = await response.json();
    setPokemonName(json.name);
    setIsLoading(false);
    return json.name;
  }
  return (
    <View style={styles.container}>
      <DefaultModal
        visible={modalVisible}
        children={
          <>
            <Text
              style={{
                ...styles.textModal,
                color: isCorrect ? "#00ff3b" : "#e1ff00",
              }}
            >
              {isCorrect ? "Yeaaay... Bener!" : "Ayo coba lagi!"}
            </Text>
            {isLoading ? (
              <Text style={styles.textModal}>Sedang Check Huruf</Text>
            ) : null}
            {isThrowPokeball ? (
              <>
                <Image
                  source={require("../assets/images/throw-pokeball.gif")}
                  style={{
                    width: 200,
                    height: 200,
                    borderRadius: 10,
                    opacity: 0.7,
                  }}
                />
                <Text style={styles.textModal}>Sedang mengambil pokemon</Text>
              </>
            ) : pokemonName !== null ? (
              <>
                <Image
                  source={{
                    uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`,
                  }}
                  style={{ width: 100, height: 100 }}
                />
                <Text style={styles.textModal}>
                  Dapet Pokemon {pokemonName}
                </Text>
              </>
            ) : (
              <Text style={styles.textModal}>Belum Dapet Pokemon</Text>
            )}
          </>
        }
      />
      <TouchableOpacity style={styles.btn} activeOpacity={0.5} onPress={suffle}>
        <Text>Acak Huruf</Text>
      </TouchableOpacity>
      <Text style={styles.bigTitle}>{letter?.letter || "?"}</Text>
      <Text>Huruf Apakah ini?</Text>
      {/* <KeyboardAvoidingView behavior="padding"> */}
      <TextInput
        style={styles.title}
        keyboardAppearance="dark"
        autoCapitalize={"characters"}
        value={letterAnswered}
        onChangeText={(text) => onCheckLetter(text)}
      />
      {/* </KeyboardAvoidingView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textModal: {
    marginVertical: 10,
    color: Colors.primary.text,
    fontWeight: "bold",
    fontSize: 20,
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
  bigTitle: {
    fontSize: 200,
    color: Colors.primary.text,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    borderBottomWidth: 3,
    borderStyle: "dotted",
    borderBottomColor: Colors.primary.text,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
