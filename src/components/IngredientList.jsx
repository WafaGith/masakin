import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import IngredientModal from "./IngredientModal";

const IngredientList = ({ ingredients, searchText }) => {
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  // Filter bahan berdasarkan pencarian
  const filteredIngredients = ingredients.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {filteredIngredients.map((item) => (
          <TouchableOpacity key={item.id} style={styles.ingredientItem} onPress={() => setSelectedIngredient(item)}>
            <Image source={item.image} style={styles.ingredientImage} />
            <Text style={styles.ingredientText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal untuk menampilkan deskripsi bahan */}
      {selectedIngredient && (
        <IngredientModal ingredient={selectedIngredient} onClose={() => setSelectedIngredient(null)} />
      )}
    </View>
  );
};

// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  ingredientItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    width: "90%",
    alignItems: "center",
    marginBottom: 15,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  ingredientImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  ingredientText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default IngredientList;
