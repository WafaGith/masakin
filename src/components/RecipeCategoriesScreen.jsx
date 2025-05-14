// src/components/RecipeCategoriesScreen.jsx
import React from "react";
import { View, Text, StyleSheet, FlatList, Image, Pressable } from "react-native";

const categories = [
  { name: "Ayam", image: require("../assets/images/ayam.jpg") },
  { name: "Daging", image: require("../assets/images/daging.jpg") },
  { name: "Ikan", image: require("../assets/images/ikan.jpg") },
  { name: "Tahu", image: require("../assets/images/tahu.jpg") },
  { name: "Telur", image: require("../assets/images/telur.jpg") },
  { name: "Tempe", image: require("../assets/images/tempe.jpg") },
];

const RecipeCategoriesScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <Pressable
      style={styles.card}
      onPress={() => navigation.navigate("RecipeList", { category: item.name })}
    >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.text}>{item.name}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pilih Kategori Bahan</Text>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        numColumns={2}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
};

export default RecipeCategoriesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8F0",
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#F7944D",
  },
  grid: {
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 3,
    margin: 8,
    alignItems: "center",
    overflow: "hidden",
    width: 150,
  },
  image: {
    width: 150,
    height: 100,
  },
  text: {
    padding: 10,
    fontWeight: "bold",
    color: "#333",
  },
});
