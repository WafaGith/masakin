import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const recipes = {
  Ayam: [
    {
      title: "Ayam Goreng",
      ingredients: ["Ayam", "Bawang putih", "Ketumbar", "Garam"],
      steps: "Lumuri ayam dengan bumbu halus, diamkan 30 menit, lalu goreng hingga matang.",
    },
    {
      title: "Sate Ayam",
      ingredients: ["Daging ayam", "Kecap manis", "Bawang merah", "Tusuk sate"],
      steps: "Potong ayam, tusuk, lalu bakar sambil dioles bumbu kecap.",
    },
  ],
  Ikan: [
    {
      title: "Ikan Bakar",
      ingredients: ["Ikan", "Jeruk nipis", "Bumbu sambal", "Minyak"],
      steps: "Bersihkan ikan, marinasi dengan bumbu, lalu bakar hingga matang.",
    },
    {
      title: "Pepes Ikan",
      ingredients: ["Ikan", "Daun pisang", "Bumbu pepes", "Cabai"],
      steps: "Bumbui ikan, bungkus daun pisang, lalu kukus selama 30 menit.",
    },
  ],
  Daging: [
    {
      title: "Rendang",
      ingredients: ["Daging sapi", "Santan", "Bumbu rendang"],
      steps: "Masak daging dengan bumbu dan santan hingga kuah menyusut.",
    },
    {
      title: "Semur Daging",
      ingredients: ["Daging sapi", "Kecap manis", "Bawang merah", "Pala"],
      steps: "Rebus daging dengan bumbu hingga empuk.",
    },
  ],
  Tahu: [
    {
      title: "Tahu Isi",
      ingredients: ["Tahu", "Wortel", "Kol", "Bumbu halus"],
      steps: "Isi tahu dengan sayur, celupkan adonan, lalu goreng.",
    },
    {
      title: "Tahu Balado",
      ingredients: ["Tahu", "Cabai merah", "Bawang putih", "Garam"],
      steps: "Goreng tahu lalu tumis bersama bumbu balado.",
    },
  ],
  Telur: [
    {
      title: "Telur Dadar",
      ingredients: ["Telur", "Daun bawang", "Garam", "Minyak"],
      steps: "Kocok telur dengan bumbu, lalu goreng.",
    },
    {
      title: "Telur Balado",
      ingredients: ["Telur rebus", "Cabai merah", "Bawang", "Garam"],
      steps: "Goreng telur rebus, tumis dengan bumbu balado.",
    },
  ],
  Tempe: [
    {
      title: "Tempe Goreng",
      ingredients: ["Tempe", "Bumbu kuning", "Minyak goreng"],
      steps: "Iris tempe, baluri bumbu, lalu goreng hingga kecokelatan.",
    },
    {
      title: "Orek Tempe",
      ingredients: ["Tempe", "Kecap manis", "Cabai", "Bawang putih"],
      steps: "Tumis tempe goreng bersama bumbu dan kecap.",
    },
  ],
};

const RecipeDetail = ({ route }) => {
  const { category } = route.params;
  const data = recipes[category] || [];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Resep Berbahan {category}</Text>
      {data.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.recipeTitle}>{item.title}</Text>

          <Text style={styles.subTitle}>Bahan:</Text>
          {item.ingredients?.map((ing, idx) => (
            <Text key={idx} style={styles.ingredient}>• {ing}</Text>
          ))}

          <Text style={styles.subTitle}>Cara Memasak:</Text>
          <Text style={styles.recipeSteps}>{item.steps}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default RecipeDetail;

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
  subTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 10,
    color: "#F7944D",
  },
  ingredient: {
    fontSize: 14,
    color: "#444",
    marginLeft: 10,
  },
  recipeSteps: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
});
