import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";

const IngredientModal = ({ ingredient, onClose }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={!!ingredient}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{ingredient.name}</Text>
          <Text style={styles.modalText}>{ingredientDescriptions[ingredient.name] || "Informasi tidak tersedia."}</Text>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Tutup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Deskripsi bahan makanan
const ingredientDescriptions = {
  "Ayam": "Ayam merupakan sumber protein hewani yang sering digunakan dalam berbagai masakan Indonesia.",
  "Telur": "Telur kaya akan protein dan sering digunakan dalam berbagai resep mulai dari gorengan hingga kue.",
  "Daging": "Daging sapi dan kambing adalah bahan utama dalam berbagai hidangan khas seperti rendang dan sate.",
  "Ikan": "Ikan kaya akan omega-3 dan sering digunakan dalam hidangan seperti pepes dan ikan bakar.",
  "Tahu": "Tahu adalah makanan berbahan dasar kedelai yang kaya akan protein nabati.",
  "Tempe": "Tempe merupakan makanan fermentasi berbasis kedelai yang kaya serat dan baik untuk pencernaan.",
};

// Styling
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
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
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 15,
  },
  closeButton: {
    backgroundColor: "#ff914d",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default IngredientModal;
