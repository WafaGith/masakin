import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { getTambahResep } from "../../services/api"; // pastikan path ini sesuai

const recipes = {
  // ...data lokal yang kamu punya
};

const RecipeDetail = ({ route }) => {
  const { category } = route.params;
  const data = recipes[category] || [];

  const [customRecipes, setCustomRecipes] = useState([]);

  useEffect(() => {
    const fetchCustomRecipes = async () => {
      try {
        const allData = await getTambahResep();
        const filtered = allData.filter(item => item.Kategori === category);
        setCustomRecipes(filtered);
      } catch (error) {
        console.error("Gagal mengambil resep tambahan:", error.message);
      }
    };

    fetchCustomRecipes();
  }, [category]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Resep Berbahan {category}</Text>

      {/* Resep Lokal */}
      {data.map((item, index) => (
        <View key={`local-${index}`} style={styles.card}>
          <Text style={styles.recipeTitle}>{item.title}</Text>
          <Text style={styles.subTitle}>Bahan:</Text>
          {item.ingredients.map((ing, idx) => (
            <Text key={idx} style={styles.ingredient}>• {ing}</Text>
          ))}
          <Text style={styles.subTitle}>Cara Memasak:</Text>
          <Text style={styles.recipeSteps}>{item.steps}</Text>
        </View>
      ))}

      {/* Resep Tambahan dari API */}
      {customRecipes.length > 0 && (
        <>
          <Text style={[styles.subTitle, { marginTop: 20 }]}>
            Resep Tambahan dari Pengguna:
          </Text>

          {customRecipes.map((item, index) => (
            <View key={`custom-${index}`} style={styles.card}>
              <Text style={styles.recipeTitle}>{item.JudulTambahResep}</Text>
              <Text style={styles.subTitle}>Bahan:</Text>
              {item.Bahan?.split("\n").map((bhn, idx) => (
                <Text key={idx} style={styles.ingredient}>• {bhn}</Text>
              ))}
              <Text style={styles.subTitle}>Cara Memasak:</Text>
              <Text style={styles.recipeSteps}>{item.Langkah}</Text>
            </View>
          ))}
        </>
      )}
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
    marginTop: 38,
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
