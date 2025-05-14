import React, { useState } from "react";
import { View, Text, ScrollView, Image, TextInput, Pressable, StyleSheet, Modal, Animated } from "react-native";

const ingredients = [
  { id: 1, name: "Ayam", image: require("./src/assets/images/Ayam.jpg"), description: "Daging ayam bisa dimasak menjadi berbagai hidangan seperti ayam goreng, soto ayam, dan opor." },
  { id: 2, name: "Telur", image: require("./src/assets/images/Telur.jpg"), description: "Telur adalah bahan makanan serbaguna yang bisa direbus, digoreng, atau dijadikan campuran kue." },
  { id: 3, name: "Daging", image: require("./src/assets/images/Daging.jpg"), description: "Daging sapi atau kambing digunakan dalam masakan seperti rendang, sate, dan gulai." },
  { id: 4, name: "Ikan", image: require("./src/assets/images/Ikan.jpg"), description: "Ikan segar bisa diolah menjadi pepes, ikan bakar, atau digoreng dengan bumbu kuning." },
  { id: 5, name: "Tahu", image: require("./src/assets/images/Tahu.jpg"), description: "Tahu kaya akan protein dan bisa digoreng, dijadikan tahu bacem, atau dimasak dalam sup." },
  { id: 6, name: "Tempe", image: require("./src/assets/images/Tempe.jpg"), description: "Tempe adalah makanan khas Indonesia yang bisa digoreng, dibuat orek, atau sebagai lauk sehat." },
];

const App = () => {
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [scaleValues] = useState(
    ingredients.reduce((acc, item) => {
      acc[item.id] = new Animated.Value(1);
      return acc;
    }, {})
  );

  const handlePress = (item) => {
    // Efek jelly hanya pada elemen yang ditekan
    Animated.sequence([
      Animated.timing(scaleValues[item.id], { toValue: 1.1, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleValues[item.id], { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();

    setSelectedItem(item);
  };

  const filteredIngredients = ingredients.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

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

      <ScrollView contentContainerStyle={styles.grid}>
        {filteredIngredients.map((item) => (
          <Pressable key={item.id} onPress={() => handlePress(item)}>
            <Animated.View style={[styles.item, { transform: [{ scale: scaleValues[item.id] }] }]}>
              <Image source={item.image} style={styles.image} />
              <Text style={styles.itemText}>{item.name}</Text>
            </Animated.View>
          </Pressable>
        ))}
      </ScrollView>

      {/* Modal untuk menampilkan deskripsi bahan makanan */}
      {selectedItem && (
        <Modal transparent={true} animationType="slide" onRequestClose={() => setSelectedItem(null)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedItem.name}</Text>
              <Text style={styles.modalDescription}>{selectedItem.description}</Text>
              <Pressable style={styles.closeButton} onPress={() => setSelectedItem(null)}>
                <Text style={styles.closeButtonText}>Tutup</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5E3CF",
    paddingTop: 40,
    alignItems: "center",
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
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
    fontSize: 16,
    elevation: 2,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
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
    width: 110, // Gambar lebih besar di dalam border
    height: 110,
    resizeMode: "contain",
  },
  itemText: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    textAlign: "center",
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: "#F7944D",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default App;
