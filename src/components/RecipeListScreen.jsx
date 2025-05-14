import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const recipes = {
  Ayam: [
    { title: "Ayam Goreng", steps: "Goreng ayam dengan bumbu." },
    { title: "Sate Ayam", steps: "Tusuk ayam dan bakar." },
  ],
  Ikan: [
    { title: "Ikan Bakar", steps: "Bakar ikan dengan sambal." },
    { title: "Pepes Ikan", steps: "Bungkus ikan dan kukus." },
  ],
  Daging: [
    { title: "Rendang", steps: "Masak daging dengan bumbu rendang." },
    { title: "Semur Daging", steps: "Rebus daging dengan kecap." },
  ],
  Tahu: [
    { title: "Tahu Isi", steps: "Isi tahu dan goreng." },
    { title: "Tahu Balado", steps: "Goreng tahu dan masak balado." },
  ],
  Telur: [
    { title: "Telur Dadar", steps: "Kocok dan goreng telur." },
    { title: "Telur Balado", steps: "Rebus telur dan masak balado." },
  ],
  Tempe: [
    { title: "Tempe Goreng", steps: "Iris tempe dan goreng." },
    { title: "Orek Tempe", steps: "Tumis tempe dengan kecap." },
  ],
};

const RecipeListScreen = ({ route }) => {
  const { category } = route.params;
  const data = recipes[category] || [];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Resep Berbahan {category}</Text>
      {data.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.recipeTitle}>{item.title}</Text>
          <Text style={styles.recipeSteps}>{item.steps}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default RecipeListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8F0",
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F7944D",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 16,
    borderRadius: 10,
    elevation: 3,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  recipeSteps: {
    fontSize: 14,
    color: "#555",
  },
});
