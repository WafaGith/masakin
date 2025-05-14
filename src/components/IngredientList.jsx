import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

const IngredientList = ({ ingredients, searchText, onPressItem }) => {
  const filteredIngredients = ingredients.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {filteredIngredients.map((item) => (
        <TouchableOpacity key={item.id} style={styles.item} onPress={() => onPressItem(item)}>
          <Image source={item.image} style={styles.image} />
          <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingVertical: 20,
  },
  item: {
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
    padding: 10,
    width: 140,
    height: 160,
    elevation: 3,
  },
  image: {
    width: 110,
    height: 110,
    resizeMode: "contain",
  },
  text: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default IngredientList;
