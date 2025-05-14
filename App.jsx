import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import IngredientList from "./src/components/IngredientList";
import IngredientModal from "./src/components/IngredientModal";

const ingredients = [
  {
    id: 1,
    name: "Ayam",
    image: require("./src/assets/images/Ayam.jpg"),
    description: "Daging ayam bisa dimasak menjadi berbagai hidangan seperti ayam goreng, soto ayam, dan opor.",
  },
  {
    id: 2,
    name: "Telur",
    image: require("./src/assets/images/Telur.jpg"),
    description: "Telur adalah bahan makanan serbaguna yang bisa direbus, digoreng, atau dijadikan campuran kue.",
  },
  {
    id: 3,
    name: "Daging",
    image: require("./src/assets/images/Daging.jpg"),
    description: "Daging sapi atau kambing digunakan dalam masakan seperti rendang, sate, dan gulai.",
  },
  {
    id: 4,
    name: "Ikan",
    image: require("./src/assets/images/Ikan.jpg"),
    description: "Ikan segar bisa diolah menjadi pepes, ikan bakar, atau digoreng dengan bumbu kuning.",
  },
  {
    id: 5,
    name: "Tahu",
    image: require("./src/assets/images/Tahu.jpg"),
    description: "Tahu kaya akan protein dan bisa digoreng, dijadikan tahu bacem, atau dimasak dalam sup.",
  },
  {
    id: 6,
    name: "Tempe",
    image: require("./src/assets/images/Tempe.jpg"),
    description: "Tempe adalah makanan khas Indonesia yang bisa digoreng, dibuat orek, atau sebagai lauk sehat.",
  },
];

const App = () => {
  const [search, setSearch] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Masakin</Text>
        <Text style={styles.subtitle}>Pilih Bahan, Masak Enak!</Text>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Cari bahan makanan..."
        value={search}
        onChangeText={(text) => setSearch(text)}
      />

      <IngredientList
        ingredients={ingredients}
        searchText={search}
        onPressItem={(item) => setSelectedIngredient(item)}
      />

      <IngredientModal
        ingredient={selectedIngredient}
        onClose={() => setSelectedIngredient(null)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5E3CF",
    paddingTop: 40,
  },
  header: {
    backgroundColor: "#F7944D",
    width: "100%",
    paddingVertical: 15,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 14,
    color: "#fff",
  },
  searchBar: {
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
    fontSize: 16,
    elevation: 2,
  },
});

export default App;
