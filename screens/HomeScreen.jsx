import { Image, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import ListMenu from "../components/ListMenu";
import { MonoText } from "../components/StyledText";
import Colors from "../constants/Colors";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/bg-pokemon.png")}
        style={{ width: 100, height: 100 }}
      />
      <MonoText style={styles.title}>Silahkan Pilih</MonoText>
      <ListMenu title="Belajar Hijaiyah" />
      <ListMenu
        title="Belajar Alphabet"
        onHandlePress={() => navigation.navigate("Letters")}
      />
      <ListMenu title="Belajar Berhitung" />
      <ListMenu title="Belajar Planet" />
      <ListMenu title="Belajar Buah" />
      <ListMenu title="Belajar Sayuran" />
      <ListMenu title="Belajar Hewan" />
      <ListMenu title="Belajar Tumbuhan" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
