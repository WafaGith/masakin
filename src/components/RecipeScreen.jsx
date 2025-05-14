// src/components/RecipeScreen.jsx
import React from "react";
import { View, Text, Image, Pressable, StyleSheet, ScrollView } from "react-native";

const categories = [
  { name: "Ayam", image: require("../assets/images/Ayam.jpg") },
  { name: "Daging", image: require("../assets/images/Daging.jpg") },
  { name: "Ikan", image: require("../assets/images/Ikan.jpg") },
  { name: "Tahu", image: require("../assets/images/Tahu.jpg") },
  { name: "Telur", image: require("../assets/images/Telur.jpg") },
  { name: "Tempe", image: require("../assets/images/Tempe.jpg") },
];

const RecipeScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Pilih Bahan Masakan</Text>
      <View style={styles.grid}>
        {categories.map((item) => (
          <Pressable
            key={item.name}
            style={styles.card}
            onPress={() => navigation.navigate("RecipeList", { category: item.name })}
          >
            <Image source={item.image} style={styles.image} />
            <Text style={styles.label}>{item.name}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

export default RecipeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF8F0",
    padding: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#F7944D",
    marginBottom: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
  },
  card: {
    width: 140,
    alignItems: "center",
    backgroundColor: "#FFE0B2",
    padding: 12,
    margin: 8,
    borderRadius: 12,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    resizeMode: "cover",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});
